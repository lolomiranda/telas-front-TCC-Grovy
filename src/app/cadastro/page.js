'use client';

import { useState } from 'react';
import ThemeToggle from '../../components/ThemeToggle'; 

export default function Cadastro() {
  // 1. Estado para a Categoria Principal (Cliente ou Profissional)
  const [userCategory, setUserCategory] = useState('cliente'); 

  // 2. Estado para os Sub-tipos
  const [profType, setProfType] = useState('nutricionista'); // 'nutricionista' ou 'personal'
  const [clientGoal, setClientGoal] = useState('hipertrofia'); // objetivo do cliente

  // 3. Dados do formulário (Campos comuns e específicos)
  const [formData, setFormData] = useState({
    nome: '',           // Adicionei nome para ficar mais completo
    nascimento: '',
    genero: '',
    altura: '',         // Apenas para cliente
    peso: '',           // Apenas para cliente
    registroProfissional: '' // CRN ou CREF (Apenas para profissional)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Montando o objeto final para envio
    const finalData = {
      categoria: userCategory,
      subTipo: userCategory === 'profissional' ? profType : clientGoal,
      ...formData
    };

    // Limpeza: Remove campos inúteis (ex: peso se for profissional)
    if (userCategory === 'profissional') {
        delete finalData.altura;
        delete finalData.peso;
    } else {
        delete finalData.registroProfissional;
    }

    console.log("Dados Prontos para Envio:", finalData);
    alert(`Cadastro de ${userCategory} (${userCategory === 'profissional' ? profType : clientGoal}) enviado!`);
  };

  return (
    <main className="center-screen">
      
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeToggle />
      </div>

      <h1>Crie sua conta</h1>
      <p style={{marginBottom: '20px'}}>Preencha os dados abaixo.</p>
      
      <div className="form-container">
        
        {/* --- SELETOR PRINCIPAL (Abas) --- */}
        <div className="user-type-selector">
          <button 
            type="button"
            className={`type-btn ${userCategory === 'cliente' ? 'active-aluno' : ''}`}
            onClick={() => setUserCategory('cliente')}
          >
            Sou Cliente
          </button>
          <button 
            type="button"
            className={`type-btn ${userCategory === 'profissional' ? 'active-prof' : ''}`}
            onClick={() => setUserCategory('profissional')}
          >
            Sou Profissional
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          {/* --- CAMPOS COMUNS (Nascimento, Gênero) --- */}
          

          <div className="form-group">
            <label className="form-label">Data de Nascimento</label>
            <input 
              type="date" name="nascimento" className="form-input"
              onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gênero</label>
            <select name="genero" className="form-select" onChange={handleChange} required>
              <option value="">Selecione...</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <hr style={{ margin: '20px 0', borderColor: 'var(--border)' }} />

          {/* --- ÁREA ESPECÍFICA: CLIENTE --- */}
          {userCategory === 'cliente' && (
            <div className="animate-fade-in">
              <h3 style={{marginBottom: '10px', color: 'var(--primary-aluno)'}}>Dados Corporais</h3>
              
              {/* Seleção do Tipo de Objetivo (Tipo de Cliente) */}
              <div className="form-group">
                <label className="form-label">Qual seu objetivo principal?</label>
                <select 
                  className="form-select" 
                  value={clientGoal}
                  onChange={(e) => setClientGoal(e.target.value)}
                >
                  <option value="hipertrofia">Hipertrofia (Ganhar Massa)</option>
                  <option value="emagrecimento">Emagrecimento (Perder Peso)</option>
                  <option value="saude">Saúde e Bem-estar</option>
                  <option value="performance">Performance Esportiva</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Altura (m)</label>
                  <input 
                    type="number" step="0.01" placeholder="1.75"
                    name="altura" className="form-input"
                    onChange={handleChange} required
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Peso (kg)</label>
                  <input 
                    type="number" step="0.1" placeholder="80.5"
                    name="peso" className="form-input"
                    onChange={handleChange} required
                  />
                </div>
              </div>
            </div>
          )}
    {/*
          /*{/* --- ÁREA ESPECÍFICA: PROFISSIONAL --- */} /* */
          {userCategory === 'profissional' && (
            <div className="animate-fade-in">
              <h3 style={{marginBottom: '10px', color: 'var(--primary-prof)'}}>Dados Profissionais</h3>
              
              {/* Seleção do Tipo de Profissional */}
              <div className="form-group">
                <label className="form-label">Qual sua especialidade?</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <label style={{ flex: 1, cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="profType" 
                      checked={profType === 'nutricionista'} 
                      onChange={() => setProfType('nutricionista')}
                      style={{ marginRight: '5px' }}
                    />
                    Nutricionista
                  </label>
                  <label style={{ flex: 1, cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="profType" 
                      checked={profType === 'personal'} 
                      onChange={() => setProfType('personal')}
                      style={{ marginRight: '5px' }}
                    />
                    Personal Trainer
                  </label>
                </div>
              </div>
 
              {/* Campo Específico para Registro (CRN ou CREF) */}
              <div className="form-group">
                <label className="form-label">
                  {profType === 'nutricionista' ? 'Número do CRN' : 'Número do CREF'}
                </label>
                <input 
                  type="text" 
                  name="registroProfissional" 
                  placeholder={profType === 'nutricionista' ? 'Ex: CRN-3 12345' : 'Ex: 123456-G/SP'}
                  className="form-input"
                  onChange={handleChange} 
                  required
                />
              </div>
            </div>
          )}


          {/* Botão Salvar */}
          <button 
            type="submit" 
            className="btn"
            style={{ 
              width: '100%', 
              marginTop: '20px',
              backgroundColor: userCategory === 'cliente' ? 'var(--primary-aluno)' : 'var(--primary-prof)'
            }}
          >
            {userCategory === 'cliente' 
              ? 'Calcular Perfil e Cadastrar' 
              : `Cadastrar como ${profType === 'nutricionista' ? 'Nutricionista' : 'Personal'}`
            }
          </button>

        </form>
      </div>
    </main>
  );
}