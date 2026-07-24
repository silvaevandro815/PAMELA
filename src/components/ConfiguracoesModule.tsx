'use client';

import React from 'react';
import { 
  Settings, 
  Database, 
  Smartphone, 
  Key, 
  Sparkles, 
  CheckCircle, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const ConfiguracoesModule: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#C89A44]/20 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#0E2A47]">Configurações & Integrações</h1>
          <p className="text-sm text-[#0E2A47]/70">Parâmetros do sistema, credenciais Supabase e conexão com WhatsApp API</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Supabase Connection */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-[#0E2A47]">
            <div className="p-3 bg-[#0E2A47] text-[#C89A44] rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-base">Banco de Dados Supabase (V3)</h2>
              <p className="text-xs text-gray-500">PostgreSQL de alta disponibilidade</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">URL do Supabase (`NEXT_PUBLIC_SUPABASE_URL`)</label>
              <input
                type="text"
                readOnly
                value={process.env.NEXT_PUBLIC_SUPABASE_URL || 'Conectado (Variável de Ambiente Exemplo)'}
                className="w-full px-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Chave Pública (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)</label>
              <input
                type="password"
                readOnly
                value="••••••••••••••••••••••••••••••••••••••••"
                className="w-full px-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 text-gray-600"
              />
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center space-x-2 text-emerald-800 text-xs font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Extensão uuid-ossp e tabelas V3 ativas</span>
            </div>
          </div>
        </div>

        {/* WhatsApp & Evolution API */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 text-[#0E2A47]">
            <div className="p-3 bg-[#C89A44] text-[#0E2A47] rounded-xl">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-base">WhatsApp & Instância Evolution API</h2>
              <p className="text-xs text-gray-500">Conexão do robô de cobrança e Alícia</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Instância WhatsApp Ativa</label>
              <input
                type="text"
                readOnly
                value="higia-cesar / Pamela"
                className="w-full px-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 font-mono text-[#0E2A47]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Chave PIX para Cobrança</label>
              <input
                type="text"
                readOnly
                value="sdmdigital7@gmail.com"
                className="w-full px-3 py-2 text-xs bg-amber-50 font-bold border border-amber-200 rounded-xl text-amber-900"
              />
            </div>

            <div className="p-3 bg-[#F5E9DA] rounded-xl border border-[#C89A44]/30 flex items-center justify-between text-[#0E2A47] text-xs font-bold">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#C89A44]" />
                <span>Anti-Spam ativado (Wait 15s)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-[#0E2A47] text-white rounded">Protegido</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
