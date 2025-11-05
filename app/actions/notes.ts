'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export interface Note {
  id: string
  client_id: string
  text: string
  created_at: string
}

export async function getNotes(clientId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Não autenticado')
  }

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data as Note[]
}

export async function createNote(clientId: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  const text = formData.get('text') as string

  if (!text || text.trim() === '') {
    return { error: 'Texto da nota não pode estar vazio' }
  }

  const { error } = await supabase
    .from('notes')
    .insert([{
      client_id: clientId,
      text: text.trim(),
    }])

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/clients/${clientId}`)
  return { success: true }
}

export async function deleteNote(noteId: string, clientId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/clients/${clientId}`)
  return { success: true }
}
