'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createQuote } from '@/app/actions/quotes'
import type { Client } from '@/app/actions/clients'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function QuoteForm({ client }: { client: Client }) {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsGenerating(true)

    const result = await createQuote(client.id, formData)

    if (result.success && result.quoteId) {
      // Redireciona para a página de visualização do PDF
      router.push(`/clients/${client.id}/quote/${result.quoteId}/pdf`)
    }

    setIsGenerating(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados do Orçamento</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service">Serviço *</Label>
            <Input
              id="service"
              name="service"
              placeholder="Descreva o serviço a ser realizado"
              defaultValue={client.service || ''}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Valor *</Label>
            <Input
              id="value"
              name="value"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              defaultValue={client.budget || ''}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Prazo</Label>
            <Input
              id="deadline"
              name="deadline"
              placeholder="Ex: 7 dias, 2 semanas, etc"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">Condições de Pagamento</Label>
            <Textarea
              id="terms"
              name="terms"
              placeholder="Ex: 50% antecipado e 50% na entrega"
              rows={4}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
              disabled={isGenerating}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isGenerating}
            >
              {isGenerating ? 'Gerando...' : 'Gerar PDF'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
