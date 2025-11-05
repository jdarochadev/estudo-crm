'use client'

import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, User, Briefcase, DollarSign } from 'lucide-react'
import type { Client } from '@/app/actions/clients'
import { getWhatsAppLink } from '@/lib/utils/whatsapp'

const STATUS_COLORS: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  novo: 'default',
  negociando: 'secondary',
  fechado: 'outline',
  perdido: 'destructive',
}

const STATUS_LABELS: Record<string, string> = {
  novo: 'Novo',
  negociando: 'Negociando',
  fechado: 'Fechado',
  perdido: 'Perdido',
}

export function ClientCard({ client }: { client: Client }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-500" />
            <h3 className="font-semibold text-lg">{client.name}</h3>
          </div>
          <Badge variant={STATUS_COLORS[client.status]}>
            {STATUS_LABELS[client.status]}
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          {client.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{client.phone}</span>
            </div>
          )}
          {client.service && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>{client.service}</span>
            </div>
          )}
          {client.budget && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(client.budget)}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {client.phone && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1"
          >
            <a
              href={getWhatsAppLink(client.phone)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </Button>
        )}
        <Button
          variant="default"
          size="sm"
          asChild
          className="flex-1"
        >
          <Link href={`/clients/${client.id}`}>
            Ver Detalhes
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
