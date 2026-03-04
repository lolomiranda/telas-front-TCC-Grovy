'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '../../../../components/ThemeToggle';

export default function PerfilProfissionalPublico() {
  const params = useParams();
  const router = useRouter();
  const [aba, setAba] = useState('perfil'); // 'perfil' ou 'dicas'

  return (
    <main className="center-screen">
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeToggle />
      </div>

      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ color: 'var(--primary-prof)' }}>Perfil do Profissional</h1>
        <p>Conheça mais sobre o especialista e seus conteúdos.</p>
      </header>

      <div className="form-container">
        {/* Abas de Navegação Interna */}
        <div className="user-type-selector">
          <button 
            className={`type-btn ${aba === 'perfil' ? 'active-prof' : ''}`}
            onClick={() => setAba('perfil')}
          >
            Sobre
          </button>
          <button 
            className={`type-btn ${aba === 'dicas' ? 'active-prof' : ''}`}
            onClick={() => setAba('dicas')}
          >
            Dicas & Conteúdos
          </button>
        </div>

        {aba === 'perfil' ? (
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ marginBottom: '10px' }}>Dr. Nome do Profissional</h2>
            <p style={{ color: 'var(--primary-prof)', fontWeight: 'bold' }}>CRN/CREF: 000000</p>
            <p style={{ marginTop: '15px', lineHeight: '1.6' }}>
              Esta é a biografia do profissional. Aqui aparecerão as especialidades e a metodologia de trabalho.
            </p>
            <button 
              className="btn" 
              style={{ width: '100%', marginTop: '20px', backgroundColor: 'var(--primary-aluno)' }}
              onClick={() => alert('Solicitação enviada!')}
            >
              Solicitar Acompanhamento
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'left' }}>
            <div style={{ padding: '10px', borderBottom: '1px solid var(--border)', marginBottom: '10px' }}>
              <h4>Título da Dica</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Resumo do conteúdo postado pelo profissional...</p>
            </div>
          </div>
        )}

        <Link href="/marketplace">
          <button className="btn" style={{ width: '100%', marginTop: '10px', backgroundColor: 'var(--toggle-bg)', color: 'var(--foreground)' }}>
            Voltar para Busca
          </button>
        </Link>
      </div>
    </main>
  );
}