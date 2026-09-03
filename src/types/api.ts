/** Envoltura estándar de respuestas del backend. */
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  statusCode: number
  message: string
  error?: string
}
