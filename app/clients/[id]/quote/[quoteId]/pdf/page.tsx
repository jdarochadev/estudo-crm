import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getClient } from '@/app/actions/clients'
import { getQuote } from '@/app/actions/quotes'
import { Header } from '@/components/header'
import { QuotePDFViewer } from '@/components/quote-pdf-viewer'
import { ArrowLeft } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href={`/clients/${client.id}`}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para Cliente
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Orçamento</h2>
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
