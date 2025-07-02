import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type IncidentPaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export default function IncidentPagination({
  page,
  totalPages,
  setPage
}: IncidentPaginationProps) {
  return (
    <nav className="mt-6 flex items-center justify-between" aria-label="Pagination">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition text-sm"
      >
        <ChevronLeft className="mr-2" /> Précédent
      </button>
      <span className="text-sm text-gray-600">
        Page {page} sur {totalPages}
      </span>
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition text-sm"
      >
        Suivant <ChevronRight className="ml-2" />
      </button>
    </nav>
  );
}
