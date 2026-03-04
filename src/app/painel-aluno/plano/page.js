'use client';

import Link from 'next/link';
import ThemeToggle from '../../../components/ThemeToggle';

export default function PlanoVisualizacao() {
  return (
    <main className="center-screen">
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeToggle />
      </div>

      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ color: 'var(--primary-aluno)' }}>Meu Plano Atual</h1>
        <p>Prescrito por: Dr. Nome do Profissional</p>
      </header>

      <div className="form-container" style={{ textAlign: 'left' }}>
        <h2 style={{ marginBottom: '15px' }}>Dieta Low Carb - Fase 1</h2>
        
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'var(--background)', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--primary-aluno)' }}>Café da Manhã</h4>
          <p>3 Ovos + Café sem açúcar</p>
        </div>

        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'var(--background)', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--primary-aluno)' }}>Almoço</h4>
          <p>Frango grelhado + Salada à vontade</p>
        </div>

        <Link href="/painel-aluno">
          <button className="btn" style={{ width: '100%', backgroundColor: 'var(--toggle-bg)', color: 'var(--foreground)' }}>
            Voltar
          </button>
        </Link>
      </div>
    </main>
  );
}