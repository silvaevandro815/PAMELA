'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Kanban, 
  Users, 
  Wallet, 
  Settings,
  Sparkles,
  Menu,
  X,
  Bot
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab,
  isOpen,
  setIsOpen
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Inteligente', icon: LayoutDashboard },
    { id: 'kanban', label: 'Kanban (Funil de Leads)', icon: Kanban },
    { id: 'alunos', label: 'Gestão de Alunos (CP12)', icon: Users },
    { id: 'financeiro', label: 'Fluxo Financeiro', icon: Wallet },
    { id: 'insights', label: 'IA Consultora (Alícia)', icon: Bot },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-[#0E2A47] text-[#C89A44] rounded-xl shadow-xl hover:bg-opacity-95 transition-all border border-[#C89A44]/30"
        aria-label="Alternar Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#0E2A47] text-white flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out border-r border-[#C89A44]/20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Container with Official Brand Image */}
          <div className="p-4 border-b border-[#C89A44]/20 flex flex-col items-center">
            <div className="w-full aspect-video bg-[#0E2A47] rounded-xl p-2 flex items-center justify-center border-2 border-[#C89A44] shadow-lg shadow-[#C89A44]/10 overflow-hidden relative group">
              <img 
                src="/logo.jpeg" 
                alt="Pâmela Vieira - Técnica Vocal & CP12" 
                className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if logo loading fails
                  const target = e.currentTarget;
                  target.src = '/logo.png';
                }}
              />
            </div>
            <div className="mt-2 text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C89A44] block">
                MÉTOTO CP12 • DESTRAVAMENTO
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-5 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isAiTab = item.id === 'insights';

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#C89A44] text-[#0E2A47] font-bold shadow-lg shadow-[#C89A44]/20'
                      : 'text-white/80 hover:bg-white/10 hover:text-[#C89A44]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon 
                      className={`w-4 h-4 transition-colors ${
                        isActive 
                          ? 'text-[#0E2A47]' 
                          : isAiTab 
                          ? 'text-[#C89A44] animate-pulse' 
                          : 'text-[#C89A44] group-hover:scale-110 transition-transform'
                      }`} 
                    />
                    <span>{item.label}</span>
                  </div>

                  {isAiTab && (
                    <span className="px-1.5 py-0.5 text-[9px] font-black uppercase bg-[#C89A44]/20 text-[#C89A44] group-hover:bg-[#C89A44] group-hover:text-[#0E2A47] rounded border border-[#C89A44]/40">
                      IA
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Brand Info */}
        <div className="p-4 border-t border-[#C89A44]/20 bg-black/20">
          <div className="flex items-center space-x-3 text-xs text-white/70">
            <div className="p-2 bg-[#C89A44]/20 rounded-xl text-[#C89A44]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">Pâmela Vieira</p>
              <p className="text-[10px] text-[#C89A44] font-medium">Gestão Vocal & Financeira</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
