'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import type { ClientStatus } from '@/app/actions/clients'

const STATUS_OPTIONS: { value: ClientStatus | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'novo', label: 'Novos' },
  { value: 'negociando', label: 'Negociando' },
  { value: 'fechado', label: 'Fechados' },
  { value: 'perdido', label: 'Perdidos' },
]

export function ClientFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentStatus = searchParams.get('status') || 'todos'

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (status === 'todos') {
      params.delete('status')
    } else {
      params.set('status', status)
    }

    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {STATUS_OPTIONS.map((option) => (
        <Badge
          key={option.value}
          variant={currentStatus === option.value ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-primary/80 transition-colors"
          onClick={() => handleStatusChange(option.value)}
        >
          {option.label}
        </Badge>
      ))}
    </div>
  )
}
