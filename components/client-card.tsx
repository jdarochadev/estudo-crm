'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteClientDialog } from '@/components/delete-client-dialog'
import { Phone, User, Briefcase, DollarSign, MoreVertical, Trash2, Eye } from 'lucide-react'
import { MessageSquare as WhatsAppIcon } from 'lucide-react'
import type { Client } from '@/app/actions/clients'
import { getWhatsAppLink } from '@/lib/utils/whatsapp'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-md bg-white relative overflow-hidden">
      {/* Barra colorida no topo baseada no status */}
      <div className={`h-1 ${
        client.status === 'novo' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
        client.status === 'negociando' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
        client.status === 'fechado' ? 'bg-gradient-to-r from-green-400 to-green-600' :
        'bg-gradient-to-r from-red-400 to-red-600'
      }`} />

      <CardContent className="pt-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-gray-900 truncate">{client.name}</h3>
              <p className="text-xs text-gray-500">
                Desde {format(new Date(client.created_at), 'dd/MM/yyyy', { locale: ptBR })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant={STATUS_COLORS[client.status]} className="shadow-sm">
              {STATUS_LABELS[client.status]}
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/clients/${client.id}`} className="cursor-pointer">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-2.5">
          {client.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              <Phone className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{client.phone}</span>
            </div>
          )}
          {client.service && (
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
              <Briefcase className="h-4 w-4 text-purple-500" />
              <span className="truncate">{client.service}</span>
            </div>
          )}
          {client.budget && (
            <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-bold text-green-700">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(client.budget)}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-0 pb-4">
        {client.phone && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition-colors"
          >
            <a
              href={getWhatsAppLink(client.phone)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-4 w-4 mr-2" />
              WhatsApp
            </a>
          </Button>
        )}
        <Button
          size="sm"
          asChild
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          <Link href={`/clients/${client.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalhes
          </Link>
        </Button>
      </CardFooter>

      <DeleteClientDialog
        clientId={client.id}
        clientName={client.name}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </Card>
  )
}
