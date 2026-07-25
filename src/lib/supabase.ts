import { createClient } from '@supabase/supabase-js';
import { Aluno, Lead, Transacao, DespesaRecorrente } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// MOCK DATA SEED (Para primeira apresentação)
// ==========================================

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
    nivel_cp12: 'Nível 3 - Liberação Diafragmática',
    extensao_vocal: 'Mezzo-soprano (A3-C6)',
    observacoes_pedagogicas: 'Excelente controle de afinação no agudo. Trabalhando transição de registro de cabeça.'
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
    nivel_cp12: 'Nível 2 - Ressonância Máscara',
    extensao_vocal: 'Tenor (C3-G4)',
    observacoes_pedagogicas: 'Apresenta boa projeção vocal nas aulas de grupo. Ótima rítmica.'
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
    nivel_cp12: 'Nível 1 - Destravamento Emocional',
    extensao_vocal: 'Soprano (C4-E6)',
    observacoes_pedagogicas: 'Voz limpa e afinada, necessita renovação das 4 aulas mensais.'
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
    nivel_cp12: 'Masterclass Técnica Coral',
    extensao_vocal: 'Vozes Mistas (Basses & Sopranos)',
    observacoes_pedagogicas: 'Treinamento de harmonia funcional e arranjo de vozes para o grupo.'
  }
];

