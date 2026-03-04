'use client';

import { useState } from 'react';
import Link from 'next/link';
// Atenção aos três '../' pois essa tela está uma pasta mais funda!
import ThemeToggle from '../../../components/ThemeToggle'; 

export default function MedidasAluno() {
  const [formData, setFormData] = useState({
    peso: '',
    recorded_at: '',
    notes: ''
  });
  const [foto, setFoto] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Como tem arquivo, precisamos usar FormData para enviar pro backend
    const payload = new FormData();
    payload.append('peso', formData.peso);
    payload.append('recorded_at', formData.recorded_at);
    payload.append('notes', formData.notes);
    if (foto) {
      payload.append('photo_front', foto);
    }

    console.log("Enviando Medidas (FormData)...");
    for (let [key, value] of payload.entries()) {
      console.log(`${key}:`, value);
    }
    
    alert("Medidas atualizadas com sucesso!");
    // Limpar o formulário ou redirecionar
  };

  return (
    <div style={{ minHeight: '100vh', padding: '30px', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
      
      <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '15px' }}>
        <ThemeToggle />
        <Link href="/painel-aluno">
          <button className="btn" style={{ backgroundColor: 'var(--toggle-bg)', margin: 0, padding: '8px 16px' }}>Voltar</button>
        </Link>
      </div>

      <header style={{ marginTop: '20px', marginBottom: '30px' }}>
        <h1 style={{ color: 'var(--primary-aluno)' }}>Atualizar Medidas 📏</h1>
        <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>Acompanhe sua evolução registrando seu peso e fotos.</p>
      </header>

      <div className="form-container" style={{ margin: '0 auto', maxWidth: '100%' }}>
        <form onSubmit={handleSubmit}>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label className="form-label">Data da Medição</label>
              <input type="date" name="recorded_at" className="form-input" onChange={handleChange} required />
            </div>

            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label className="form-label">Peso Atual (kg)</label>
              <input type="number" step="0.1" name="peso" className="form-input" placeholder="Ex: 79.8" onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Foto do Shape (Opcional)</label>
            <input 
              type="file" 
              accept="image/*" 
              className="form-input" 
              onChange={handleFileChange}
              style={{ padding: '10px', background: 'var(--background)' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notas e Sensações</label>
            <textarea 
              name="notes" 
              className="form-input" 
              rows="3" 
              placeholder="Ex: Senti menos inchaço hoje, o treino rendeu bem..."
              onChange={handleChange}
              style={{ resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn" style={{ backgroundColor: 'var(--primary-aluno)', width: '100%', marginTop: '10px' }}>
            Salvar Registro
          </button>
        </form>
      </div>

    </div>
  );
}