import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import { getStudentsByClub } from "../../services/userService";

function MemberTable() {
  const currentUser = getCurrentUser();

  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMembers(getStudentsByClub(currentUser.club));
  }, []);

  const filteredMembers = members.filter(
    (member) =>
      member.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 rounded-lg px-4 py-2 w-80"
        />

        <span className="font-semibold text-gray-800 dark:text-gray-200">
          Total Members: {filteredMembers.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-gray-800 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Club</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No Members Found
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4">{member.name}</td>
                  <td className="p-4">{member.email}</td>
                  <td className="p-4">{member.club}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemberTable;
