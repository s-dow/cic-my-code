import "./App.css";
import { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [sum, setSum] = useState();

  const add1 = () => {
    setSum(parseFloat(num1) + parseFloat(num2));
    fetch(`http://localhost:3001/add/${num1}/${num2}`)
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        setSum(text);
      });
  };

  const add2 = () => {
    fetch(`http://localhost:3001/add2?num1=${num1}&num2=${num2}`)
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        setSum(text);
      });
  };

  const add3 = () => {
    fetch(`http://localhost:3001/add3`, {
      method: "POST",
      body: JSON.stringify({ num1: num1, num2: num2 }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSum(data.sum);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Hello World</h1>
        {sum ? <p>Sum: {sum}</p> : null}
        <label>Num 1:</label>
        <input
          type="number"
          className="form-control"
          onChange={(evt) => {
            setNum1(evt.target.value);
          }}
          value={num1}
        />
        <br />
        <label>Num 2:</label>
        <input
          type="number"
          className="form-control"
          onChange={(evt) => {
            setNum2(evt.target.value);
          }}
          value={num2}
        />
        <button className="btn btn-primary" onClick={add1}>
          Add! 1
        </button>
        <button className="btn btn-primary" onClick={add2}>
          Add! 2
        </button>
        <button className="btn btn-primary" onClick={add3}>
          Add! 3
        </button>
      </div>
    </div>
  );
}

export default App;
