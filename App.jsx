import { useState } from 'react'
import { generateScript } from './ai'

export default function App() {
  const [page, setPage] = useState('generate')
  const [objecto, setObjecto] = useState('')
  const [action, setAction] = useState('')
  const [evento, setEvento] = useState('')
  const [behavior, setBehavior] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    setOutput('_ IA digitando...')

    const prompt = `Crie um script Lua para Roblox conforme:\nObjeto: ${objecto}\nAção: ${action}\nEvento: ${evento}\nComportamento: ${behavior}\nExplique rapidamente onde corrigiu ou decidiu algo.`

    try {
      const result = await generateScript(prompt)
      setOutput(result || 'Erro: sem resposta do modelo')
    } catch (err) {
      console.error(err)
      setOutput('Erro ao gerar script: ' + (err.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-root">
      <nav className="topbar">
        <div className="logo">ScriptLab</div>
        <div className="nav-buttons">
          <button onClick={() => setPage('generate')} className={page === 'generate' ? 'active' : ''}>Gerar</button>
          <button onClick={() => setPage('fix')} className={page === 'fix' ? 'active' : ''}>Corrigir</button>
          <button onClick={() => setPage('library')} className={page === 'library' ? 'active' : ''}>Library</button>
        </div>
      </nav>

      <main className="container">
        {page === 'generate' && (
          <section className="card">
            <h2>Gerar Script LUA</h2>

            <div className="grid-2">
              <input value={objecto} onChange={e => setObjecto(e.target.value)} placeholder="Objeto (ex: Part, Espada)" />
              <input value={action} onChange={e => setAction(e.target.value)} placeholder="Ação (ex: Mover, Dar dano)" />
            </div>

            <div className="grid-2">
              <input value={evento} onChange={e => setEvento(e.target.value)} placeholder="Evento (ex: Touched, Activated)" />
              <input value={behavior} onChange={e => setBehavior(e.target.value)} placeholder="Comportamento (ex: Ir pra cima, Tween)" />
            </div>

            <div className="actions">
              <button onClick={handleGenerate} disabled={loading} className="primary">
                {loading ? 'Gerando...' : 'Gerar Script'}
              </button>
            </div>

            <pre className="output">{output}</pre>
          </section>
        )}

        {page === 'fix' && (
          <section className="card">
            <h2>Corrigir Script</h2>
            <textarea id="fix-area" placeholder="Cole aqui o script com erro (LUA)"></textarea>
            <div className="actions">
              <button id="fix-btn" className="primary">Corrigir Script</button>
            </div>
            <pre className="output" id="fix-output"></pre>
          </section>
        )}

        {page === 'library' && (
          <section className="card">
            <h2>Biblioteca de Scripts</h2>
            <p>Modelos prontos:</p>
            <ul>
              <li>Porta automática</li>
              <li>Sistema de vida</li>
              <li>Ferramenta de espada</li>
            </ul>
          </section>
        )}
      </main>

      <footer className="footer">© ScriptLab</footer>
    </div>
  )
}
