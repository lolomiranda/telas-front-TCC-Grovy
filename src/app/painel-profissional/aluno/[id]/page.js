'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '../../../../components/ThemeToggle'; // Ajuste o caminho conforme necessário

export default function ProntuarioAluno() {
  const params = useParams();
  const student_id = params.id; // Pega o ID da URL

  const [planoData, setPlanoData] = useState({
    title: '',
    type: 'diet',
    description: ''
  });

  // Estado para a lista dinâmica de refeições/exercícios
  const [conteudo, setConteudo] = useState([
    { refeicao: '', alimentos: '' }
  ]);

  const handlePlanoChange = (e) => {
    setPlanoData({ ...planoData, [e.target.name]: e.target.value });
  };

  const handleConteudoChange = (index, field, value) => {
    const novoConteudo = [...conteudo];
    novoConteudo[index][field] = value;
    setConteudo(novoConteudo);
  };

  const adicionarItem = () => {
    setConteudo([...conteudo, { refeicao: '', alimentos: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Montando o JSON exato que o seu backend pede
    const payload = {
      student_id: parseInt(student_id),
      title: planoData.title,
      type: planoData.type,
      description: planoData.description,
      content: conteudo
    };

    console.log("Enviando POST /api/plans:", payload);
    alert("Plano criado e enviado para o aluno com sucesso!");
  };

  return (
    <div style={{ minHeight: '100vh', padding: '30px', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
      
      <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '15px' }}>
        <ThemeToggle />
        <Link href="/painel-profissional">
          <button className="btn" style={{ backgroundColor: 'var(--toggle-bg)', margin: 0, padding: '8px 16px' }}>Voltar</button>
        </Link>
      </div>

      <header style={{ marginTop: '20px', marginBottom: '30px' }}>
        <h1 style={{ color: 'var(--primary-prof)' }}>Prontuário do Aluno #{student_id}</h1>
        <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>Prescreva o plano alimentar ou de treinamento.</p>
      </header>

      <div className="form-container" style={{ margin: '0 auto', maxWidth: '100%' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Tipo de Plano</label>
            <select name="type" className="form-select" value={planoData.type} onChange={handlePlanoChange}>
              <option value="diet">Dieta / Plano Alimentar</option>
              <option value="workout">Treino / Exercícios</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Título do Plano</label>
            <input type="text" name="title" className="form-input" placeholder="Ex: Fase 1 - Adaptação" onChange={handlePlanoChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Descrição Geral</label>
            <textarea name="description" className="form-input" rows="2" placeholder="Orientações gerais..." onChange={handlePlanoChange} required />
          </div>

          <hr style={{ margin: '20px 0', borderColor: 'var(--border)' }} />
          
          <h3 style={{ marginBottom: '15px', color: 'var(--primary-prof)' }}>Itens do Plano</h3>
          
          {conteudo.map((item, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder={planoData.type === 'diet' ? "Refeição (Ex: Almoço)" : "Grupo Muscular"}
                value={item.refeicao}
                onChange={(e) => handleConteudoChange(index, 'refeicao', e.target.value)}
                required
                style={{ flex: 1 }}
              />
              <input 
                type="text" 
                className="form-input" 
                placeholder={planoData.type === 'diet' ? "Alimentos" : "Exercícios"}
                value={item.alimentos}
                onChange={(e) => handleConteudoChange(index, 'alimentos', e.target.value)}
                required
                style={{ flex: 2 }}
              />
            </div>
          ))}

          <button type="button" onClick={adicionarItem} className="btn" style={{ backgroundColor: 'var(--toggle-bg)', color: 'var(--foreground)', width: '100%', marginBottom: '20px' }}>
            + Adicionar mais um item
          </button>

          <button type="submit" className="btn" style={{ backgroundColor: 'var(--primary-prof)', width: '100%' }}>
            Salvar e Enviar Plano
          </button>
        </form>
      </div>
    </div>
  );
}