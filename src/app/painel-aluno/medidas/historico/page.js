'use client';

import Link from 'next/link';
import ThemeToggle from '../../../../components/ThemeToggle';

export default function HistoricoMedidas() {
  return (
    <main className="center-screen">
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeToggle />
      </div>

      <h1>Meu Histórico</h1>
      <p style={{ marginBottom: '20px' }}>Acompanhe sua evolução ao longo do tempo.</p>

      <div className="form-container">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px' }}>Data</th>
                <th style={{ padding: '10px' }}>Peso</th>
                <th style={{ padding: '10px' }}>Nota</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px' }}>01/03/2026</td>
                <td style={{ padding: '10px' }}>80.5 kg</td>
                <td style={{ padding: '10px' }}>Início</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Link href="/painel-aluno/medidas">
          <button className="btn" style={{ width: '100%', marginTop: '20px', backgroundColor: 'var(--primary-aluno)' }}>
            Novo Registro
          </button>
        </Link>
        <Link href="/painel-aluno">
          <button className="btn" style={{ width: '100%', marginTop: '10px', backgroundColor: 'var(--toggle-bg)', color: 'var(--foreground)' }}>
            Voltar ao Painel
          </button>
        </Link>
      </div>
    </main>
  );
}