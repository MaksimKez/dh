import { useState } from "react";

const COMPLEX_PATTERN =
  /^\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*([+-])\s*([ij])\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*$/i;

function parseComplex(value) {
  const match = value.trim().match(COMPLEX_PATTERN);
  if (!match) {
    return null;
  }
  const real = Number(match[1]);
  const imag = (match[2] === "-" ? -1 : 1) * Number(match[4]);
  if (!Number.isFinite(real) || !Number.isFinite(imag)) {
    return null;
  }
  return { real, imag, unit: match[3].toLowerCase() };
}

function formatNumber(value) {
  const rounded = Math.round(value * 1e10) / 1e10;
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

function formatComplex(real, imag, unit) {
  const sign = imag < 0 ? "-" : "+";
  return `${formatNumber(real)}${sign}${unit}${formatNumber(Math.abs(imag))}`;
}

function Complex() {
  const [input, setInput] = useState("3+j4");
  const [operation, setOperation] = useState("modulus");

  const parsed = parseComplex(input);
  let output = "Enter a complex number as a+jb or a+ib.";

  if (parsed) {
    const modulus = Math.hypot(parsed.real, parsed.imag);
    if (operation === "modulus") {
      output = `Modulus: ${formatNumber(modulus)}`;
    } else if (modulus === 0) {
      output = "Zero cannot be inverted.";
    } else {
      const denom = modulus * modulus;
      output = `Inverse: ${formatComplex(
        parsed.real / denom,
        -parsed.imag / denom,
        parsed.unit
      )}`;
    }
  } else if (input.trim() !== "") {
    output = "Invalid format. Use a+jb or a+ib, for example 3+j4 or -1.5-i2.";
  }

  return (
    <section className="card">
      <h2>Complex</h2>
      <p>Calculate the modulus or the inverse of a complex number.</p>
      <label>
        Number
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="3+j4"
        />
      </label>
      <div className="actions">
        <button
          type="button"
          className={operation === "modulus" ? "active" : ""}
          onClick={() => setOperation("modulus")}
        >
          Modulus
        </button>
        <button
          type="button"
          className={operation === "inverse" ? "active" : ""}
          onClick={() => setOperation("inverse")}
        >
          Inverse
        </button>
      </div>
      <p className="result">{output}</p>
    </section>
  );
}

export default Complex;
