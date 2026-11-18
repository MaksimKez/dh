import { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type ExampleState = {
  count: number;
};

export default class Example extends Component<object, ExampleState> {
  constructor(props: object) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>You clicked {this.state.count} times</Text>
        <Button
          title="Click me"
          onPress={() => this.setState({ count: this.state.count + 1 })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  label: {
    fontSize: 22,
    fontWeight: "600",
  },
});
