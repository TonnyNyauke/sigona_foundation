import { PaginationProps } from "@/app/events/types";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <nav className="flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};