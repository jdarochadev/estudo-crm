/**
 * Gera um link do WhatsApp inteligente
 * Detecta o dispositivo e usa a melhor opção
 */
export function getWhatsAppLink(phone: string, message?: string): string {
  // Remove caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '')

  // Adiciona código do país se não tiver (assume Brasil)
  const fullPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`

  // Codifica a mensagem se fornecida
  const text = message ? `?text=${encodeURIComponent(message)}` : ''

  // usa wa.me que funciona em todos os dispositivos
  return `https://wa.me/${fullPhone}${text}`
}

/**
 * Formata um telefone brasileiro
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')

  // (00) 00000-0000
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  // (00) 0000-0000
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return phone
}
