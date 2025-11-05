import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getClient } from '@/app/actions/clients'
import { getNotes } from '@/app/actions/notes'
import { getQuotes } from '@/app/actions/quotes'
import { Header } from '@/components/header'
import { BackButton } from '@/components/back-button'
import { ClientInfo } from '@/components/client-info'
import { ClientNotes } from '@/components/client-notes'
import { ClientQuotes } from '@/components/client-quotes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default async function ClientPage({
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

  const notes = await getNotes(params.id)
  const quotes = await getQuotes(params.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <BackButton href="/dashboard" label="Voltar para Dashboard" />

        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {client.name}
          </h2>
          <p className="text-gray-600 mt-2">Informações detalhadas e histórico</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Informações */}
          <div className="space-y-6">
            <ClientInfo client={client} />

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="text-blue-900">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" size="lg">
                  <Link href={`/clients/${client.id}/quote`}>
                    <FileText className="h-5 w-5 mr-2" />
                    Gerar Orçamento
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Coluna 2: Orçamentos */}
          <div>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-100">
                <CardTitle className="text-green-900 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Orçamentos
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ClientQuotes clientId={client.id} initialQuotes={quotes} />
              </CardContent>
            </Card>
          </div>

          {/* Coluna 3: Anotações */}
          <div>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                <CardTitle className="text-purple-900 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Anotações
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ClientNotes clientId={client.id} initialNotes={notes} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
