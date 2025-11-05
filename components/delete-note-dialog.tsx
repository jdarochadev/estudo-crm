'use client'

import { useState } from 'react'
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

interface DeleteNoteDialogProps {
  noteId: string
  notePreview: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (noteId: string) => Promise<void>
}

export function DeleteNoteDialog({
  noteId,
  notePreview,
  open,
  onOpenChange,
  onConfirm,
}: DeleteNoteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    await onConfirm(noteId)
    setIsDeleting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-xl">Excluir Anotação</DialogTitle>
          </div>
          <DialogDescription className="text-base pt-2">
            Tem certeza que deseja excluir esta anotação?
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
          <p className="text-sm text-gray-700 italic">
            "{notePreview}"
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800">
            <strong className="font-semibold">Atenção:</strong> Esta ação não pode ser desfeita.
          </p>
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
            {isDeleting ? 'Excluindo...' : 'Sim, excluir anotação'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
