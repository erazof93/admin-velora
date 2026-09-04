import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { DropdownItem, DropdownProps } from '@/types/components'
import { cn } from '@lib/utils/helpers'

const isSelectable = (item: DropdownItem) => !item.divider && !item.disabled

export const Dropdown = ({ trigger, items, align = 'end', className }: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const close = useCallback(() => {
    setOpen(false)
    setActive(-1)
  }, [])

  useEffect(() => {
    if (!open) return

    const onPointer = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) close()
    }
    document.addEventListener('mousedown', onPointer)
    return () => document.removeEventListener('mousedown', onPointer)
  }, [open, close])

  useEffect(() => {
    if (open && active >= 0) itemRefs.current[active]?.focus()
  }, [open, active])

  const step = (dir: 1 | -1) => {
    const count = items.length
    if (count === 0) return
    let next = active
    for (let i = 0; i < count; i += 1) {
      next = (next + dir + count) % count
      if (isSelectable(items[next])) {
        setActive(next)
        return
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        close()
        break
      case 'ArrowDown':
        event.preventDefault()
        if (!open) setOpen(true)
        else step(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        step(-1)
        break
      default:
        break
    }
  }

  const select = (item: DropdownItem) => {
    if (!isSelectable(item)) return
    item.onClick?.()
    close()
  }

  return (
    <div ref={ref} className={cn('relative', className)} onKeyDown={handleKeyDown}>
      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center"
      >
        {trigger}
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute z-40 mt-2 min-w-[12rem] overflow-hidden rounded-lg border border-velora-border bg-velora-surface py-1 shadow-lg',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item, index) => {
            if (item.divider) {
              // oxlint-disable-next-line no-array-index-key -- separadores sin identidad propia
              return <div key={`divider-${index}`} className="my-1 h-px bg-velora-border" />
            }
            return (
              <button
                key={item.label}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => select(item)}
                onMouseEnter={() => setActive(index)}
                className={cn(
                  'flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors disabled:opacity-50',
                  item.danger ? 'text-velora-danger' : 'text-velora-text',
                  'hover:bg-velora-surface-2',
                )}
              >
                {item.icon}
                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
