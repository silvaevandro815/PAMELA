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
  Clock,
  Sparkles,
  PieChart as PieChartIcon,
  BarChart3
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
  onNavigateToAi?: () => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({ 
  alunos, 
  transacoes,
  onNavigateToAi 
}) => {
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

  // Chart Data 1: Area Chart 6 Months
  const chartEvolucao = [
    { mes: 'Fev', Receitas: 1800, Despesas: 900 },
    { mes: 'Mar', Receitas: 2200, Despesas: 1100 },
    { mes: 'Abr', Receitas: 2100, Despesas: 950 },
    { mes: 'Mai', Receitas: 2700, Despesas: 1200 },
    { mes: 'Jun', Receitas: 3200, Despesas: 1050 },
    { mes: 'Jul', Receitas: faturamentoMes || 2850, Despesas: despesasMes || 1270 },
  ];

  // Chart Data 2: Pie Chart (Alunos por Plano)
  const mentoriaCount = alunos.filter(a => a.plano_atual === 'Mentoria Individual').length;
  const grupoCount = alunos.filter(a => a.plano_atual === 'Aula em Grupo').length;
  const masterclassCount = alunos.filter(a => a.plano_atual === 'Masterclass').length;

  const chartPlanos = [
    { name: 'Mentoria Individual', value: mentoriaCount || 2, color: '#C89A44' },
    { name: 'Aula em Grupo', value: grupoCount || 1, color: '#0E2A47' },
    { name: 'Masterclass', value: masterclassCount || 1, color: '#8b5cf6' },
  ];

  // Chart Data 3: Bar Chart (Receita por Categoria)
  const chartReceitaCategoria = [
    { categoria: 'Mentoria', valor: 1650 },
    { categoria: 'Grupo', valor: 800 },
    { categoria: 'Masterclass', valor: 2500 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#C89A44]/20 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#0E2A47]">Dashboard Inteligente Pâmela Vieira</h1>
          <p className="text-sm text-[#0E2A47]/70">Controle financeiro intuitivo e inteligência de alunos Método CP12</p>
        </div>
        
        {onNavigateToAi && (
          <button
            onClick={onNavigateToAi}
            className="flex items-center space-x-2 px-4 py-2 bg-[#0E2A47] text-[#C89A44] font-bold text-xs rounded-xl shadow border border-[#C89A44]/30 hover:bg-[#153a61] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ver Consultoria Alícia IA</span>
          </button>
        )}
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
            <span>+14% de crescimento</span>
          </div>
        </div>

        {/* Card 2: Despesas */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <span className="text-xs font-medium text-gray-500">Despesas Efetuadas</span>
            <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#0E2A47] mt-3">
            R$ {despesasMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center space-x-1 text-rose-500 text-xs font-semibold mt-2">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Dentro do orçamento</span>
          </div>
        </div>

        {/* Card 3: Lucro Líquido (Dourado Highlight) */}
        <div className="bg-gradient-to-br from-[#C89A44] to-[#b28639] text-[#0E2A47] p-5 rounded-2xl shadow-lg shadow-[#C89A44]/20 hover:shadow-xl transition-all">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E2A47]/80">Lucro Líquido Real</span>
            <div className="p-2 bg-white/20 rounded-xl text-[#0E2A47]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-[#0E2A47] mt-3">
            R$ {lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center space-x-1 text-[#0E2A47] text-xs font-bold mt-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Excelente Margem</span>
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

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Recharts Area Chart (6 Months) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#0E2A47]">Evolução Financeira (Últimos 6 Meses)</h2>
              <p className="text-xs text-gray-500">Fluxo contínuo entre receitas de mensalidades e custos operacionais</p>
            </div>
            <span className="px-3 py-1 bg-[#F5E9DA] text-[#C89A44] text-xs font-bold rounded-lg border border-[#C89A44]/30">
              Método CP12
            </span>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartEvolucao} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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

        {/* Chart 2: Pie Chart (Distribuição por Plano) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#0E2A47]">Alunos por Plano</h2>
              <PieChartIcon className="w-4 h-4 text-[#C89A44]" />
            </div>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartPlanos}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartPlanos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} aluno(s)`, 'Total']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-2">
              {chartPlanos.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-gray-600 font-medium">{item.name}</span>
                  </div>
                  <span className="font-extrabold text-[#0E2A47]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
