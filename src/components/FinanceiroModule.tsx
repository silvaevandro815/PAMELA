'use client';

import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Filter, 
  X,
  PieChart,
  Calendar
} from 'lucide-react';
import { Transacao, TipoTransacao } from '@/types';

interface FinanceiroModuleProps {
  transacoes: Transacao[];
  setTransacoes: React.Dispatch<React.SetStateAction<Transacao[]>>;
}

export const FinanceiroModule: React.FC<FinanceiroModuleProps> = ({ transacoes, setTransacoes }) => {
  const [activeTab, setActiveTab] = useState<'TODOS' | 'RECEITAS' | 'DESPESAS' | 'CONTAS_A_PAGAR'>('TODOS');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Transaction Form State
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState<TipoTransacao>('DESPESA');
  const [categoria, setCategoria] = useState('Infraestrutura');
  const [status, setStatus] = useState<'PAGO' | 'PENDENTE'>('PENDENTE');
  const [dataVencimento, setDataVencimento] = useState(new Date().toISOString().split('T')[0]);

  // Financial Calculations
  const receitasPagas = transacoes
    .filter(t => t.tipo === 'RECEITA' && t.status === 'PAGO')
    .reduce((acc, t) => acc + t.valor, 0);

  const despesasPagas = transacoes
    .filter(t => t.tipo === 'DESPESA' && t.status === 'PAGO')
    .reduce((acc, t) => acc + t.valor, 0);

  const lucroLiquido = receitasPagas - despesasPagas;

  const contasAPagarPendentes = transacoes
    .filter(t => t.tipo === 'DESPESA' && t.status === 'PENDENTE')
    .reduce((acc, t) => acc + t.valor, 0);

  const handleAddTransacao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao || valor <= 0) return;

    const newTransacao: Transacao = {
      id: `t-${Date.now()}`,
      descricao,
      valor: Number(valor),
      tipo,
      categoria,
      status,
      data_vencimento: dataVencimento,
      data_pagamento: status === 'PAGO' ? new Date().toISOString().split('T')[0] : undefined
    };

    setTransacoes([newTransacao, ...transacoes]);
    setDescricao('');
    setValor(0);
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setTransacoes(transacoes.map(t => {
      if (t.id === id) {
        const newStatus = t.status === 'PAGO' ? 'PENDENTE' : 'PAGO';
        return {
          ...t,
          status: newStatus,
          data_pagamento: newStatus === 'PAGO' ? new Date().toISOString().split('T')[0] : undefined
        };
      }
      return t;
    }));
  };

  const filteredTransacoes = transacoes.filter(t => {
    if (activeTab === 'RECEITAS') return t.tipo === 'RECEITA';
    if (activeTab === 'DESPESAS') return t.tipo === 'DESPESA';
    if (activeTab === 'CONTAS_A_PAGAR') return t.tipo === 'DESPESA' && t.status === 'PENDENTE';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#C89A44]/20 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#0E2A47]">Fluxo de Caixa & Lançamentos</h1>
          <p className="text-sm text-[#0E2A47]/70">Controle rigoroso de receitas, custos operacionais e lucro líquido</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#C89A44] text-[#0E2A47] font-bold rounded-xl shadow-md hover:bg-[#b28639] transition-all text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Lançamento</span>
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center text-gray-500 text-xs font-semibold">
            <span>Receitas Confirmadas</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 mt-2">
            R$ {receitasPagas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center text-gray-500 text-xs font-semibold">
            <span>Despesas Efetuadas</span>
            <TrendingDown className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-extrabold text-rose-600 mt-2">
            R$ {despesasPagas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#0E2A47] to-[#1a3e63] text-white p-5 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center text-[#C89A44] text-xs font-bold uppercase tracking-wider">
            <span>Lucro Líquido Real</span>
            <DollarSign className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">
            R$ {lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-sm">
          <div className="flex justify-between items-center text-amber-800 text-xs font-bold">
            <span>Contas a Pagar (Abertas)</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-900 mt-2">
            R$ {contasAPagarPendentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 bg-white p-2 rounded-2xl border border-gray-100 overflow-x-auto">
        {[
          { id: 'TODOS', label: 'Todas as Transações' },
          { id: 'RECEITAS', label: 'Receitas (Entradas)' },
          { id: 'DESPESAS', label: 'Despesas (Saídas)' },
          { id: 'CONTAS_A_PAGAR', label: '⚠️ Contas a Pagar' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-[#0E2A47] text-[#C89A44] shadow'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0E2A47] text-white text-xs uppercase tracking-wider font-semibold">
                <th className="p-4">Descrição</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Vencimento</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredTransacoes.length > 0 ? (
                filteredTransacoes.map(t => (
                  <tr key={t.id} className="hover:bg-[#F5E9DA]/30 transition-colors">
                    <td className="p-4 font-bold text-[#0E2A47]">{t.descricao}</td>

                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                        t.tipo === 'RECEITA' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {t.tipo}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600">{t.categoria}</td>

                    <td className="p-4 text-gray-500 font-medium">
                      {new Date(t.data_vencimento).toLocaleDateString('pt-BR')}
                    </td>

                    <td className="p-4 font-extrabold text-sm text-[#0E2A47]">
                      R$ {t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        t.status === 'PAGO' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t.status === 'PAGO' ? 'PAGO / RECEBIDO' : 'PENDENTE'}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(t.id)}
                        className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                          t.status === 'PAGO'
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow'
                        }`}
                      >
                        {t.status === 'PAGO' ? 'Marcar Pendente' : 'Confirmar Pgto'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    Nenhum lançamento encontrado para a aba selecionada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Lançamento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#C89A44]/30 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-[#0E2A47]">Novo Lançamento Financeiro</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTransacao} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0E2A47] mb-1">Descrição</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aluguel do Estúdio / Tráfego Meta Ads"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0E2A47] mb-1">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    min={0}
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0E2A47] mb-1">Tipo</label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as TipoTransacao)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                  >
                    <option value="DESPESA">Despesa (Saída)</option>
                    <option value="RECEITA">Receita (Entrada)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0E2A47] mb-1">Categoria</label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                  >
                    <option value="Infraestrutura">Infraestrutura</option>
                    <option value="Marketing">Marketing & Anúncios</option>
                    <option value="Tecnologia">Tecnologia & Softwares</option>
                    <option value="Mentoria Individual">Mentoria Individual</option>
                    <option value="Aula em Grupo">Aula em Grupo</option>
                    <option value="Masterclass">Masterclass</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0E2A47] mb-1">Status Inicial</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                  >
                    <option value="PENDENTE">Pendente</option>
                    <option value="PAGO">Pago / Efetuado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E2A47] mb-1">Data de Vencimento</label>
                <input
                  type="date"
                  value={dataVencimento}
                  onChange={(e) => setDataVencimento(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
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
                  Salvar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
