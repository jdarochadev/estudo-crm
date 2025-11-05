import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BackButtonProps {
  href: string
  label?: string
}

export function BackButton({ href, label = 'Voltar' }: BackButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        size="lg"
        className="mb-6 shadow-md hover:shadow-lg transition-all hover:scale-105 bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold text-gray-700 group-hover:text-blue-700">{label}</span>
      </Button>
    </Link>
  )
}
