import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { AppState, Button, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

import { Enemy } from "./enemy";

type Move = "thrust" | "sweep" | "block";
type EnemyId = "ork" | "goblin" | "troll";
type Phase = "idle" | "player" | "monster";

type Fight = {
  enemyId: EnemyId;
  playerStamina: number;
  enemyStamina: number;
  phase: Phase;
  round: number;
  result: "" | "Victory!" | "Defeat...";
  log: string;
  picture: Move;
};

const PLAYER_STRENGTH = 5;
const PLAYER_STAMINA = 20;
const STORAGE_KEY = "lab4-fight";

const ENEMIES: Record<EnemyId, { name: string; strength: number; stamina: number }> = {
  ork: { name: "Ork", strength: 4, stamina: 16 },
  goblin: { name: "Goblin", strength: 3, stamina: 12 },
  troll: { name: "Troll", strength: 6, stamina: 22 },
};

const PICTURES: Record<Move, ImageSourcePropType> = {
  thrust: require("./assets/push.jpg"),
  sweep: require("./assets/swing.jpg"),
  block: require("./assets/block.jpg"),
};

function rollDamage(strength: number) {
  const roll = Math.floor(Math.random() * 6) + 1;
  return Math.floor((roll - 0.5) * strength);
}

function beats(attack: Move, defense: Move) {
  return (
    (attack === "thrust" && defense === "sweep") ||
    (attack === "sweep" && defense === "block") ||
    (attack === "block" && defense === "thrust")
  );
}

function freshFight(): Fight {
  const ids: EnemyId[] = ["ork", "goblin", "troll"];
  const enemyId = ids[Math.floor(Math.random() * ids.length)];
  return {
    enemyId,
    playerStamina: PLAYER_STAMINA,
    enemyStamina: ENEMIES[enemyId].stamina,
    phase: "idle",
    round: 1,
    result: "",
    log: "Start a round, then swipe up, swipe right, or hold.",
    picture: "thrust",
  };
}

async function play(kind: "hit" | "block") {
  const created = await Audio.Sound.createAsync(
    kind === "hit" ? require("./assets/hit.wav") : require("./assets/block.wav"),
    { volume: 0.7 }
  );
  created.sound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded && status.didJustFinish) {
      created.sound.unloadAsync();
    }
  });
  await created.sound.playAsync();
}

export default function DuelScreen() {
  const [fight, setFight] = useState<Fight>(freshFight);
  const [ready, setReady] = useState(false);
  const fightRef = useRef(fight);
  const pendingMove = useRef<Move | null>(null);
  const waiting = useRef(false);

  useEffect(() => {
    fightRef.current = fight;
  }, [fight]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        setFight(JSON.parse(raw) as Fight);
      }
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fight));
    }
  }, [fight, ready]);

  function resolveMonster(playerMove: Move) {
    const current = fightRef.current;
    if (current.result || current.phase === "idle") {
      return;
    }
    const enemyMove: Move = (["thrust", "sweep", "block"] as Move[])[Math.floor(Math.random() * 3)];
    let next: Fight = {
      ...current,
      picture: enemyMove,
      phase: "idle",
    };
    if (playerMove === enemyMove) {
      next.log = `Round ${current.round}: both chose ${playerMove}. The monster waited. Choose again.`;
      next.phase = "player";
      setFight(next);
      return;
    }
    const playerWins = beats(playerMove, enemyMove);
    const strength = playerWins ? PLAYER_STRENGTH : ENEMIES[current.enemyId].strength;
    const damage = rollDamage(strength);
    const stamina = playerWins ? current.enemyStamina : current.playerStamina;
    play(playerMove === "block" || enemyMove === "block" ? "block" : "hit").catch(() => undefined);
    if (damage > stamina) {
      next = {
        ...next,
        playerStamina: playerWins ? current.playerStamina : 0,
        enemyStamina: playerWins ? 0 : current.enemyStamina,
        result: playerWins ? "Victory!" : "Defeat...",
        log: `${playerMove} beats ${enemyMove}. ${damage} hit points end the fight.`,
      };
    } else {
      next = {
        ...next,
        playerStamina: playerWins ? current.playerStamina : current.playerStamina - damage,
        enemyStamina: playerWins ? current.enemyStamina - damage : current.enemyStamina,
        round: current.round + 1,
        log: `${playerMove} beats ${enemyMove} for ${damage} hit points.`,
      };
    }
    setFight(next);
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active" && waiting.current && pendingMove.current) {
        waiting.current = false;
        const move = pendingMove.current;
        pendingMove.current = null;
        resolveMonster(move);
      }
    });
    return () => subscription.remove();
  }, []);

  function choose(move: Move) {
    if (fightRef.current.phase !== "player" || fightRef.current.result) {
      return;
    }
    if (AppState.currentState !== "active") {
      pendingMove.current = move;
      waiting.current = true;
      setFight((current) => ({
        ...current,
        phase: "monster",
        picture: move,
        log: `You chose ${move}. The monster waits.`,
      }));
      return;
    }
    resolveMonster(move);
  }

  const chooseMove = (move: Move) => {
    choose(move);
  };

  const gesture = Gesture.Exclusive(
    Gesture.LongPress()
      .minDuration(350)
      .onStart(() => {
        runOnJS(chooseMove)("block");
      }),
    Gesture.Pan().onEnd((event) => {
      if (event.translationY < -40 && Math.abs(event.translationY) > Math.abs(event.translationX)) {
        runOnJS(chooseMove)("thrust");
      } else if (event.translationX > 40) {
        runOnJS(chooseMove)("sweep");
      }
    })
  );

  const enemy = ENEMIES[fight.enemyId];

  return (
    <GestureHandlerRootView style={styles.root}>
      <Text style={styles.title}>Round {fight.round}</Text>
      <Enemy
        name={enemy.name}
        strength={enemy.strength}
        stamina={fight.enemyStamina}
        image={PICTURES[fight.picture]}
      />
      <Text style={styles.line}>Your strength {PLAYER_STRENGTH}</Text>
      <Text style={styles.line}>Your stamina {fight.playerStamina}</Text>
      <Text style={styles.log}>{fight.log}</Text>
      {fight.result ? <Text style={styles.result}>{fight.result}</Text> : null}
      <Button
        title="Start round"
        onPress={() => {
          if (fight.result || fight.phase !== "idle") {
            return;
          }
          setFight((current) => ({
            ...current,
            phase: "player",
            log: "Swipe up to thrust, swipe right to sweep, or hold to block.",
          }));
        }}
      />
      <GestureDetector gesture={gesture}>
        <View style={styles.pad}>
          <Text style={styles.padText}>
            {fight.phase === "monster" ? "The monster is striking..." : "Gesture pad"}
          </Text>
        </View>
      </GestureDetector>
      {fight.result ? (
        <Button
          title="New duel"
          onPress={() => {
            const next = freshFight();
            setFight(next);
          }}
        />
      ) : null}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#141821",
    padding: 20,
    gap: 12,
    justifyContent: "center",
  },
  title: {
    color: "#f3e6c5",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  line: {
    color: "#f7f1e3",
    fontSize: 16,
    textAlign: "center",
  },
  log: {
    color: "#f7f1e3",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  result: {
    color: "#f3e6c5",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  pad: {
    height: 120,
    borderWidth: 1,
    borderColor: "#f3e6c5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  padText: {
    color: "#f3e6c5",
  },
});
