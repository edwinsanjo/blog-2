import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl?: string
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl = '',
}: PaginationProps) {
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8">
      {hasPrevious ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="glass-hover p-2 rounded-lg inline-flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Previous</span>
        </Link>
      ) : (
        <div className="p-2 rounded-lg opacity-50 cursor-not-allowed inline-flex items-center gap-2">
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Previous</span>
        </div>
      )}

      {/* Page indicators */}
      <div className="flex items-center gap-1 mx-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(
            Math.max(0, currentPage - 2),
            Math.min(totalPages, currentPage + 1)
          )
          .map((page) => (
            <Link
              key={page}
              href={`${baseUrl}?page=${page}`}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${
                page === currentPage
                  ? 'bg-accent text-accent-foreground'
                  : 'glass-hover'
              }`}
            >
              {page}
            </Link>
          ))}
      </div>

      {hasNext ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="glass-hover p-2 rounded-lg inline-flex items-center gap-2"
        >
          <span className="hidden sm:inline text-sm font-medium">Next</span>
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <div className="p-2 rounded-lg opacity-50 cursor-not-allowed inline-flex items-center gap-2">
          <span className="hidden sm:inline text-sm font-medium">Next</span>
          <ChevronRight className="w-5 h-5" />
        </div>
      )}
    </div>
  )
}
