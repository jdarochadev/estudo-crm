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
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
        <CardTitle className="text-slate-900">Informações do Cliente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-6">
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
          <div className="p-2 bg-blue-500 rounded-lg">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-blue-700 font-medium">Nome</p>
            <p className="font-bold text-gray-900">{client.name}</p>
          </div>
        </div>

        {client.phone && (
          <div className="flex items-center justify-between gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-green-500 rounded-lg">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium">Telefone</p>
                <p className="font-bold text-gray-900">{client.phone}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors"
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
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-purple-700 font-medium">Serviço</p>
              <p className="font-bold text-gray-900">{client.service}</p>
            </div>
          </div>
        )}

        {client.budget && (
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-emerald-700 font-medium">Orçamento Previsto</p>
              <p className="font-bold text-emerald-700">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(client.budget)}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
          <div className="p-2 bg-gray-500 rounded-lg">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-700 font-medium">Cadastrado em</p>
            <p className="font-bold text-gray-900">
              {format(new Date(client.created_at), "dd/MM/yyyy 'às' HH:mm", {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm font-semibold text-gray-700 mb-2">Status do Cliente</p>
          <Select
            value={status}
            onValueChange={(value) => handleStatusChange(value as ClientStatus)}
          >
            <SelectTrigger className="bg-white">
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
