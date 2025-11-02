import { useState } from 'react'

import type { PaginationMeta } from '../types/api'

export const usePagination = (meta?: PaginationMeta) => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)

  const nextPage = () => {
    if (meta?.hasNextPage) {
      setPage((p) => p + 1)
    }
  }

  const prevPage = () => {
    if (meta?.hasPreviousPage) {
      setPage((p) => p - 1)
    }
  }
  const setLimitPage = (limit: number) => {
    setLimit(limit)
    setPage(1)
  }

  return {
    page,
    limit,
    nextPage,
    prevPage,
    setPage,
    setLimitPage
  }
}
