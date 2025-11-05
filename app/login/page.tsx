import Link from 'next/link'
import { login } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, ArrowLeft, MessageCircle } from 'lucide-react'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="min-h-screen flex">
      {/* Lado Esquerdo - Informações */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 p-12 flex-col justify-center text-white">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Sua organização<br />melhor que nunca.
          </h1>

          <p className="text-xl text-blue-100 mb-10">
            Sistema completo de gestão de clientes para autônomos que trabalham pelo WhatsApp.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-1">
                <Check className="h-5 w-5" />
              </div>
              <span className="text-lg">Gestão inteligente de clientes</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-1">
                <Check className="h-5 w-5" />
              </div>
              <span className="text-lg">Orçamentos profissionais em PDF</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-1">
                <Check className="h-5 w-5" />
              </div>
              <span className="text-lg">Histórico completo de negociações</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-1">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="text-lg">Integração direta com WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mini CRM
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Entrar na sua conta
            </h2>
            <p className="text-gray-600">
              Acesse sua conta para continuar
            </p>
          </div>

          {/* Formulário */}
          <form action={login} className="space-y-6">
            {searchParams.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
                {searchParams.error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="h-12 bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Senha
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-12 bg-white"
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base"
            >
              Entrar
            </Button>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Não possui uma conta?{' '}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Cadastre-se gratuitamente
                </Link>
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
