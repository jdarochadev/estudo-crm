import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getClient } from '@/app/actions/clients'
import { getQuote } from '@/app/actions/quotes'
import { Header } from '@/components/header'
import { BackButton } from '@/components/back-button'
import { QuotePDFViewer } from '@/components/quote-pdf-viewer'

export default async function QuotePDFPage({
  params,
}: {
  params: { id: string; quoteId: string }
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  let client
  let quote

  try {
    client = await getClient(params.id)
    quote = await getQuote(params.quoteId)
  } catch (error) {
    notFound()
  }

  // Busca informações do usuário
  const { data: userData } = await supabase
    .from('users')
    .select('name, email')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <BackButton href={`/clients/${client.id}`} label="Voltar ao Cliente" />

        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Orçamento</h2>
          <p className="text-gray-600 mt-1">Cliente: {client.name}</p>
        </div>

        <QuotePDFViewer
          client={client}
          quote={quote}
          userName={userData?.name || ''}
          userEmail={userData?.email || ''}
        />
      </main>
    </div>
  )
}
