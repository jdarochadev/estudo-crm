import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getClient } from '@/app/actions/clients'
import { getNotes } from '@/app/actions/notes'
import { Header } from '@/components/header'
import { ClientInfo } from '@/components/client-info'
import { ClientNotes } from '@/components/client-notes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, FileText } from 'lucide-react'

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para Dashboard
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Detalhes do Cliente</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ClientInfo client={client} />

            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" size="lg">
                  <Link href={`/clients/${client.id}/quote`}>
                    <FileText className="h-5 w-5 mr-2" />
                    Gerar Orçamento
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <ClientNotes clientId={client.id} initialNotes={notes} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
