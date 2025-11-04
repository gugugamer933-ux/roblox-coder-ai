import { useState } from "react";
import { generateAI } from "./ai";

export default function App() {
  const [page, setPage] = useState("generate");
  const [object, setObject] = useState("");
  const [action, setAction] = useState("");
  const [event, setEvent] = useState("");
  const [behavior, setBehavior] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setOutput("_ IA digitando...");
    const prompt = `Crie um script Lua para Roblox:
Objeto: ${object}
Ação: ${action}
Evento: ${event}
Comportamento: ${behavior}`;
    const result = await generateAI(prompt);
    setOutput(result);
    setLoading(false);
  }

  return (
    <div style={{ padding: 20, color: "white", background: "#111", minHeight: "100vh" }}>
      <button onClick={() => setPage("generate")}>Gerar Script</button>
      <button onClick={() => setPage("fix")}>Corrigir Script</button>

      {page === "generate" && (
        <div>
          <h1>Gerar Script LUA</h1>
          <input placeholder="Objeto" value={object} onChange={e => setObject(e.target.value)} />
          <input placeholder="Ação" value={action} onChange={e => setAction(e.target.value)} />
          <input placeholder="Evento" value={event} onChange={e => setEvent(e.target.value)} />
          <input placeholder="Comportamento" value={behavior} onChange={e => setBehavior(e.target.value)} />
          <button onClick={handleGenerate}>Gerar</button>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
