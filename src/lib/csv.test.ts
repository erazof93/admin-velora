import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { downloadCsv } from './csv'

const BOM = String.fromCharCode(0xfeff)

describe('downloadCsv', () => {
  let clickSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.stubGlobal('URL', {
      ...URL,
      createObjectURL: vi.fn(() => 'blob:mock-url'),
      revokeObjectURL: vi.fn(),
    })
    clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    clickSpy.mockRestore()
  })

  it('genera un Blob CSV con BOM y dispara la descarga', () => {
    const content = 'name,mrr\nAna,199'

    downloadCsv('revenue.csv', content)

    const createObjectURL = URL.createObjectURL as unknown as ReturnType<
      typeof vi.fn
    >
    expect(createObjectURL).toHaveBeenCalledOnce()
    const blob = createObjectURL.mock.calls[0][0] as Blob
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toContain('text/csv')
    // jsdom no implementa Blob.text(); comprobamos el tamaño en bytes:
    // el BOM (U+FEFF) ocupa 3 bytes en UTF-8 + el contenido ASCII.
    expect(blob.size).toBe(new TextEncoder().encode(BOM + content).length)

    expect(clickSpy).toHaveBeenCalledOnce()
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
  })

  it('no deja el <a> temporal en el DOM', () => {
    downloadCsv('x.csv', 'a,b')
    expect(document.querySelectorAll('a[download]')).toHaveLength(0)
  })
})
