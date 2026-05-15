import { useEffect, useState } from "react";
import api from "./api/client";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/")
      .then(res => setMessage(res.data.message))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>InsightAI</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;