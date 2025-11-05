import Link from 'next/link'
import { signup } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Mini CRM
          </h1>
          <p className="text-gray-600">Comece a organizar seus clientes hoje!</p>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="space-y-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
            <CardDescription className="text-purple-50">
              Preencha os dados para começar a usar
            </CardDescription>
          </CardHeader>
          <form action={signup}>
            <CardContent className="space-y-4 pt-6">
              {searchParams.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm flex items-start gap-2">
                  <span className="text-red-500">⚠️</span>
                  <span>{searchParams.error}</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome"
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="h-11"
                />
                <p className="text-xs text-gray-500">Mínimo de 6 caracteres</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pb-6">
              <Button type="submit" className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold">
                Criar Conta
              </Button>
              <p className="text-sm text-center text-gray-600">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-purple-600 hover:text-purple-700 hover:underline font-semibold">
                  Fazer login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          100% gratuito • Sem cartão de crédito
        </p>
      </div>
    </div>
  )
}
