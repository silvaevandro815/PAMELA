'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  UserCheck, 
  AlertCircle, 
  Calendar, 
  Phone, 
  ShieldAlert, 
  Edit3, 
  X,
  Award,
  Sparkles
} from 'lucide-react';
import { Aluno, PlanoType, StatusPagamento } from '@/types';

interface AlunosModuleProps {
  alunos: Aluno[];
  setAlunos: React.Dispatch<React.SetStateAction<Aluno[]>>;
}

export const AlunosModule: React.FC<AlunosModuleProps> = ({ alunos, setAlunos }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('TODOS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null);

  // Form State
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [planoAtual, setPlanoAtual] = useState<PlanoType>('Mentoria Individual');
  const [creditosAtivos, setCreditosAtivos] = useState<number>(4);
  const [statusPagamento, setStatusPagamento] = useState<StatusPagamento>('EM DIA');
  const [dataVencimento, setDataVencimento] = useState('');

  // Age calculation helper
  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleOpenCreateModal = () => {
    setEditingAluno(null);
    setNome('');
    setTelefone('');
    setDataNascimento('');
    setPlanoAtual('Mentoria Individual');
    setCreditosAtivos(4);
    setStatusPagamento('EM DIA');
    setDataVencimento(new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (aluno: Aluno) => {
    setEditingAluno(aluno);
    setNome(aluno.nome);
    setTelefone(aluno.telefone);
    setDataNascimento(aluno.data_nascimento);
    setPlanoAtual(aluno.plano_atual);
    setCreditosAtivos(aluno.creditos_ativos);
    setStatusPagamento(aluno.status_pagamento);
    setDataVencimento(aluno.data_vencimento);
    setIsModalOpen(true);
  };

  const handleSaveAluno = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !telefone) return;

    if (editingAluno) {
      setAlunos(alunos.map(a => a.id === editingAluno.id ? {
        ...a,
        nome,
        telefone,
        data_nascimento: dataNascimento,
        plano_atual: planoAtual,
        creditos_ativos: creditosAtivos,
        status_pagamento: statusPagamento,
        data_vencimento: dataVencimento
      } : a));
    } else {
      const newAluno: Aluno = {
        id: `aluno-${Date.now()}`,
        user_id: telefone.replace(/\D/g, ''),
        nome,
        telefone,
        data_nascimento: dataNascimento,
        plano_atual: planoAtual,
        creditos_ativos: creditosAtivos,
        status_pagamento: statusPagamento,
        data_vencimento: dataVencimento || new Date().toISOString().split('T')[0]
      };
      setAlunos([newAluno, ...alunos]);
    }

    setIsModalOpen(false);
  };

  const handleAdjustCreditos = (id: string, delta: number) => {
    setAlunos(alunos.map(a => {
      if (a.id === id) {
        const newCount = Math.max(0, a.creditos_ativos + delta);
        return { ...a, creditos_ativos: newCount };
      }
      return a;
    }));
  };

  const filteredAlunos = alunos.filter(a => {
    const matchesSearch = a.nome.toLowerCase().includes(searchTerm.toLowerCase()) || a.telefone.includes(searchTerm);
    const matchesStatus = statusFilter === 'TODOS' || a.status_pagamento === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#C89A44]/20 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#0E2A47]">Gestão de Alunos (CRM)</h1>
          <p className="text-sm text-[#0E2A47]/70">Controle de inscrições, créditos de aula e idades para Masterclass</p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#C89A44] text-[#0E2A47] font-bold rounded-xl shadow-md hover:bg-[#b28639] transition-all text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Aluno</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar aluno por nome ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5E9DA]/50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-[#0E2A47]">Status:</span>
          {['TODOS', 'EM DIA', 'PENDENTE', 'ATRASADO'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                statusFilter === st
                  ? 'bg-[#0E2A47] text-[#C89A44] shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Alunos Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0E2A47] text-white text-xs uppercase tracking-wider font-semibold">
                <th className="p-4">Aluno</th>
                <th className="p-4">Contato</th>
                <th className="p-4">Plano</th>
                <th className="p-4">Créditos de Aula</th>
                <th className="p-4">Vencimento</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredAlunos.length > 0 ? (
                filteredAlunos.map(aluno => {
                  const age = calculateAge(aluno.data_nascimento);
                  const isUnderageMasterclass = aluno.plano_atual === 'Masterclass' && age < 18;

                  return (
                    <tr key={aluno.id} className="hover:bg-[#F5E9DA]/30 transition-colors">
                      {/* Aluno Name & Age */}
                      <td className="p-4 font-bold text-[#0E2A47]">
                        <div>
                          <span>{aluno.nome}</span>
                          {aluno.data_nascimento && (
                            <p className="text-[10px] font-normal text-gray-500">
                              {age} anos ({new Date(aluno.data_nascimento).toLocaleDateString('pt-BR')})
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="p-4 text-gray-600">
                        <div className="flex items-center space-x-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#C89A44]" />
                          <span>{aluno.telefone}</span>
                        </div>
                      </td>

                      {/* Plano & Warning */}
                      <td className="p-4">
                        <div className="space-y-1">
                          <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                            aluno.plano_atual === 'Masterclass'
                              ? 'bg-purple-100 text-purple-900 border border-purple-200'
                              : aluno.plano_atual === 'Mentoria Individual'
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-blue-100 text-blue-900 border border-blue-200'
                          }`}>
                            {aluno.plano_atual}
                          </span>
                          {isUnderageMasterclass && (
                            <div className="flex items-center space-x-1 text-[10px] font-extrabold text-red-600">
                              <ShieldAlert className="w-3 h-3" />
                              <span>Requer &gt;18 anos!</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Créditos de Aula + Adjustment Buttons */}
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-sm text-[#0E2A47] bg-[#F5E9DA] px-2.5 py-1 rounded-lg border border-[#C89A44]/30">
                            {aluno.creditos_ativos} aulas
                          </span>
                          <button
                            onClick={() => handleAdjustCreditos(aluno.id, 1)}
                            className="p-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded-md font-bold text-xs"
                            title="Adicionar 1 Crédito"
                          >
                            +1
                          </button>
                          <button
                            onClick={() => handleAdjustCreditos(aluno.id, 4)}
                            className="p-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded-md font-bold text-xs"
                            title="Adicionar Pacote 4 Aulas"
                          >
                            +4
                          </button>
                          <button
                            onClick={() => handleAdjustCreditos(aluno.id, -1)}
                            className="p-1 bg-rose-100 text-rose-800 hover:bg-rose-200 rounded-md font-bold text-xs"
                            title="Descontar 1 Aula Consumida"
                          >
                            -1
                          </button>
                        </div>
                      </td>

                      {/* Vencimento */}
                      <td className="p-4 text-gray-600 font-medium">
                        {aluno.data_vencimento ? new Date(aluno.data_vencimento).toLocaleDateString('pt-BR') : '-'}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          aluno.status_pagamento === 'EM DIA'
                            ? 'bg-emerald-100 text-emerald-800'
                            : aluno.status_pagamento === 'PENDENTE'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {aluno.status_pagamento}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleOpenEditModal(aluno)}
                          className="p-2 text-[#0E2A47] hover:bg-[#F5E9DA] rounded-lg transition-colors"
                          aria-label="Editar Aluno"
                        >
                          <Edit3 className="w-4 h-4 text-[#C89A44]" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    Nenhum aluno encontrado para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Cadastro/Edição de Aluno */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#C89A44]/30 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-[#0E2A47]">
                {editingAluno ? 'Editar Cadastro de Aluno' : 'Cadastrar Novo Aluno'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAluno} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0E2A47] mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0E2A47] mb-1">Telefone (WhatsApp)</label>
                  <input
                    type="text"
                    required
                    placeholder="(32) 99999-8888"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0E2A47] mb-1">Data de Nascimento</label>
                  <input
                    type="date"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                  />
                  {dataNascimento && (
                    <p className="text-[10px] text-gray-500 mt-1">
                      Idade calculada: {calculateAge(dataNascimento)} anos
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0E2A47] mb-1">Plano Escolhido</label>
                  <select
                    value={planoAtual}
                    onChange={(e) => setPlanoAtual(e.target.value as PlanoType)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                  >
                    <option value="Mentoria Individual">Mentoria Individual (R$ 150/h)</option>
                    <option value="Aula em Grupo">Aula em Grupo (R$ 200/mês)</option>
                    <option value="Masterclass">Masterclass (R$ 2.500)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0E2A47] mb-1">Créditos de Aula</label>
                  <input
                    type="number"
                    min={0}
                    value={creditosAtivos}
                    onChange={(e) => setCreditosAtivos(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0E2A47] mb-1">Status Pagamento</label>
                  <select
                    value={statusPagamento}
                    onChange={(e) => setStatusPagamento(e.target.value as StatusPagamento)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                  >
                    <option value="EM DIA">EM DIA</option>
                    <option value="PENDENTE">PENDENTE</option>
                    <option value="ATRASADO">ATRASADO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0E2A47] mb-1">Data Vencimento</label>
                  <input
                    type="date"
                    value={dataVencimento}
                    onChange={(e) => setDataVencimento(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#C89A44] text-[#0E2A47] rounded-xl hover:bg-[#b28639] shadow-md"
                >
                  Salvar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
