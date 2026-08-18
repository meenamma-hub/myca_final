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

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Search society..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-80"
        />

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Society
        </button>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3 text-left">Society Name</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredSocieties.length === 0 ? (

            <tr>
              <td
                colSpan="3"
                className="text-center py-10 text-gray-500"
              >
                No Society Found
              </td>
            </tr>

          ) : (

            currentSocieties.map((society, index) => (

              <tr
                key={index}
                className="border-b"
              >
                <td className="p-4 font-medium">
                  {society}
                </td>

                <td className="text-center">
                  <span className="text-green-600 font-semibold">
                    Active
                  </span>
                </td>

                <td className="text-center">

                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

      <div className="flex justify-center items-center gap-2 mt-6">

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
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
          className={`px-4 py-2 rounded ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-300 cursor-not-allowed"
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