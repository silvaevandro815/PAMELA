'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { 
  Plus, 
  Phone, 
  Calendar, 
  MessageSquare, 
  X,
  Search,
  TrendingUp,
  Target,
  BarChart2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';
import { Lead, StatusLead, PlanoType } from '@/types';

interface KanbanModuleProps {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
}

const COLUMNS: StatusLead[] = [
  'Novos Contatos',
  'Em Atendimento',
  'Aguardando Pagamento',
  'Ganho (Virou Aluno)',
  'Perdido'
];

export const KanbanModule: React.FC<KanbanModuleProps> = ({ leads, setLeads }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Lead Form State
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [interesse, setInteresse] = useState<PlanoType>('Mentoria Individual');
  const [notas, setNotas] = useState('');

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedLeads = Array.from(leads);
    const targetLead = updatedLeads.find(l => l.id === draggableId);

    if (targetLead) {
      targetLead.status_venda = destination.droppableId as StatusLead;
      targetLead.data_ultimo_contato = new Date().toISOString();
      setLeads(updatedLeads);
    }
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !telefone) return;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      nome,
      telefone,
      interesse,
      status_venda: 'Novos Contatos',
      data_ultimo_contato: new Date().toISOString(),
      notas
    };

    setLeads([newLead, ...leads]);
    setNome('');
    setTelefone('');
    setNotas('');
    setIsModalOpen(false);
  };

  const filteredLeads = leads.filter(l => 
    l.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.telefone.includes(searchTerm)
  );

  // Conversion Metrics
  const totalLeads = leads.length;
  const ganhosCount = leads.filter(l => l.status_venda === 'Ganho (Virou Aluno)').length;
  const taxaConversao = totalLeads > 0 ? ((ganhosCount / totalLeads) * 100).toFixed(1) : '0.0';

  const chartFunnelData = COLUMNS.map(col => ({
    etapa: col.replace(' (Virou Aluno)', ''),
    quantidade: leads.filter(l => l.status_venda === col).length
  }));

  const COLORS = ['#0E2A47', '#1d4ed8', '#C89A44', '#10b981', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#C89A44]/20 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#0E2A47]">Funil de Vendas & CRM de Leads</h1>
          <p className="text-sm text-[#0E2A47]/70">Acompanhamento e conversão automatizada do primeiro contato até o fechamento</p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar lead por nome ou fone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F5E9DA]/50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-[#C89A44] text-[#0E2A47] font-bold rounded-xl shadow-md hover:bg-[#b28639] transition-all text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Lead</span>
          </button>
        </div>
      </div>

      {/* Analytics Conversion Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-[#0E2A47] text-[#C89A44] rounded-xl">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Taxa de Conversão</p>
            <p className="text-xl font-extrabold text-[#0E2A47]">{taxaConversao}%</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Novos Alunos Convertidos</p>
            <p className="text-xl font-extrabold text-emerald-600">{ganhosCount} Aluno(s)</p>
          </div>
        </div>

        {/* Recharts Funnel Mini BarChart */}
        <div className="md:col-span-2 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="w-full h-16">
            <p className="text-[10px] font-bold text-[#0E2A47] uppercase tracking-wider mb-1 flex items-center space-x-1">
              <BarChart2 className="w-3 h-3 text-[#C89A44]" />
              <span>Distribuição por Etapa</span>
            </p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartFunnelData}>
                <XAxis dataKey="etapa" fontSize={9} tickLine={false} />
                <Tooltip formatter={(value) => [`${value} lead(s)`, 'Total']} />
                <Bar dataKey="quantidade" radius={[4, 4, 0, 0]}>
                  {chartFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((column) => {
            const columnLeads = filteredLeads.filter(l => l.status_venda === column);
            
            return (
              <div key={column} className="bg-[#F5E9DA]/40 p-4 rounded-2xl border border-gray-200/80 flex flex-col min-h-[500px]">
                {/* Column Header */}
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#C89A44]/30">
                  <h3 className="text-xs font-bold text-[#0E2A47] tracking-wider uppercase">{column}</h3>
                  <span className="px-2 py-0.5 text-xs font-extrabold bg-[#0E2A47] text-white rounded-full">
                    {columnLeads.length}
                  </span>
                </div>

                {/* Droppable Container */}
                <Droppable droppableId={column}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 space-y-3 p-1 transition-colors rounded-xl ${
                        snapshot.isDraggingOver ? 'bg-[#C89A44]/10 border-2 border-dashed border-[#C89A44]' : ''
                      }`}
                    >
                      {columnLeads.map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all ${
                                snapshot.isDragging ? 'shadow-2xl rotate-2 ring-2 ring-[#C89A44]' : ''
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-[#0E2A47] text-sm">{lead.nome}</h4>
                                <span className={`text-[10px] px-2 py-0.5 font-bold rounded-md ${
                                  lead.interesse === 'Masterclass'
                                    ? 'bg-purple-100 text-purple-800'
                                    : lead.interesse === 'Mentoria Individual'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {lead.interesse}
                                </span>
                              </div>

                              <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                                <div className="flex items-center space-x-1.5">
                                  <Phone className="w-3.5 h-3.5 text-[#C89A44]" />
                                  <span>{lead.telefone}</span>
                                </div>
                                <div className="flex items-center space-x-1.5 text-[11px] text-gray-400">
                                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                  <span>{new Date(lead.data_ultimo_contato).toLocaleDateString('pt-BR')}</span>
                                </div>
                              </div>

                              {lead.notas && (
                                <div className="mt-3 p-2 bg-[#F5E9DA]/50 rounded-lg text-[11px] text-[#0E2A47]/80 flex items-start space-x-1">
                                  <MessageSquare className="w-3 h-3 text-[#C89A44] shrink-0 mt-0.5" />
                                  <span className="line-clamp-2">{lead.notas}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Modal Novo Lead */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#C89A44]/30 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold text-[#0E2A47]">Adicionar Novo Lead</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0E2A47] mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ana Clara Ribeiro"
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

              <div>
                <label className="block text-xs font-bold text-[#0E2A47] mb-1">Curso / Serviço de Interesse</label>
                <select
                  value={interesse}
                  onChange={(e) => setInteresse(e.target.value as PlanoType)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#C89A44]"
                >
                  <option value="Mentoria Individual">Mentoria Individual (R$ 150/h)</option>
                  <option value="Aula em Grupo">Aula em Grupo (R$ 200/mês)</option>
                  <option value="Masterclass">Masterclass (R$ 2.500)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E2A47] mb-1">Observações Inicial</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Quer destravar o canto para ministério de louvor..."
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
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
                  Salvar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
