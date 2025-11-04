import { CreateWebWorkerEngine } from "https://esm.run/@mlc-ai/web-llm";

let model = null;

export async function initAI() {
  if (model) return model;
  model = await CreateWebWorkerEngine(
    new Worker("https://esm.run/@mlc-ai/web-llm/dist/worker.js", { type: "module" }),
    {
      model: "starcoder-1b",
    }
  );
  return model;
}

export async function generateScript(prompt) {
  const engine = await initAI();
  const result = await engine.complete(prompt);
  return result.output_text;
}