import Papa from 'papaparse'
import { Download } from 'lucide-react'
import type { ChurnPoint, RevenueBundle, RevenueCoach } from '@/types/revenue'
import { Button } from '@components/common/Button'
import { useToast } from '@components/common/Toast'
import { downloadCsv } from '@lib/csv'

interface ExportButtonProps {
  bundle?: RevenueBundle
  coaches?: RevenueCoach[]
  churn?: ChurnPoint[]
}

export const ExportButton = ({ bundle, coaches, churn }: ExportButtonProps) => {
  const toast = useToast()
  const ready = Boolean(bundle && coaches && churn)

  const handleExport = () => {
    if (!bundle || !coaches || !churn) return

    const sections: string[] = [
      '# MRR',
      Papa.unparse([
        { metrica: 'MRR total', valor: bundle.summary.mrr },
        { metrica: 'Crecimiento %', valor: bundle.summary.growthPct },
        { metrica: 'Suscripciones activas', valor: bundle.summary.activeSubscriptions },
        { metrica: 'Churn rate %', valor: bundle.breakdown.churnRate },
        { metrica: 'Proyeccion 3m', valor: bundle.breakdown.projection3m },
      ]),
      '',
      '# Reparto por tier',
      Papa.unparse(
        bundle.shares.map((share) => ({
          tier: share.tier,
          cantidad: share.count,
          porcentaje: share.pct,
        })),
      ),
      '',
      '# Top coaches',
      Papa.unparse(
        coaches.map((coach) => ({
          rank: coach.rank,
          nombre: coach.name,
          mrr: coach.mrr,
          atletas: coach.athletes,
          rating: coach.rating,
        })),
      ),
      '',
      '# Churn (30 dias)',
      Papa.unparse(churn.map((point) => ({ dia: point.day, churn_pct: point.rate }))),
    ]

    const date = new Date().toISOString().slice(0, 10)
    downloadCsv(`revenue_${date}.csv`, sections.join('\n'))
    toast.success('CSV de revenue exportado.')
  }

  return (
    <Button
      onClick={handleExport}
      disabled={!ready}
      leftIcon={<Download className="size-4" />}
    >
      Exportar CSV
    </Button>
  )
}
