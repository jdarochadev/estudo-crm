import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getClients, type ClientStatus } from '@/app/actions/clients'
import { Header } from '@/components/header'
import { ClientCard } from '@/components/client-card'
import { ClientFilters } from '@/components/client-filters'
import { AddClientDialog } from '@/components/add-client-dialog'
import { SearchInput } from '@/components/search-input'
import { Card, CardContent } from '@/components/ui/card'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { search?: string; status?: ClientStatus }
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const clients = await getClients(searchParams.search, searchParams.status)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Meus Clientes</h2>
            <p className="text-gray-600 mt-1">
              {clients.length} {clients.length === 1 ? 'cliente' : 'clientes'}
            </p>
          </div>
          <AddClientDialog />
        </div>

        <div className="space-y-4 mb-6">
          <Suspense fallback={<div>Carregando...</div>}>
            <SearchInput />
          </Suspense>
          <ClientFilters />
        </div>

        {clients.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 text-lg">
                {searchParams.search || searchParams.status
                  ? 'Nenhum cliente encontrado com os filtros selecionados'
                  : 'Nenhum cliente cadastrado ainda'}
              </p>
              <p className="text-gray-400 mt-2">
                {!searchParams.search && !searchParams.status && 'Clique em "Adicionar Cliente" para começar'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
