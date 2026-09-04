const BOM = '\uFEFF'

/** Dispara la descarga de un archivo CSV en el navegador (con BOM para Excel). */
export function downloadCsv(filename: string, content: string): void {
  const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
