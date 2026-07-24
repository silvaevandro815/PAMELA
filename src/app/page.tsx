'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardModule } from '@/components/DashboardModule';
import { KanbanModule } from '@/components/KanbanModule';
import { AlunosModule } from '@/components/AlunosModule';
import { FinanceiroModule } from '@/components/FinanceiroModule';
import { AiInsightsWidget } from '@/components/AiInsightsWidget';
import { ConfiguracoesModule } from '@/components/ConfiguracoesModule';
import { initialMockAlunos, initialMockLeads, initialMockTransacoes } from '@/lib/supabase';
import { Aluno, Lead, Transacao } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Application Global State
  const [alunos, setAlunos] = useState<Aluno[]>(initialMockAlunos);
  const [leads, setLeads] = useState<Lead[]>(initialMockLeads);
  const [transacoes, setTransacoes] = useState<Transacao[]>(initialMockTransacoes);

  return (
    <div className="flex min-h-screen bg-[#F5E9DA]">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all">
        {activeTab === 'dashboard' && (
          <DashboardModule 
            alunos={alunos} 
            transacoes={transacoes} 
            onNavigateToAi={() => setActiveTab('insights')}
          />
        )}

        {activeTab === 'kanban' && (
          <KanbanModule leads={leads} setLeads={setLeads} />
        )}

        {activeTab === 'alunos' && (
          <AlunosModule alunos={alunos} setAlunos={setAlunos} />
        )}

        {activeTab === 'financeiro' && (
          <FinanceiroModule transacoes={transacoes} setTransacoes={setTransacoes} />
        )}

        {activeTab === 'insights' && (
          <AiInsightsWidget alunos={alunos} transacoes={transacoes} leads={leads} />
        )}

        {activeTab === 'configuracoes' && (
          <ConfiguracoesModule />
        )}
      </main>
    </div>
  );
}
