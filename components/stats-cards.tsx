import { Card, CardContent } from '@/components/ui/card'
import { Users, TrendingUp, CheckCircle, XCircle } from 'lucide-react'
import type { Client } from '@/app/actions/clients'

export function StatsCards({ clients }: { clients: Client[] }) {
  const stats = {
    total: clients.length,
    novos: clients.filter(c => c.status === 'novo').length,
    negociando: clients.filter(c => c.status === 'negociando').length,
    fechados: clients.filter(c => c.status === 'fechado').length,
    perdidos: clients.filter(c => c.status === 'perdido').length,
  }

  const totalValue = clients
    .filter(c => c.status === 'fechado' && c.budget)
    .reduce((sum, c) => sum + (c.budget || 0), 0)

  const statCards = [
    {
      title: 'Total de Clientes',
      value: stats.total,
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Em Negociação',
      value: stats.negociando,
      icon: TrendingUp,
      gradient: 'from-yellow-500 to-yellow-600',
      bgGradient: 'from-yellow-50 to-yellow-100',
    },
    {
      title: 'Fechados',
      value: stats.fechados,
      icon: CheckCircle,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
    },
    {
      title: 'Valor Fechado',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
      }).format(totalValue),
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      isValue: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.title}
            className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${stat.bgGradient}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-br ${stat.gradient}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
