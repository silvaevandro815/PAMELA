'use client';

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Aluno, Transacao } from '@/types';

interface DashboardModuleProps {
  alunos: Aluno[];
  transacoes: Transacao[];
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({ alunos, transacoes }) => {
  // Calculations
  const totalAlunosAtivos = alunos.filter(a => a.status_pagamento === 'EM DIA').length;
  
  const faturamentoMes = transacoes
    .filter(t => t.tipo === 'RECEITA' && t.status === 'PAGO')
    .reduce((acc, t) => acc + t.valor, 0);

  const despesasMes = transacoes
    .filter(t => t.tipo === 'DESPESA' && t.status === 'PAGO')
    .reduce((acc, t) => acc + t.valor, 0);

  const lucroLiquido = faturamentoMes - despesasMes;

  const contasAPagarPendente = transacoes
    .filter(t => t.tipo === 'DESPESA' && t.status === 'PENDENTE')
    .reduce((acc, t) => acc + t.valor, 0);

  const contasPertoVencimento = transacoes.filter(t => t.tipo === 'DESPESA' && t.status === 'PENDENTE');

  // Chart data 6 months
  const chartData = [
    { mes: 'Fev', Receitas: 1800, Despesas: 900 },
    { mes: 'Mar', Receitas: 2200, Despesas: 1100 },
    { mes: 'Abr', Receitas: 2100, Despesas: 950 },
    { mes: 'Mai', Receitas: 2700, Despesas: 1200 },
    { mes: 'Jun', Receitas: 3200, Despesas: 1050 },
    { mes: 'Jul', Receitas: faturamentoMes || 2850, Despesas: despesasMes || 1270 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#C89A44]/20 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#0E2A47]">Visão Geral da Escola</h1>
          <p className="text-sm text-[#0E2A47]/70">Acompanhamento financeiro e pedagógico em tempo real</p>
        </div>
        <div className="flex items-center space-x-2 bg-[#F5E9DA] px-4 py-2 rounded-xl border border-[#C89A44]/30">
          <Calendar className="w-4 h-4 text-[#C89A44]" />
          <span className="text-xs font-semibold text-[#0E2A47]">
            {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Top 5 Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Faturamento */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-gray-500">Faturamento do Mês</span>
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#0E2A47] mt-3">
            R$ {faturamentoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center space-x-1 text-emerald-600 text-xs font-semibold mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14% vs mês anterior</span>
          </div>
        </div>

        {/* Card 2: Despesas */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-gray-500">Despesas Pagas</span>
            <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#0E2A47] mt-3">
            R$ {despesasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center space-x-1 text-rose-500 text-xs font-semibold mt-2">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Controlado</span>
          </div>
        </div>

        {/* Card 3: Lucro Líquido (Dourado Highlight) */}
        <div className="bg-gradient-to-br from-[#C89A44] to-[#b28639] text-[#0E2A47] p-5 rounded-2xl shadow-lg shadow-[#C89A44]/20 hover:shadow-xl transition-all">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E2A47]/80">Lucro Líquido</span>
            <div className="p-2 bg-white/20 rounded-xl text-[#0E2A47]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#0E2A47] mt-3">
            R$ {lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center space-x-1 text-[#0E2A47] text-xs font-bold mt-2">
            <SparklesIcon />
            <span>Margem Saudável</span>
          </div>
        </div>

        {/* Card 4: Alunos Ativos */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-gray-500">Alunos Ativos</span>
            <div className="p-2 bg-blue-50 rounded-xl text-[#0E2A47]">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#0E2A47] mt-3">
            {totalAlunosAtivos} Alunos
          </p>
          <div className="flex items-center space-x-1 text-blue-600 text-xs font-semibold mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Em dia no sistema</span>
          </div>
        </div>

        {/* Card 5: Contas a Pagar (Alert) */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-amber-700">Contas a Pagar</span>
            <div className="p-2 bg-amber-50 rounded-xl text-amber-600 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-amber-900 mt-3">
            R$ {contasAPagarPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center space-x-1 text-amber-700 text-xs font-semibold mt-2">
            <Clock className="w-3.5 h-3.5" />
            <span>{contasPertoVencimento.length} conta(s) pendente(s)</span>
          </div>
        </div>
      </div>

      {/* Main Chart + Quick Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recharts Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#0E2A47]">Evolução Financeira (Últimos 6 Meses)</h2>
              <p className="text-xs text-gray-500">Comparativo entre faturamento bruto e despesas operacionais</p>
            </div>
            <span className="px-3 py-1 bg-[#F5E9DA] text-[#C89A44] text-xs font-bold rounded-lg border border-[#C89A44]/30">
              Método CP12
            </span>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C89A44" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#C89A44" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0E2A47" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0E2A47" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" stroke="#888888" fontSize={12} tickLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} tickFormatter={(v) => `R$ ${v}`} />
                <Tooltip 
                  formatter={(value: any) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']}
                  contentStyle={{ backgroundColor: '#0E2A47', borderRadius: '12px', color: '#fff', border: 'none' }}
                  itemStyle={{ color: '#C89A44' }}
                />
                <Legend />
                <Area type="monotone" dataKey="Receitas" stroke="#C89A44" strokeWidth={3} fillOpacity={1} fill="url(#colorReceitas)" />
                <Area type="monotone" dataKey="Despesas" stroke="#0E2A47" strokeWidth={2} fillOpacity={1} fill="url(#colorDespesas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Alerts Widget */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-lg font-bold text-[#0E2A47] mb-4">Avisos e Pendências</h2>
            <div className="space-y-3">
              {contasPertoVencimento.length > 0 ? (
                contasPertoVencimento.map(conta => (
                  <div key={conta.id} className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-amber-900">{conta.descricao}</p>
                      <p className="text-[10px] text-amber-700">Vence em: {conta.data_vencimento}</p>
                    </div>
                    <span className="text-xs font-extrabold text-amber-800">
                      R$ {conta.valor.toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-emerald-50 rounded-xl text-emerald-800 text-xs font-semibold text-center">
                  Nenhuma conta pendente para hoje! 🎉
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-[#F5E9DA] rounded-xl border border-[#C89A44]/30">
            <h3 className="text-xs font-bold text-[#0E2A47] flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C89A44]"></span>
              <span>Dica do Método CP12</span>
            </h3>
            <p className="text-[11px] text-[#0E2A47]/80 mt-1">
              Garanta que os alunos com 0 créditos de aula sejam notificados pela Alícia 24h antes para renovação do plano.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SparklesIcon = () => (
  <svg className="w-3.5 h-3.5 text-[#0E2A47]" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 2a1 1 0 011 1v1.323l.707.707 1.323-1.323a1 1 0 011.414 1.414l-1.323 1.323.707.707H17a1 1 0 010 2h-1.323l-.707.707 1.323 1.323a1 1 0 01-1.414 1.414l-1.323-1.323-.707.707V17a1 1 0 01-2 0v-1.323l-.707-.707-1.323 1.323a1 1 0 01-1.414-1.414l1.323-1.323-.707-.707H3a1 1 0 010-2h1.323l.707-.707-1.323-1.323a1 1 0 011.414-1.414l1.323 1.323.707-.707V3a1 1 0 011-1z" />
  </svg>
);
