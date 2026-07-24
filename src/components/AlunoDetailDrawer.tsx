'use client';

import React from 'react';
import { 
  X, 
  Phone, 
  Calendar, 
  Award, 
  CheckCircle2, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Clock,
  Music
} from 'lucide-react';
import { Aluno } from '@/types';

interface AlunoDetailDrawerProps {
  aluno: Aluno | null;
  onClose: () => void;
  onAdjustCreditos: (id: string, delta: number) => void;
}

export const AlunoDetailDrawer: React.FC<AlunoDetailDrawerProps> = ({ 
  aluno, 
  onClose, 
  onAdjustCreditos 
}) => {
  if (!aluno) return null;

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

  const age = calculateAge(aluno.data_nascimento);
  const cleanPhone = aluno.telefone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`}?text=${encodeURIComponent(`Olá, ${aluno.nome}! Tudo bem? Passando para conversarmos sobre suas aulas do Método CP12.`)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-[#C89A44]/30 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="bg-[#0E2A47] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#C89A44] text-[#0E2A47] rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-lg">
                {aluno.nome.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{aluno.nome}</h2>
                <p className="text-xs text-[#C89A44] font-medium">{aluno.plano_atual}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2 text-xs">
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                aluno.status_pagamento === 'EM DIA' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-rose-500 text-white'
              }`}>
                {aluno.status_pagamento}
              </span>
              <span className="text-white/60">• {age} anos</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Abrir WhatsApp</span>
              </a>

              <div className="flex items-center justify-between p-2 bg-[#F5E9DA] rounded-xl border border-[#C89A44]/30">
                <span className="text-xs font-bold text-[#0E2A47]">Créditos:</span>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => onAdjustCreditos(aluno.id, 1)}
                    className="px-2 py-0.5 bg-[#C89A44] text-[#0E2A47] text-xs font-bold rounded"
                  >
                    +1
                  </button>
                  <span className="font-extrabold text-xs text-[#0E2A47] px-1">{aluno.creditos_ativos}</span>
                </div>
              </div>
            </div>

            {/* CP12 Vocal Progress Widget */}
            <div className="bg-[#F5E9DA]/50 p-4 rounded-2xl border border-[#C89A44]/30 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#0E2A47] flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-[#C89A44]" />
                  <span>Evolução Método CP12</span>
                </h3>
                <span className="text-[10px] font-bold bg-[#0E2A47] text-[#C89A44] px-2 py-0.5 rounded">
                  {aluno.nivel_cp12 || 'Nível Intermediário'}
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#0E2A47]/80">
                <div className="flex justify-between">
                  <span>Extensão Vocal:</span>
                  <span className="font-bold">{aluno.extensao_vocal || 'Mezzo-soprano (A3-C6)'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#C89A44] h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-[11px] text-gray-500 italic mt-1">
                  {aluno.observacoes_pedagogicas || 'Demonstra excelente controle de suporte diafragmático e alívio de tensão laríngea.'}
                </p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#0E2A47] uppercase tracking-wider">Dados Cadastrais</h3>
              
              <div className="bg-white p-3 rounded-xl border border-gray-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C89A44]" />
                    <span>Telefone:</span>
                  </span>
                  <span className="font-bold text-[#0E2A47]">{aluno.telefone}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C89A44]" />
                    <span>Nascimento:</span>
                  </span>
                  <span className="font-bold text-[#0E2A47]">
                    {aluno.data_nascimento ? new Date(aluno.data_nascimento).toLocaleDateString('pt-BR') : 'Não informada'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C89A44]" />
                    <span>Próximo Vencimento:</span>
                  </span>
                  <span className="font-bold text-[#0E2A47]">{new Date(aluno.data_vencimento).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#0E2A47] text-white text-xs font-bold rounded-xl"
            >
              Fechar Ficha
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