export const initialMockLeads: Lead[] = [
  {
    id: 'lead-1',
    nome: 'Lucas Ferraz',
    telefone: '(32) 99123-4567',
    interesse: 'Mentoria Individual',
    status_venda: 'Novos Contatos',
    data_ultimo_contato: new Date().toISOString(),
    notas: 'Quer destravar o agudo para o louvor congregacional',
    valor_estimado: 150
  },
  {
    id: 'lead-2',
    nome: 'Beatriz Lima',
    telefone: '(32) 99876-5432',
    interesse: 'Aula em Grupo',
    status_venda: 'Em Atendimento',
    data_ultimo_contato: new Date(Date.now() - 24*60*60*1000).toISOString(),
    notas: 'Pediu informações sobre os horários de terça-feira',
    valor_estimado: 200
  },
  {
    id: 'lead-3',
    nome: 'Igreja Presbiteriana Central',
    telefone: '(32) 98456-7890',
    interesse: 'Masterclass',
    status_venda: 'Aguardando Pagamento',
    data_ultimo_contato: new Date(Date.now() - 48*60*60*1000).toISOString(),
    notas: 'Aguardando aprovação da tesouraria do PIX R$ 2.500',
    valor_estimado: 2500
  },
  {
    id: 'lead-4',
    nome: 'Thiago Alencar',
    telefone: '(32) 99345-6789',
    interesse: 'Mentoria Individual',
    status_venda: 'Ganho (Virou Aluno)',
    data_ultimo_contato: new Date(Date.now() - 72*60*60*1000).toISOString(),
    notas: 'Fechou o pacote mensal de Mentoria R$ 150/h',
    valor_estimado: 150
  },
  {
    id: 'lead-5',
    nome: 'Renata Costa',
    telefone: '(32) 99789-0123',
    interesse: 'Aula em Grupo',
    status_venda: 'Perdido',
    data_ultimo_contato: new Date(Date.now() - 120*60*60*1000).toISOString(),
    notas: 'Horário de quinta-feira incompatível com o trabalho',
    valor_estimado: 200
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
    descricao: 'Aluguel do Estúdio de Canto (Recorrente)',
    valor: 800.00,
    tipo: 'DESPESA',
    categoria: 'Infraestrutura',
    status: 'PAGO',
    data_vencimento: '2026-07-10',
    data_pagamento: '2026-07-09',
    recorrente: true
  },
  {
    id: 't-4',
    descricao: 'Anúncios Meta Ads (Tráfego Pago)',
    valor: 350.00,
    tipo: 'DESPESA',
    categoria: 'Marketing',
    status: 'PAGO',
    data_vencimento: '2026-07-15',
    data_pagamento: '2026-07-15',
    recorrente: true
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
    descricao: 'Assinatura Plataforma N8N Cloud / Servidor',
    valor: 120.00,
    tipo: 'DESPESA',
    categoria: 'Tecnologia',
    status: 'PENDENTE',
    data_vencimento: '2026-07-28',
    recorrente: true
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

export const initialMockDespesasRecorrentes: DespesaRecorrente[] = [
  {
    id: 'dr-1',
    descricao: 'Aluguel do Estúdio Vocal',
    valor: 800.00,
    categoria: 'Infraestrutura',
    dia_vencimento: 10,
    ativo: true
  },
  {
    id: 'dr-2',
    descricao: 'Meta Ads (Tráfego Pago Anúncios)',
    valor: 350.00,
    categoria: 'Marketing',
    dia_vencimento: 15,
    ativo: true
  },
  {
    id: 'dr-3',
    descricao: 'Servidor VPS & Automações n8n',
    valor: 120.00,
    categoria: 'Tecnologia',
    dia_vencimento: 28,
    ativo: true
  }
];

// ==========================================
// FUNÇÕES SUPABASE REAL COM SEED FALLBACK
// ==========================================

export async function getAlunosDB(): Promise<Aluno[]> {
  try {
    const { data, error } = await supabase.from('alunos').select('*').order('nome', { ascending: true });
    if (error || !data || data.length === 0) {
      return initialMockAlunos;
    }
    return data as Aluno[];
  } catch {
    return initialMockAlunos;
  }
}

export async function saveAlunoDB(aluno: Aluno): Promise<void> {
  try {
    await supabase.from('alunos').upsert(aluno);
  } catch (err) {
    console.warn('Persistindo localmente caso o Supabase não esteja conectado:', err);
  }
}

export async function getLeadsDB(): Promise<Lead[]> {
  try {
    const { data, error } = await supabase.from('leads').select('*').order('data_ultimo_contato', { ascending: false });
    if (error || !data || data.length === 0) {
      return initialMockLeads;
    }
    return data as Lead[];
  } catch {
    return initialMockLeads;
  }
}

export async function updateLeadStatusDB(id: string, status_venda: string): Promise<void> {
  try {
    await supabase.from('leads').update({ 
      status_venda, 
      data_ultimo_contato: new Date().toISOString() 
    }).eq('id', id);
  } catch (err) {
    console.warn('Lead atualizado localmente:', err);
  }
}

export async function saveLeadDB(lead: Lead): Promise<void> {
  try {
    await supabase.from('leads').upsert(lead);
  } catch (err) {
    console.warn('Lead inserido localmente:', err);
  }
}

export async function getTransacoesDB(): Promise<Transacao[]> {
  try {
    const { data, error } = await supabase.from('transacoes').select('*').order('data_vencimento', { ascending: false });
    if (error || !data || data.length === 0) {
      return initialMockTransacoes;
    }
    return data as Transacao[];
  } catch {
    return initialMockTransacoes;
  }
}

export async function saveTransacaoDB(transacao: Transacao): Promise<void> {
  try {
    await supabase.from('transacoes').upsert(transacao);
  } catch (err) {
    console.warn('Transação salva localmente:', err);
  }
}

export async function deleteTransacaoDB(id: string): Promise<void> {
  try {
    await supabase.from('transacoes').delete().eq('id', id);
  } catch (err) {
    console.warn('Transação removida localmente:', err);
  }
}

export async function getDespesasRecorrentesDB(): Promise<DespesaRecorrente[]> {
  try {
    const { data, error } = await supabase.from('despesas_recorrentes').select('*').order('dia_vencimento', { ascending: true });
    if (error || !data || data.length === 0) {
      return initialMockDespesasRecorrentes;
    }
    return data as DespesaRecorrente[];
  } catch {
    return initialMockDespesasRecorrentes;
  }
}

export async function saveDespesaRecorrenteDB(despesa: DespesaRecorrente): Promise<void> {
  try {
    await supabase.from('despesas_recorrentes').upsert(despesa);
  } catch (err) {
    console.warn('Despesa recorrente salva localmente:', err);
  }
}
