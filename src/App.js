import { useState } from "react";
import "./App.css";
import Message from "./Message";
import Power from "./Power";
import Complex from "./Complex";

function App() {
  const [text, setText] = useState("Welcome to the first React application");

  return (
    <div className="App">
      <header>
        <h1>Hello App</h1>
      </header>
      <main>
        <section className="card">
          <h2>Message</h2>
          <label>
            Message text
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
          <Message message={text} />
        </section>
        <Power />
        <Complex />
      </main>
    </div>
  );
}

export default App;
