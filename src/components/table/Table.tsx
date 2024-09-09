import { useEffect, useState } from "react";

interface Header {
  name: string;
  key: string;
}

type Props = {
  headers: Header[];
  items: any[];
  viewFunc: (item: any) => void;
};

const Table = ({ headers, items, viewFunc }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get the items for the current page
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (items) {
      setCurrentPage(1);
    }
  }, [items]);

  return (
    <div>
      {items.length === 0 ? (
        <div className="p-4 text-center text-blue-600">
          <p>No items available</p>
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-blue-900 dark:text-gray-400">
              <thead className="text-xs text-blue-950 uppercase bg-blue-100">
                <tr>
                  <th scope="col" className="px-6 py-3 capitalize">
                    #
                  </th>
                  {headers?.map((header: Header, index) => (
                    <th key={index} scope="col" className="px-6 py-3 capitalize">
                      {header.name}
                    </th>
                  ))}
                  <th scope="col" className="px-6 py-3 capitalize">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((item, itemIndex) => (
                  <tr
                    key={itemIndex}
                    className="bg-white border-b group hover:bg-slate-50 text-blue-900 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      {itemIndex + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    {headers?.map((cols: any, colIndex) =>
                      cols?.name !== "Status" ? (
                        <td key={colIndex} className="px-6 py-4">
                          {item[cols?.key]}
                        </td>
                      ) : (
                        <td key={colIndex} className="px-6 py-4">
                          {item[cols?.key] ? (
                            <span className="bg-green-100 text-green-800 p-1 text-xs rounded-full">
                              Active
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 p-1 text-xs rounded-full">
                              Deactive
                            </span>
                          )}
                        </td>
                      )
                    )}
                    <td className="px-6 py-4">
                      <h3
                        onClick={() => viewFunc(item)}
                        className="bg-blue-50 text-xs p-1 rounded-full text-blue-600 text-center group-hover:scale-110 group-hover:bg-blue-100"
                      >
                        View
                      </h3>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center py-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-blue-100 rounded ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-blue-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-blue-100 rounded ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
