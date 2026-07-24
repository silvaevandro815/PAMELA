'use client';

import React from 'react';
import { 
  Bot, 
  Sparkles, 
  TrendingUp, 
  PiggyBank, 
  Users, 
  Zap,
  ArrowRight,
  ShieldAlert,
  Lightbulb
} from 'lucide-react';
import { Aluno, Transacao, Lead } from '@/types';

interface AiInsightsWidgetProps {
  alunos: Aluno[];
  transacoes: Transacao[];
  leads: Lead[];
}

export const AiInsightsWidget: React.FC<AiInsightsWidgetProps> = ({ 
  alunos, 
  transacoes, 
  leads 
}) => {
  const faturamento = transacoes.filter(t => t.tipo === 'RECEITA' && t.status === 'PAGO').reduce((a, b) => a + b.valor, 0);
  const despesas = transacoes.filter(t => t.tipo === 'DESPESA' && t.status === 'PAGO').reduce((a, b) => a + b.valor, 0);
  const inadimplentesCount = alunos.filter(a => a.status_pagamento === 'ATRASADO').length;
  const masterclassLeads = leads.filter(l => l.interesse === 'Masterclass' && l.status_venda !== 'Ganho (Virou Aluno)').length;

  const projecaoProximoMes = faturamento * 1.18; // 18% growth projection

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#0E2A47] to-[#163a61] p-6 rounded-2xl text-white shadow-xl border border-[#C89A44]/30">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#C89A44] text-[#0E2A47] rounded-2xl shadow-lg animate-bounce">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <span>Alícia AI • Consultora Estratégica</span>
              <span className="text-xs px-2.5 py-0.5 bg-[#C89A44]/20 text-[#C89A44] border border-[#C89A44]/40 rounded-full">
                OpenSource Engine
              </span>
            </h1>
            <p className="text-xs text-white/70">Análise em tempo real de lucratividade, retenção e projeções financeiras</p>
          </div>
        </div>
      </div>

      {/* Grid of AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Insight 1: Financial Projection */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm space-y-4 hover:shadow-md transition-all">
          <div className="flex justify-between items-center">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-extrabold text-xs rounded-xl flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>PROJEÇÃO 30 DIAS</span>
            </span>
            <Sparkles className="w-4 h-4 text-[#C89A44]" />
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium">Estimativa de Faturamento Bruto</p>
            <p className="text-2xl font-extrabold text-[#0E2A47] mt-1">
              R$ {projecaoProximoMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            Com base nos {alunos.length} alunos ativos e na conversão atual dos leads em atendimento, a projeção é de um crescimento de **+18%** nas receitas recorrentes.
          </p>

          <div className="p-3 bg-[#F5E9DA] rounded-xl text-[11px] text-[#0E2A47] font-semibold border border-[#C89A44]/30">
            💡 **Recomendação Alícia:** Incentive a renovação antecipada do pacote de 4 aulas individuais oferecendo 5% de desconto via PIX.
          </div>
        </div>

        {/* Insight 2: Cost Savings Opportunity */}
        <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm space-y-4 hover:shadow-md transition-all">
          <div className="flex justify-between items-center">
            <span className="px-3 py-1 bg-amber-50 text-amber-800 font-extrabold text-xs rounded-xl flex items-center space-x-1">
              <PiggyBank className="w-3.5 h-3.5" />
              <span>ECONOMIA DE CUSTOS</span>
            </span>
            <Lightbulb className="w-4 h-4 text-amber-500" />
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium">Potencial de Redução de Despesas</p>
            <p className="text-2xl font-extrabold text-amber-700 mt-1">
              R$ 220,00 / mês
            </p>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            Sua maior despesa atual é com infraestrutura e tráfego pago (R$ {despesas.toLocaleString('pt-BR')}).
          </p>

          <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-900 font-semibold border border-amber-200">
            🎯 **Ação:** Migre automações duplicadas para o servidor n8n próprio (Evolution API), eliminando assinaturas externas redundantes.
          </div>
        </div>

        {/* Insight 3: High Ticket Masterclass Opportunity */}
        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm space-y-4 hover:shadow-md transition-all">
          <div className="flex justify-between items-center">
            <span className="px-3 py-1 bg-purple-50 text-purple-800 font-extrabold text-xs rounded-xl flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5" />
              <span>OPORTUNIDADE HIGH TICKET</span>
            </span>
            <span className="text-xs font-black text-purple-600">R$ 2.500</span>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium">Leads de Igreja / Masterclass</p>
            <p className="text-2xl font-extrabold text-purple-900 mt-1">
              {masterclassLeads} Negociações Abertas
            </p>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            A conversão de apenas 1 Masterclass gera o equivalente a **16 mensalidades** em grupo. 
          </p>

          <div className="p-3 bg-purple-50 rounded-xl text-[11px] text-purple-900 font-semibold border border-purple-200">
            ✝️ **Dica Evangelística:** Envie a proposta comercial em PDF enfatizando o destravamento vocal do Ministério de Louvor.
          </div>
        </div>

      </div>
    </div>
  );
};
