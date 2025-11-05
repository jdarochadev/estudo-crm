'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Quote } from '@/app/actions/quotes'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Download, Eye } from 'lucide-react'

const STATUS_COLORS: Record<string, 'default' | 'secondary' | 'destructive'> = {
  enviado: 'default',
  aceito: 'secondary',
  rejeitado: 'destructive',
}

const STATUS_LABELS: Record<string, string> = {
  enviado: 'Enviado',
  aceito: 'Aceito',
  rejeitado: 'Rejeitado',
}

export function ClientQuotes({
  clientId,
  initialQuotes,
}: {
  clientId: string
  initialQuotes: Quote[]
}) {
  if (initialQuotes.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Nenhum orçamento criado ainda</p>
        <p className="text-gray-400 text-xs mt-1">
          Clique em "Gerar Orçamento" para começar
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {initialQuotes.map((quote) => (
        <Card key={quote.id} className="p-4 hover:shadow-md transition-shadow border-l-4 border-l-green-500">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-gray-900 mb-1">
                {quote.service}
              </h4>
              <p className="text-xs text-gray-500">
                {format(new Date(quote.created_at), "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
            <Badge variant={STATUS_COLORS[quote.status]} className="text-xs">
              {STATUS_LABELS[quote.status]}
            </Badge>
          </div>

          <div className="mb-3">
            <p className="text-lg font-bold text-green-700">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(quote.value)}
            </p>
            {quote.deadline && (
              <p className="text-xs text-gray-600 mt-1">
                Prazo: {quote.deadline}
              </p>
            )}
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
          >
            <Link href={`/clients/${clientId}/quote/${quote.id}/pdf`}>
              <Eye className="h-3.5 w-3.5 mr-2" />
              Ver PDF
            </Link>
          </Button>
        </Card>
      ))}
    </div>
  )
}
