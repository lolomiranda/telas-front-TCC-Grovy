'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle'; 

export default function PainelAluno() {
  // 1. Estados para armazenar os dados que virão da API
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [planoAtivo, setPlanoAtivo] = useState(null);
  const [evolucao, setEvolucao] = useState(null);

  // 2. Simulando a chamada para o Backend ao carregar a página
  useEffect(() => {
    // No futuro, você vai substituir isso por:
    // fetch('http://localhost:8000/api/dashboard/recommendations').then(...)
    // fetch('http://localhost:8000/api/my-plan').then(...)
    // fetch('http://localhost:8000/api/dashboard/evolution').then(...)

    // Dados Falsos (Mock) apenas para montarmos o visual da tela por enquanto
    setRecomendacoes([
      { id: 1, texto: 'Beber 2.5L de água hoje' },
      { id: 2, texto: 'Treino de Membros Inferiores (45 min)' },
      { id: 3, texto: 'Evitar açúcar após as 20h' }
    ]);
    
    setPlanoAtivo({
      profissional: 'Dr. João Silva (Nutricionista)',
      tipo: 'Dieta de Hipertrofia',
      status: 'Ativo'
    });

    setEvolucao({
      pesoInicial: 80.5,
      pesoAtual: 78.2,
      meta: 75.0
    });
  }, []);

  return (
    <div style={{ minHeight: '100vh', padding: '30px', position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Botão de Tema e Botão de Sair no canto direito */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <ThemeToggle />
        <Link href="/">
          <button className="btn" style={{ backgroundColor: '#ef4444', margin: 0, padding: '8px 16px', fontSize: '0.9rem' }}>Sair</button>
        </Link>
      </div>

      {/* Cabeçalho do Dashboard */}
      <header style={{ marginBottom: '40px', marginTop: '20px' }}>
        <h1 style={{ color: 'var(--primary-aluno)', fontSize: '2rem' }}>Olá, Aluno! 👋</h1>
        <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>Aqui está o resumo da sua jornada de saúde hoje.</p>
      </header>

      {/* Navegação Rápida (Abas) */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <Link href="/marketplace" style={{ textDecoration: 'none' }}>
          <button className="btn" style={{ backgroundColor: 'var(--toggle-bg)', color: 'var(--foreground)', margin: 0 }}>🔍 Buscar Profissionais</button>
        </Link>
        <Link href="/painel-aluno/medidas" style={{ textDecoration: 'none' }}>
          <button className="btn" style={{ backgroundColor: 'var(--toggle-bg)', color: 'var(--foreground)', margin: 0 }}>📏 Atualizar Medidas</button>
        </Link>
      </div>

      {/* Grid de Cards (Dashboard) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Card 1: Meu Plano Ativo */}
        <div className="form-container" style={{ margin: 0, maxWidth: '100%' }}>
          <h3 style={{ borderBottom: '2px solid var(--primary-aluno)', paddingBottom: '10px', marginBottom: '15px' }}>Meu Plano Ativo</h3>
          {planoAtivo ? (
            <>
              <p style={{ marginBottom: '8px' }}><strong>Profissional:</strong> {planoAtivo.profissional}</p>
              <p style={{ marginBottom: '8px' }}><strong>Foco:</strong> {planoAtivo.tipo}</p>
              <button className="btn" style={{ backgroundColor: 'var(--primary-aluno)', width: '100%', marginTop: '15px', margin: '15px 0 0 0' }}>
                Ver Detalhes do Plano
              </button>
            </>
          ) : (
            <>
              <p style={{ marginBottom: '15px' }}>Você ainda não possui um plano ativo.</p>
              <Link href="/marketplace">
                <button className="btn" style={{ backgroundColor: 'var(--primary-aluno)', width: '100%', margin: 0 }}>
                  Encontrar um Profissional
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Card 2: Recomendações (GET /api/dashboard/recommendations) */}
        <div className="form-container" style={{ margin: 0, maxWidth: '100%' }}>
          <h3 style={{ borderBottom: '2px solid var(--primary-aluno)', paddingBottom: '10px', marginBottom: '15px' }}>Recomendações de Hoje</h3>
          <ul style={{ listStylePosition: 'inside', lineHeight: '1.8' }}>
            {recomendacoes.map(rec => (
              <li key={rec.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '8px' }}>
                {rec.texto}
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: Evolução (GET /api/dashboard/evolution) */}
        <div className="form-container" style={{ margin: 0, maxWidth: '100%' }}>
          <h3 style={{ borderBottom: '2px solid var(--primary-aluno)', paddingBottom: '10px', marginBottom: '15px' }}>Sua Evolução</h3>
          {evolucao ? (
            <>
              <p style={{ marginBottom: '8px' }}><strong>Peso Inicial:</strong> {evolucao.pesoInicial} kg</p>
              <p style={{ marginBottom: '8px' }}><strong>Peso Atual:</strong> <span style={{ color: 'var(--primary-aluno)', fontWeight: 'bold' }}>{evolucao.pesoAtual} kg</span></p>
              <p style={{ marginBottom: '8px' }}><strong>Meta:</strong> {evolucao.meta} kg</p>
              <Link href="/painel-aluno/medidas">
                <button className="btn" style={{ backgroundColor: 'transparent', border: '1px solid var(--primary-aluno)', color: 'var(--primary-aluno)', width: '100%', margin: '15px 0 0 0' }}>
                  Ver Gráfico Completo
                </button>
              </Link>
            </>
          ) : (
            <p>Ainda não há dados suficientes para mostrar sua evolução.</p>
          )}
        </div>

      </div>
    </div>
  );
}