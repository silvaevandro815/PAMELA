export type PlanoType = 'Mentoria Individual' | 'Aula em Grupo' | 'Masterclass';

export type StatusPagamento = 'EM DIA' | 'PENDENTE' | 'ATRASADO';

export type StatusLead = 'Novos Contatos' | 'Em Atendimento' | 'Aguardando Pagamento' | 'Ganho (Virou Aluno)' | 'Perdido';

export type TipoTransacao = 'RECEITA' | 'DESPESA';

export interface Aluno {
  id: string;
  user_id: string; // WhatsApp JID / telefone
  nome: string;
  telefone: string;
  data_nascimento: string;
  plano_atual: PlanoType;
  creditos_ativos: number;
  data_vencimento: string;
  status_pagamento: StatusPagamento;
  criado_em?: string;
}

export interface Lead {
  id: string;
  nome: string;
  telefone: string;
  interesse: PlanoType;
  status_venda: StatusLead;
  data_ultimo_contato: string;
  notas?: string;
}

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoria: string;
  status: 'PAGO' | 'PENDENTE';
  data_vencimento: string;
  data_pagamento?: string;
  aluno_id?: string;
}

export interface DashboardMetrics {
  faturamentoMes: number;
  despesasMes: number;
  lucroLiquido: number;
  totalAlunosAtivos: number;
  contasAPagarPendente: number;
  contasAPagarUrgentes: number;
}
