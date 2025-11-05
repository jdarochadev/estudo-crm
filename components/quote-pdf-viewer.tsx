'use client'

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Client } from '@/app/actions/clients'
import type { Quote } from '@/app/actions/quotes'
import { Card, CardContent } from '@/components/ui/card'
import { Download } from 'lucide-react'

// Estilos do PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#3b82f6',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    borderBottom: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontSize: 11,
    color: '#6b7280',
    width: 120,
  },
  value: {
    fontSize: 11,
    color: '#1f2937',
    flex: 1,
  },
  valuePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  terms: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.5,
    marginTop: 8,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    color: '#9ca3af',
    textAlign: 'center',
    borderTop: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
})

// Componente do documento PDF
function QuotePDF({
  client,
  quote,
  userName,
  userEmail,
}: {
  client: Client
  quote: Quote
  userName: string
  userEmail: string
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>ORÇAMENTO</Text>
          <Text style={styles.subtitle}>
            Gerado em {format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Prestador</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{userName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userEmail}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Cliente</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{client.name}</Text>
          </View>
          {client.phone && (
            <View style={styles.row}>
              <Text style={styles.label}>Telefone:</Text>
              <Text style={styles.value}>{client.phone}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Serviço</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Descrição:</Text>
            <Text style={styles.value}>{quote.service}</Text>
          </View>
          {quote.deadline && (
            <View style={styles.row}>
              <Text style={styles.label}>Prazo:</Text>
              <Text style={styles.value}>{quote.deadline}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Valor</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.valuePrice}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(quote.value)}
            </Text>
          </View>
        </View>

        {quote.terms && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Condições de Pagamento</Text>
            <Text style={styles.terms}>{quote.terms}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text>Orçamento válido por 7 dias a partir da data de emissão</Text>
          <Text>Este documento não possui valor fiscal</Text>
        </View>
      </Page>
    </Document>
  )
}

// Componente de visualização
export function QuotePDFViewer({
  client,
  quote,
  userName,
  userEmail,
}: {
  client: Client
  quote: Quote
  userName: string
  userEmail: string
}) {
  const fileName = `orcamento-${client.name.toLowerCase().replace(/\s+/g, '-')}-${format(
    new Date(),
    'ddMMyyyy'
  )}.pdf`

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">PDF do Orçamento</h3>
            <p className="text-sm text-gray-600">Clique no botão para baixar</p>
          </div>
          <PDFDownloadLink
            document={
              <QuotePDF
                client={client}
                quote={quote}
                userName={userName}
                userEmail={userEmail}
              />
            }
            fileName={fileName}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            {({ loading }) =>
              loading ? (
                'Preparando PDF...'
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </>
              )
            }
          </PDFDownloadLink>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Resumo do Orçamento</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Cliente:</span>
                <span className="font-medium">{client.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Serviço:</span>
                <span className="font-medium">{quote.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Valor:</span>
                <span className="font-bold text-green-600">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(quote.value)}
                </span>
              </div>
              {quote.deadline && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Prazo:</span>
                  <span className="font-medium">{quote.deadline}</span>
                </div>
              )}
            </div>
          </div>

          {quote.terms && (
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Condições</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{quote.terms}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
