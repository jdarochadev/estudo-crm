'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { createNote, deleteNote, type Note } from '@/app/actions/notes'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import { DeleteNoteDialog } from '@/components/delete-note-dialog'

export function ClientNotes({ clientId, initialNotes }: { clientId: string; initialNotes: Note[] }) {
  const [notes, setNotes] = useState(initialNotes)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState<{ id: string; preview: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    const text = formData.get('text') as string

    const result = await createNote(clientId, formData)

    if (result.success && result.note) {
      // Adiciona a nova nota ao estado
      setNotes([...notes, result.note])
    }

    setIsSubmitting(false)

    // Limpa o textarea
    const form = document.getElementById('note-form') as HTMLFormElement
    form.reset()
  }

  async function handleDelete(noteId: string) {
    const result = await deleteNote(noteId, clientId)

    if (result.success) {
      // Remove a nota do estado
      setNotes(notes.filter(note => note.id !== noteId))
    }

    setNoteToDelete(null)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Histórico de Anotações</h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhuma anotação ainda</p>
        ) : (
          notes.map((note) => (
            <Card key={note.id} className="p-4">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <p className="text-sm">{note.text}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {format(new Date(note.created_at), "dd/MM/yyyy 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setNoteToDelete({
                    id: note.id,
                    preview: note.text.slice(0, 50) + (note.text.length > 50 ? '...' : '')
                  })}
                >
                  <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      <form id="note-form" action={handleSubmit} className="space-y-2">
        <Textarea
          name="text"
          placeholder="Adicionar nova anotação..."
          required
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Adicionando...' : 'Adicionar Nota'}
        </Button>
      </form>

      <DeleteNoteDialog
        noteId={noteToDelete?.id || ''}
        notePreview={noteToDelete?.preview || ''}
        open={!!noteToDelete}
        onOpenChange={(open) => !open && setNoteToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
