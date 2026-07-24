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
  X
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
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'kanban', label: 'Kanban (Leads)', icon: Kanban },
    { id: 'alunos', label: 'Gestão de Alunos', icon: Users },
    { id: 'financeiro', label: 'Financeiro', icon: Wallet },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-[#0E2A47] text-[#C89A44] rounded-lg shadow-lg hover:bg-opacity-90 transition-all"
        aria-label="Alternar Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#0E2A47] text-white flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Container */}
          <div className="p-4 border-b border-[#C89A44]/20 flex flex-col items-center">
            <div className="w-full aspect-video bg-white/5 rounded-xl p-3 flex items-center justify-center border border-[#C89A44]/30 shadow-inner overflow-hidden relative">
              <img 
                src="/logo.png" 
                alt="Pâmela Vieira - Técnica Vocal & CP12" 
                className="max-h-full max-w-full object-contain filter drop-shadow"
                onError={(e) => {
                  // Fallback visually elegant header if image missing
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-logo')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-logo flex flex-col items-center justify-center text-center';
                    fallback.innerHTML = `
                      <span className="text-[#C89A44] font-bold text-lg tracking-wider font-serif">PÂMELA VIEIRA</span>
                      <span className="text-xs text-white/70 tracking-widest font-sans">TÉCNICA VOCAL & CP12</span>
                    `;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-6 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#C89A44] text-[#0E2A47] font-semibold shadow-lg shadow-[#C89A44]/20'
                      : 'text-white/80 hover:bg-white/10 hover:text-[#C89A44]'
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-[#0E2A47]' : 'text-[#C89A44] group-hover:scale-110 transition-transform'
                    }`} 
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Brand Info */}
        <div className="p-4 border-t border-[#C89A44]/20 bg-black/20">
          <div className="flex items-center space-x-3 text-xs text-white/70">
            <div className="p-2 bg-[#C89A44]/20 rounded-lg text-[#C89A44]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Método CP12</p>
              <p className="text-[10px] text-[#C89A44]">Painel Administrativo v2.5</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
