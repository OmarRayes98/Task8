import prevIcon from "@/assets/images/Prev.png";
import nextIcon from "@/assets/images/Next.png";

interface PaginationProps {
    totalPages: number; // Total number of pages
    currentPage: number; // Current active page
    onPageChange: (page: number) => void; // Function to handle page changes
  }

const Pagination = ({ totalPages, currentPage, onPageChange }:PaginationProps) => {
    const getPaginationItems = (): (number | string)[] => {
        const items: (number | string)[] = [];

    if (totalPages <= 5) {
      // If total pages are <= 5, show all pages
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(1); // Always show the first page

      if (currentPage > 3) {
        // Add ellipsis before the current range if needed
        items.push("...");
      }

      // Add two pages around the current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(i);
      }

    //   if (currentPage < totalPages - 2) {
    //     // Add ellipsis after the current range if needed
    //     items.push("...");
    //   }

      items.push(totalPages); // Always show the last page
    }

    return items;
  };

  const paginationItems = getPaginationItems();

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {/* Previous Button */}
      <button
        className={`h-[60px] w-[60px] text-sm rounded-full text-center border ${
          currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={prevIcon} alt="prev icon" className="mx-auto" />
        </button>

      {/* Pagination Items */}
      {paginationItems.map((item, index) => (
        <button
          key={index}
          className={`h-[60px] w-[60px] text-sm rounded-full text-center border ${
            item === currentPage
              ? "bg-primary text-white"
              : item === "..."
              ? "cursor-default"
              : "hover:bg-gray-100"
          }`}
          onClick={() => item !== "..." && onPageChange(item as number)}
          disabled={item === "..."}
        >
          {item}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`h-[60px] w-[60px] text-sm rounded-full text-center border ${
          currentPage === totalPages
            ? "bg-gray-200 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={nextIcon} alt="next icon" className="mx-auto"/>
      </button>
    </div>
  );
};

export default Pagination;
