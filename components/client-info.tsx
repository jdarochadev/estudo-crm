'use client'

import { useState } from 'react'
import { updateClientStatus, type Client, type ClientStatus } from '@/app/actions/clients'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { User, Phone, Briefcase, DollarSign, Calendar } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/utils/whatsapp'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const STATUS_LABELS: Record<ClientStatus, string> = {
  novo: 'Novo',
  negociando: 'Negociando',
  fechado: 'Fechado',
  perdido: 'Perdido',
}

export function ClientInfo({ client }: { client: Client }) {
  const [status, setStatus] = useState<ClientStatus>(client.status)

  async function handleStatusChange(newStatus: ClientStatus) {
    setStatus(newStatus)
    await updateClientStatus(client.id, newStatus)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Nome</p>
            <p className="font-semibold">{client.name}</p>
          </div>
        </div>

        {client.phone && (
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Telefone</p>
              <p className="font-semibold">{client.phone}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <a
                href={getWhatsAppLink(client.phone)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </div>
        )}

        {client.service && (
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Serviço</p>
              <p className="font-semibold">{client.service}</p>
            </div>
          </div>
        )}

        {client.budget && (
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Orçamento Previsto</p>
              <p className="font-semibold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(client.budget)}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Criado em</p>
            <p className="font-semibold">
              {format(new Date(client.created_at), "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Status</p>
          <Select
            value={status}
            onValueChange={(value) => handleStatusChange(value as ClientStatus)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
