interface PlaceholderProps {
  title: string
}

/** Página genérica para rutas cuyo módulo llega en una fase posterior. */
export default function Placeholder({ title }: PlaceholderProps) {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold text-velora-text">{title}</h1>
      <p className="text-velora-muted">Módulo en construcción — llega en una fase próxima.</p>
    </div>
  )
}
