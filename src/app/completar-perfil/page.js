'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CompletarPerfil() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Lê se o usuário é cliente ou profissional pela URL
  const role = searchParams.get('role') || 'cliente'; 
  const [profType, setProfType] = useState('nutricionista');

  // Dados do Paciente
  const [pacienteData, setPacienteData] = useState({
    nascimento: '',
    genero: '',
    altura: '',
    peso: '',
    objetivo: 'Hipertrofia e definição'
  });

  // Dados do Profissional
  const [profissionalData, setProfissionalData] = useState({
    registro: '', 
    bio: ''
  });

  const handlePacienteChange = (e) => {
    setPacienteData({ ...pacienteData, [e.target.name]: e.target.value });
  };

  const handleProfissionalChange = (e) => {
    setProfissionalData({ ...profissionalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === 'cliente') {
      console.log("Enviando para /api/perfil/paciente:", pacienteData);
      alert("Perfil de Aluno completo! Indo para o painel...");
      router.push('/painel-aluno');
    } else {
      const payloadProfissional = {
        "CRN/CREF": profissionalData.registro,
        bio: profissionalData.bio
      };
      console.log("Enviando para /api/perfil/profissional:", payloadProfissional);
      alert("Perfil de Profissional completo! Indo para o painel...");
      router.push('/painel-profissional');
    }
  };

  return (
    <main className="center-screen">
      <h1>Quase lá!</h1>
      <p style={{ marginBottom: '20px' }}>Passo 2 de 2: Precisamos de mais alguns detalhes.</p>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          
          {/* FORMULÁRIO DO CLIENTE/ALUNO */}
          {role === 'cliente' && (
            <>
              <h3 style={{ marginBottom: '15px', color: 'var(--primary-aluno)', textAlign: 'left' }}>
                Dados Corporais
              </h3>

              <div className="form-group">
                <label className="form-label">Data de Nascimento</label>
                <input type="date" name="nascimento" className="form-input" onChange={handlePacienteChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Gênero</label>
                <select name="genero" className="form-select" onChange={handlePacienteChange} required>
                  <option value="">Selecione...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Altura (m)</label>
                  <input type="number" step="0.01" name="altura" className="form-input" placeholder="Ex: 1.75" onChange={handlePacienteChange} required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Peso Inicial (kg)</label>
                  <input type="number" step="0.1" name="peso" className="form-input" placeholder="Ex: 80.5" onChange={handlePacienteChange} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Principal Objetivo</label>
                <select name="objetivo" className="form-select" value={pacienteData.objetivo} onChange={handlePacienteChange}>
                  <option value="Hipertrofia e definição">Hipertrofia e Definição</option>
                  <option value="Emagrecimento">Emagrecimento</option>
                  <option value="Qualidade de vida">Qualidade de Vida e Saúde</option>
                  <option value="Performance esportiva">Performance Esportiva</option>
                </select>
              </div>
            </>
          )}

          {/* FORMULÁRIO DO PROFISSIONAL (NUTRI/PERSONAL) */}
          {role === 'profissional' && (
            <>
              <h3 style={{ marginBottom: '15px', color: 'var(--primary-prof)', textAlign: 'left' }}>
                Dados Profissionais
              </h3>

              <div className="form-group">
                <label className="form-label">Sua Especialidade</label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '5px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                    <input type="radio" checked={profType === 'nutricionista'} onChange={() => setProfType('nutricionista')} /> Nutricionista
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                    <input type="radio" checked={profType === 'personal'} onChange={() => setProfType('personal')} /> Personal Trainer
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{profType === 'nutricionista' ? 'Número do CRN' : 'Número do CREF'}</label>
                <input type="text" name="registro" className="form-input" placeholder={profType === 'nutricionista' ? 'Ex: CRN-3 12345' : 'Ex: 123456-G/SP'} onChange={handleProfissionalChange} required />
              </div>

              <div className="form-group">
                <label className="form-label">Sua Bio (Aparecerá no seu perfil público)</label>
                <textarea 
                  name="bio" 
                  rows="4" 
                  className="form-input"
                  placeholder="Conte um pouco sobre sua experiência e metodologia de trabalho..." 
                  onChange={handleProfissionalChange} 
                  required
                  style={{ resize: 'vertical' }}
                />
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="btn" 
            style={{ 
              width: '100%', 
              marginTop: '10px',
              backgroundColor: role === 'cliente' ? 'var(--primary-aluno)' : 'var(--primary-prof)'
            }}
          >
            Finalizar Cadastro
          </button>
        </form>
      </div>
    </main>
  );
}