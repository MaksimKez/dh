const fs = require("fs");
const path = require("path");

const rate = 22050;

function tone(freq, seconds, volume) {
  const count = Math.floor(rate * seconds);
  const samples = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    const attack = Math.min(1, i / 180);
    const release = Math.min(1, (count - i) / 700);
    samples[i] = Math.sin((2 * Math.PI * freq * i) / rate) * volume * attack * release;
  }
  return samples;
}

function concat(parts) {
  const length = parts.reduce((sum, part) => sum + part.length, 0);
  const samples = new Float32Array(length);
  let offset = 0;
  parts.forEach((part) => {
    samples.set(part, offset);
    offset += part.length;
  });
  return samples;
}

function write(file, samples) {
  const data = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i += 1) {
    const value = Math.max(-1, Math.min(1, samples[i]));
    data.writeInt16LE(value * 32767, i * 2);
  }
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(rate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(data.length, 40);
  fs.writeFileSync(file, Buffer.concat([header, data]));
}

const notes = [220, 261.63, 329.63, 392, 440, 392, 329.63, 261.63];
write(
  path.join("assets", "story", "theme.wav"),
  concat(notes.map((freq) => tone(freq, 0.7, 0.18)))
);
write(path.join("assets", "story", "click.wav"), tone(740, 0.12, 0.28));
