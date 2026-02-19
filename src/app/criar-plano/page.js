"use client";

import { useState } from 'react';
import ThemeToggle from '../../components/ThemeToggle';

export default function CriarPlano() {
  const [loading, setLoading] = useState(false);

  // Dados gerais do plano
  const [formData, setFormData] = useState({
    student_id: '',
    title: '',
    type: 'diet', // Começa como dieta por padrão
    description: '',
  });

  // Lista dinâmica de conteúdo (refeições ou exercícios)
  const [contentItems, setContentItems] = useState([
    { refeicao: '', alimentos: '' }
  ]);

  // Atualiza os campos gerais
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Se mudar o tipo de plano, reseta os itens dinâmicos para combinar com o tipo
    if (name === 'type') {
      if (value === 'diet') {
        setContentItems([{ refeicao: '', alimentos: '' }]);
      } else {
        setContentItems([{ exercicio: '', series_repeticoes: '' }]);
      }
    }
  };

  // Atualiza um item específico da lista dinâmica
  const handleContentChange = (index, field, value) => {
    const newItems = [...contentItems];
    newItems[index][field] = value;
    setContentItems(newItems);
  };

  // Adiciona uma nova linha na lista
  const addContentItem = () => {
    if (formData.type === 'diet') {
      setContentItems([...contentItems, { refeicao: '', alimentos: '' }]);
    } else {
      setContentItems([...contentItems, { exercicio: '', series_repeticoes: '' }]);
    }
  };

  // Remove uma linha da lista
  const removeContentItem = (index) => {
    const newItems = contentItems.filter((_, i) => i !== index);
    setContentItems(newItems);
  };

  // Envia para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Monta o JSON exatamente como a sua API espera
    const payload = {
      student_id: parseInt(formData.student_id),
      title: formData.title,
      type: formData.type,
      description: formData.description,
      content: contentItems
    };

    console.log("Enviando JSON:", payload);

    try {
      const response = await fetch('http://localhost:8000/api/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': `Bearer SEU_TOKEN_AQUI`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Plano criado com sucesso!');
        // Limpa o formulário após salvar
        setFormData({ student_id: '', title: '', type: 'diet', description: '' });
        setContentItems([{ refeicao: '', alimentos: '' }]);
      } else {
        throw new Error('Erro ao salvar o plano.');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '100vh' }}>
      
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <ThemeToggle />
      </div>

      <h1 style={{ color: 'var(--primary-prof)', marginBottom: '10px' }}>Criar Novo Plano</h1>
      <p style={{ marginBottom: '30px' }}>Prescreva treinos ou dietas para os seus alunos.</p>

      <div className="form-container" style={{ margin: '0 auto', maxWidth: '100%' }}>
        <form onSubmit={handleSubmit}>
          
          {/* --- DADOS GERAIS DO PLANO --- */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">ID do Aluno</label>
              <input
                type="number"
                name="student_id"
                className="form-input"
                value={formData.student_id}
                onChange={handleFormChange}
                required
                placeholder="Ex: 1"
              />
            </div>

            <div className="form-group" style={{ flex: 2 }}>
              <label className="form-label">Tipo de Plano</label>
              <select 
                name="type" 
                className="form-input" 
                value={formData.type} 
                onChange={handleFormChange}
              >
                <option value="diet">Dieta</option>
                <option value="workout">Treino</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Título do Plano</label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleFormChange}
              required
              placeholder="Ex: Dieta Low Carb - Fase 1"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descrição / Instruções Gerais</label>
            <textarea
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleFormChange}
              required
              rows="3"
              placeholder="Ex: Foco em reduzir carboidratos refinados..."
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>

          <hr style={{ margin: '30px 0', borderColor: 'var(--border)' }} />

          {/* --- CONTEÚDO DINÂMICO (REFEIÇÕES OU EXERCÍCIOS) --- */}
          <h3 style={{ color: 'var(--primary-prof)', marginBottom: '20px' }}>
            {formData.type === 'diet' ? '🍽️ Refeições da Dieta' : '🏋️ Exercícios do Treino'}
          </h3>

          {contentItems.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px', 
              backgroundColor: 'var(--background)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border)'
            }}>
              
              {formData.type === 'diet' ? (
                <>
                  <div style={{ flex: 1 }}>
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Refeição</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.refeicao}
                      onChange={(e) => handleContentChange(index, 'refeicao', e.target.value)}
                      placeholder="Ex: Café da Manhã"
                      required
                    />
                  </div>
                  <div style={{ flex: 2 }}>
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Alimentos</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.alimentos}
                      onChange={(e) => handleContentChange(index, 'alimentos', e.target.value)}
                      placeholder="Ex: 3 Ovos + Café sem açúcar"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ flex: 2 }}>
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Exercício</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.exercicio}
                      onChange={(e) => handleContentChange(index, 'exercicio', e.target.value)}
                      placeholder="Ex: Supino Reto"
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="form-label" style={{ fontSize: '0.85rem' }}>Séries x Repetições</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.series_repeticoes}
                      onChange={(e) => handleContentChange(index, 'series_repeticoes', e.target.value)}
                      placeholder="Ex: 4x12"
                      required
                    />
                  </div>
                </>
              )}

              {/* Botão para remover linha */}
              {contentItems.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeContentItem(index)}
                  style={{ 
                    marginTop: '22px', background: '#ef4444', color: 'white', border: 'none', 
                    borderRadius: '6px', width: '40px', height: '40px', cursor: 'pointer', fontWeight: 'bold' 
                  }}
                  title="Remover item"
                >
                  X
                </button>
              )}
            </div>
          ))}

          {/* Botão para adicionar mais itens */}
          <button 
            type="button" 
            onClick={addContentItem}
            style={{ 
              width: '100%', padding: '10px', background: 'transparent', 
              color: 'var(--primary-prof)', border: '2px dashed var(--primary-prof)', 
              borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '30px'
            }}
          >
            + Adicionar {formData.type === 'diet' ? 'Refeição' : 'Exercício'}
          </button>

          <button 
            type="submit" 
            className="btn" 
            disabled={loading}
            style={{ backgroundColor: 'var(--primary-prof)', width: '100%' }}
          >
            {loading ? 'A guardar...' : 'Salvar e Enviar para o Aluno'}
          </button>

        </form>
      </div>
    </main>
  );
}