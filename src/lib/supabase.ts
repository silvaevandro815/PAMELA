import { createClient } from '@supabase/supabase-js';
import { Aluno, Lead, Transacao } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const initialMockAlunos: Aluno[] = [
  {
    id: '1',
    user_id: '5532999887766',
    nome: 'Carolina Mendonça',
    telefone: '(32) 99988-7766',
    data_nascimento: '1995-04-12',
    plano_atual: 'Mentoria Individual',
    creditos_ativos: 3,
    data_vencimento: '2026-08-05',
    status_pagamento: 'EM DIA',
  },
  {
    id: '2',
    user_id: '5532988776655',
    nome: 'Gabriel Santos',
    telefone: '(32) 98877-6655',
    data_nascimento: '2001-09-20',
    plano_atual: 'Aula em Grupo',
    creditos_ativos: 4,
    data_vencimento: '2026-07-28',
    status_pagamento: 'EM DIA',
  },
  {
    id: '3',
    user_id: '5532977665544',
    nome: 'Mariana Oliveira',
    telefone: '(32) 97766-5544',
    data_nascimento: '1988-11-03',
    plano_atual: 'Mentoria Individual',
    creditos_ativos: 0,
    data_vencimento: '2026-07-15',
    status_pagamento: 'ATRASADO',
  },
  {
    id: '4',
    user_id: '5532966554433',
    nome: 'Ministério de Louvor IPR',
    telefone: '(32) 96655-4433',
    data_nascimento: '1990-01-01',
    plano_atual: 'Masterclass',
    creditos_ativos: 1,
    data_vencimento: '2026-08-10',
    status_pagamento: 'PENDENTE',
  }
];

export const initialMockLeads: Lead[] = [
  {
    id: 'lead-1',
    nome: 'Lucas Ferraz',
    telefone: '(32) 99123-4567',
    interesse: 'Mentoria Individual',
    status_venda: 'Novos Contatos',
    data_ultimo_contato: '2026-07-23T14:30:00Z',
    notas: 'Quer destravar o agudo para o louvor'
  },
  {
    id: 'lead-2',
    nome: 'Beatriz Lima',
    telefone: '(32) 99876-5432',
    interesse: 'Aula em Grupo',
    status_venda: 'Em Atendimento',
    data_ultimo_contato: '2026-07-22T10:15:00Z',
    notas: 'Pediu informações sobre os horários de terça'
  },
  {
    id: 'lead-3',
    nome: 'Igreja Presbiteriana Central',
    telefone: '(32) 98456-7890',
    interesse: 'Masterclass',
    status_venda: 'Aguardando Pagamento',
    data_ultimo_contato: '2026-07-21T18:00:00Z',
    notas: 'Aguardando aprovação do PIX de R$ 2.500'
  },
  {
    id: 'lead-4',
    nome: 'Thiago Alencar',
    telefone: '(32) 99345-6789',
    interesse: 'Mentoria Individual',
    status_venda: 'Ganho (Virou Aluno)',
    data_ultimo_contato: '2026-07-20T09:00:00Z',
    notas: 'Fechou o pacote mensal R$ 150/h'
  },
  {
    id: 'lead-5',
    nome: 'Renata Costa',
    telefone: '(32) 99789-0123',
    interesse: 'Aula em Grupo',
    status_venda: 'Perdido',
    data_ultimo_contato: '2026-07-10T11:00:00Z',
    notas: 'Achou o horário incompatível'
  }
];

export const initialMockTransacoes: Transacao[] = [
  {
    id: 't-1',
    descricao: 'Mensalidade Mentoria - Carolina Mendonça',
    valor: 150.00,
    tipo: 'RECEITA',
    categoria: 'Mentoria Individual',
    status: 'PAGO',
    data_vencimento: '2026-07-05',
    data_pagamento: '2026-07-04'
  },
  {
    id: 't-2',
    descricao: 'Mensalidade Grupo - Gabriel Santos',
    valor: 200.00,
    tipo: 'RECEITA',
    categoria: 'Aula em Grupo',
    status: 'PAGO',
    data_vencimento: '2026-07-08',
    data_pagamento: '2026-07-07'
  },
  {
    id: 't-3',
    descricao: 'Aluguel do Estúdio de Canto',
    valor: 800.00,
    tipo: 'DESPESA',
    categoria: 'Infraestrutura',
    status: 'PAGO',
    data_vencimento: '2026-07-10',
    data_pagamento: '2026-07-09'
  },
  {
    id: 't-4',
    descricao: 'Anúncios Meta Ads (Tráfego Pago)',
    valor: 350.00,
    tipo: 'DESPESA',
    categoria: 'Marketing',
    status: 'PAGO',
    data_vencimento: '2026-07-15',
    data_pagamento: '2026-07-15'
  },
  {
    id: 't-5',
    descricao: 'Masterclass Igreja Batista',
    valor: 2500.00,
    tipo: 'RECEITA',
    categoria: 'Masterclass',
    status: 'PAGO',
    data_vencimento: '2026-07-18',
    data_pagamento: '2026-07-18'
  },
  {
    id: 't-6',
    descricao: 'Assinatura Plataforma EAD / N8N Cloud',
    valor: 120.00,
    tipo: 'DESPESA',
    categoria: 'Tecnologia',
    status: 'PENDENTE',
    data_vencimento: '2026-07-28'
  },
  {
    id: 't-7',
    descricao: 'Manutenção Equipamentos de Áudio',
    valor: 250.00,
    tipo: 'DESPESA',
    categoria: 'Manutenção',
    status: 'PENDENTE',
    data_vencimento: '2026-07-30'
  }
];
