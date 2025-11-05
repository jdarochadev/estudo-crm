'use client'

import { useState } from 'react'
import { deleteClient } from '@/app/actions/clients'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AlertTriangle } from 'lucide-react'

interface DeleteClientDialogProps {
  clientId: string
  clientName: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteClientDialog({
  clientId,
  clientName,
  open,
  onOpenChange,
}: DeleteClientDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    await deleteClient(clientId)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-xl">Excluir Cliente</DialogTitle>
          </div>
          <DialogDescription className="text-base pt-2">
            Tem certeza que deseja excluir o cliente{' '}
            <span className="font-semibold text-gray-900">{clientName}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
          <p className="text-sm text-yellow-800">
            <strong className="font-semibold">Atenção:</strong> Esta ação não pode ser desfeita.
            Todos os dados relacionados serão excluídos permanentemente:
          </p>
          <ul className="list-disc list-inside text-sm text-yellow-800 mt-2 space-y-1">
            <li>Informações do cliente</li>
            <li>Todas as anotações</li>
            <li>Todos os orçamentos</li>
          </ul>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? 'Excluindo...' : 'Sim, excluir cliente'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
