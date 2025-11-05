'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type QuoteStatus = 'enviado' | 'aceito' | 'rejeitado'

export interface Quote {
  id: string
  client_id: string
  service: string
  value: number
  deadline: string | null
  terms: string | null
  status: QuoteStatus
  created_at: string
}

export async function getQuotes(clientId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Não autenticado')
  }

  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as Quote[]
}

export async function createQuote(clientId: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  const data = {
    client_id: clientId,
    service: formData.get('service') as string,
    value: parseFloat(formData.get('value') as string),
    deadline: formData.get('deadline') as string || null,
    terms: formData.get('terms') as string || null,
    status: 'enviado' as QuoteStatus,
  }

  const { data: quote, error } = await supabase
    .from('quotes')
    .insert([data])
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/clients/${clientId}`)
  return { success: true, quoteId: quote.id }
}

export async function getQuote(quoteId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Não autenticado')
  }

  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('id', quoteId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as Quote
}
