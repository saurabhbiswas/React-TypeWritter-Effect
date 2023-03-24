import React, { useState, useEffect } from "react";

function Typewriter({ text }) {
  const [typeText, setTypeText] = useState("");

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i >= text.length - 1) {
        clearInterval(intervalId);
      } else {
        setTypeText((prev) => prev + text[i]);
      }
      i++;
    }, 500);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <ul>
      {typeText.split("").map((item, index, arr) => {
        return <li key={index + "" + item}>{item}</li>;
      })}
    </ul>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [textData, setTextData] = useState("");

  useEffect(() => {
    fetch(
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/756e73"
    )
      .then((response) => response.text())
      .then((data) => {
        setIsLoading(false);
        // console.log(data);
        setTextData(data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? <p>Loading.....</p> : <Typewriter text={textData} />}
    </div>
  );
}

export default App;

