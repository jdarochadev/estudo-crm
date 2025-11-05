'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { createNote, deleteNote, type Note } from '@/app/actions/notes'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'

export function ClientNotes({ clientId, initialNotes }: { clientId: string; initialNotes: Note[] }) {
  const [notes] = useState(initialNotes)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    await createNote(clientId, formData)
    setIsSubmitting(false)

    // Limpa o textarea
    const form = document.getElementById('note-form') as HTMLFormElement
    form.reset()
  }

  async function handleDelete(noteId: string) {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
      await deleteNote(noteId, clientId)
    }
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
                  onClick={() => handleDelete(note.id)}
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
    </div>
  )
}
