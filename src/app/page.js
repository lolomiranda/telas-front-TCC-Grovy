import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  return (
    <main className="center-screen">
      
      {/* Botão de Tema no topo ou onde preferires */}
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeToggle />
      </div>

      <h1>Bem-vindo ao Grovy Health</h1>
      <p style={{ maxWidth: '600px', marginBottom: '20px' }}>
        Escolha o seu perfil para começar a sua jornada de saúde.
      </p>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* Botão ALUNO - Verde */}
        <button 
          className="btn" 
          style={{ backgroundColor: 'var(--primary-aluno)' }}
        >
          Sou Aluno
        </button>
        
        {/* Botão PROFISSIONAL - Azul */}
        <button 
          className="btn" 
          style={{ backgroundColor: 'var(--primary-prof)' }}
        >
          Sou Nutricionista
        </button>

      </div>
    </main>
  );
}