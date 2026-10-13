import { useState } from "react";

function Power() {
  const [base, setBase] = useState("2");
  const [exponent, setExponent] = useState("3");

  const x = Number(base);
  const y = Number(exponent);
  const valid =
    base.trim() !== "" &&
    exponent.trim() !== "" &&
    Number.isFinite(x) &&
    Number.isFinite(y);
  const result = valid ? x ** y : null;

  return (
    <section className="card">
      <h2>Power</h2>
      <p>Calculate x raised to the power of y.</p>
      <label>
        x
        <input
          type="number"
          value={base}
          onChange={(event) => setBase(event.target.value)}
        />
      </label>
      <label>
        y
        <input
          type="number"
          value={exponent}
          onChange={(event) => setExponent(event.target.value)}
        />
      </label>
      <p className="result">
        {valid ? `Result: ${result}` : "Enter two finite numbers."}
      </p>
    </section>
  );
}

export default Power;
