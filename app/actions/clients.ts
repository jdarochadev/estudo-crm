'use server'

import { revalidatePath } from 'next/cache'
import { createClient as createSupabaseClient } from '@/lib/supabase/server'

export type ClientStatus = 'novo' | 'negociando' | 'fechado' | 'perdido'

export interface Client {
  id: string
  user_id: string
  name: string
  phone: string | null
  service: string | null
  budget: number | null
  status: ClientStatus
  created_at: string
  updated_at: string
}

export async function getClients(search?: string, status?: ClientStatus) {
  const supabase = await createSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Não autenticado')
  }

  let query = supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (search) {
    query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,service.ilike.%${search}%`)
  }

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data as Client[]
}

export async function getClient(id: string) {
  const supabase = await createSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Não autenticado')
  }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as Client
}

export async function addClient(formData: FormData) {
  const supabase = await createSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  const data = {
    user_id: user.id,
    name: formData.get('name') as string,
    phone: formData.get('phone') as string || null,
    service: formData.get('service') as string || null,
    budget: formData.get('budget') ? parseFloat(formData.get('budget') as string) : null,
    status: (formData.get('status') as ClientStatus) || 'novo',
  }

  const { error } = await supabase
    .from('clients')
    .insert([data])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateClient(id: string, formData: FormData) {
  const supabase = await createSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  const data = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string || null,
    service: formData.get('service') as string || null,
    budget: formData.get('budget') ? parseFloat(formData.get('budget') as string) : null,
    status: formData.get('status') as ClientStatus,
  }

  const { error } = await supabase
    .from('clients')
    .update(data)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/clients/${id}`)
  return { success: true }
}

export async function updateClientStatus(id: string, status: ClientStatus) {
  const supabase = await createSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  const { error } = await supabase
    .from('clients')
    .update({ status })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/clients/${id}`)
  return { success: true }
}

export async function deleteClient(id: string) {
  const supabase = await createSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Não autenticado' }
  }

  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
