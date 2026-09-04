import { describe, expect, it } from 'vitest'
import { isEmail, isNotEmpty, minLength } from './validation'

describe('isEmail', () => {
  it.each([
    'user@velora.com',
    'a.b-c+tag@sub.domain.io',
    '  spaced@velora.com  ',
  ])('acepta %j', (value) => {
    expect(isEmail(value)).toBe(true)
  })

  it.each(['', 'nope', 'a@b', 'a@b.', '@velora.com', 'a b@velora.com'])(
    'rechaza %j',
    (value) => {
      expect(isEmail(value)).toBe(false)
    },
  )
})

describe('isNotEmpty', () => {
  it('es true con contenido real', () => {
    expect(isNotEmpty('x')).toBe(true)
  })

  it('es false con cadena vacía o solo espacios', () => {
    expect(isNotEmpty('')).toBe(false)
    expect(isNotEmpty('   ')).toBe(false)
  })
})

describe('minLength', () => {
  it('cuenta tras hacer trim', () => {
    expect(minLength('  abc  ', 3)).toBe(true)
    expect(minLength('  ab  ', 3)).toBe(false)
  })

  it('es inclusivo en el límite', () => {
    expect(minLength('12345', 5)).toBe(true)
  })
})
