import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getClient } from '@/app/actions/clients'
import { Header } from '@/components/header'
import { BackButton } from '@/components/back-button'
import { QuoteForm } from '@/components/quote-form'

export default async function QuotePage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  let client
  try {
    client = await getClient(params.id)
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <BackButton href={`/clients/${client.id}`} label="Voltar ao Cliente" />

        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Criar Orçamento</h2>
          <p className="text-gray-600 mt-1">Para: {client.name}</p>
        </div>

        <QuoteForm client={client} />
      </main>
    </div>
  )
}
