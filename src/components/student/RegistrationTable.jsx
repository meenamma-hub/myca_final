import { useState } from "react";
import SearchBar from "../common/SearchBar";
import Pagination from "../common/Pagination";

function RegistrationTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const registrations = [
    {
      id: 1,
      event: "Hackathon 2026",
      society: "Coding Club",
      date: "10 Aug 2026",
      status: "Registered",
    },
    {
      id: 2,
      event: "Web Development Workshop",
      society: "GDG",
      date: "15 Aug 2026",
      status: "Approved",
    },
  ];

  const filtered = registrations.filter(
    (item) =>
      item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.society.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow dark:shadow-black/30 border border-gray-100 dark:border-slate-700 p-6">
      <h2 className="text-2xl font-bold mb-5 text-gray-800 dark:text-white">
        My Registrations
      </h2>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search registrations..."
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-slate-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Event</th>
              <th className="p-3">Society</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 dark:border-slate-700 text-center text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800"
              >
                <td className="p-3">{item.event}</td>
                <td className="p-3">{item.society}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default RegistrationTable;
