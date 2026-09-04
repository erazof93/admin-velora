import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('<Button />', () => {
  it('renderiza el texto y por defecto es type="button"', () => {
    render(<Button>Guardar</Button>)
    const btn = screen.getByRole('button', { name: 'Guardar' })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('type', 'button')
  })

  it('propaga onClick al hacer click', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Click' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('no dispara onClick cuando está disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        No
      </Button>,
    )

    const btn = screen.getByRole('button', { name: 'No' })
    expect(btn).toBeDisabled()
    await userEvent.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('en loading queda deshabilitado y marca aria-busy', () => {
    render(<Button loading>Enviando</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
  })

  it('aplica las clases de la variante y de fullWidth', () => {
    render(
      <Button variant="danger" fullWidth>
        Eliminar
      </Button>,
    )
    const btn = screen.getByRole('button', { name: 'Eliminar' })
    expect(btn.className).toContain('bg-velora-danger')
    expect(btn.className).toContain('w-full')
  })

  it('respeta type="submit" cuando se pasa explícitamente', () => {
    render(<Button type="submit">Ok</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})
