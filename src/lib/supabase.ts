import { createClient } from '@supabase/supabase-js';
import { Aluno, Lead, Transacao, DespesaRecorrente } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// DADOS INICIAIS ZERADOS (Produção Pronta)
// ==========================================

export const initialMockAlunos: Aluno[] = [];

export const initialMockLeads: Lead[] = [];

export const initialMockTransacoes: Transacao[] = [];

export const initialMockDespesasRecorrentes: DespesaRecorrente[] = [];

// ==========================================
// FUNÇÕES SUPABASE REAL
// ==========================================

export async function getAlunosDB(): Promise<Aluno[]> {
  try {
    const { data, error } = await supabase.from('alunos').select('*').order('nome', { ascending: true });
    if (error || !data) {
      return [];
    }
    return data as Aluno[];
  } catch {
    return [];
  }
}

export async function saveAlunoDB(aluno: Aluno): Promise<void> {
  try {
    await supabase.from('alunos').upsert(aluno);
  } catch (err) {
    console.warn('Erro ao salvar aluno no Supabase:', err);
  }
}

export async function getLeadsDB(): Promise<Lead[]> {
  try {
    const { data, error } = await supabase.from('leads').select('*').order('data_ultimo_contato', { ascending: false });
    if (error || !data) {
      return [];
    }
    return data as Lead[];
  } catch {
    return [];
  }
}

export async function updateLeadStatusDB(id: string, status_venda: string): Promise<void> {
  try {
    await supabase.from('leads').update({ 
      status_venda, 
      data_ultimo_contato: new Date().toISOString() 
    }).eq('id', id);
  } catch (err) {
    console.warn('Erro ao atualizar lead no Supabase:', err);
  }
}

export async function saveLeadDB(lead: Lead): Promise<void> {
  try {
    await supabase.from('leads').upsert(lead);
  } catch (err) {
    console.warn('Erro ao salvar lead no Supabase:', err);
  }
}

export async function getTransacoesDB(): Promise<Transacao[]> {
  try {
    const { data, error } = await supabase.from('transacoes').select('*').order('data_vencimento', { ascending: false });
    if (error || !data) {
      return [];
    }
    return data as Transacao[];
  } catch {
    return [];
  }
}

export async function saveTransacaoDB(transacao: Transacao): Promise<void> {
  try {
    await supabase.from('transacoes').upsert(transacao);
  } catch (err) {
    console.warn('Erro ao salvar transação no Supabase:', err);
  }
}

export async function deleteTransacaoDB(id: string): Promise<void> {
  try {
    await supabase.from('transacoes').delete().eq('id', id);
  } catch (err) {
    console.warn('Erro ao remover transação no Supabase:', err);
  }
}

export async function getDespesasRecorrentesDB(): Promise<DespesaRecorrente[]> {
  try {
    const { data, error } = await supabase.from('despesas_recorrentes').select('*').order('dia_vencimento', { ascending: true });
    if (error || !data) {
      return [];
    }
    return data as DespesaRecorrente[];
  } catch {
    return [];
  }
}

export async function saveDespesaRecorrenteDB(despesa: DespesaRecorrente): Promise<void> {
  try {
    await supabase.from('despesas_recorrentes').upsert(despesa);
  } catch (err) {
    console.warn('Erro ao salvar despesa recorrente no Supabase:', err);
  }
}
