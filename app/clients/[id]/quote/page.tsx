import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getClient } from '@/app/actions/clients'
import { Header } from '@/components/header'
import { QuoteForm } from '@/components/quote-form'
import { ArrowLeft } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link
            href={`/clients/${client.id}`}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Criar Orçamento</h2>
          <p className="text-gray-600 mt-1">Para: {client.name}</p>
        </div>

        <QuoteForm client={client} />
      </main>
    </div>
  )
}
