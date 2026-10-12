import { useEffect, useState } from "react";
import { clubs } from "../../data/clubs";

function SocietyTable() {
  const [societies, setSocieties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const societiesPerPage = 5;

  useEffect(() => {
    setSocieties(clubs);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredSocieties = societies.filter((society) =>
    society.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastSociety = currentPage * societiesPerPage;
  const indexOfFirstSociety = indexOfLastSociety - societiesPerPage;

  const currentSocieties = filteredSocieties.slice(
    indexOfFirstSociety,
    indexOfLastSociety
  );

  const totalPages = Math.ceil(
    filteredSocieties.length / societiesPerPage
  );

  const inputClass =
    "border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 w-full sm:w-80 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const pageButtonBase = "px-4 py-2 rounded transition";

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-xl shadow p-6 mt-8">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search society..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={inputClass}
        />

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
        >
          + Add Society
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              <th className="p-3 text-left">Society Name</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSocieties.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No Society Found
                </td>
              </tr>
            ) : (
              currentSocieties.map((society, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/70 transition"
                >
                  <td className="p-4 font-medium">
                    {society}
                  </td>

                  <td className="text-center">
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      Active
                    </span>
                  </td>

                  <td className="text-center whitespace-nowrap">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition"
                    >
                      Edit
                    </button>

                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${pageButtonBase} ${
            currentPage === 1
              ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`${pageButtonBase} ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-700"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === totalPages || totalPages === 0
          }
          className={`${pageButtonBase} ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default SocietyTable;
