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
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-80"
        />

        <span className="font-semibold">
          Total Members: {filteredMembers.length}
        </span>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Club</th>
          </tr>

        </thead>

        <tbody>

          {filteredMembers.length === 0 ? (

            <tr>
              <td
                colSpan="3"
                className="text-center py-10 text-gray-500"
              >
                No Members Found
              </td>
            </tr>

          ) : (

            filteredMembers.map((member) => (

              <tr
                key={member.id}
                className="border-b"
              >
                <td className="p-4">
                  {member.name}
                </td>

                <td>{member.email}</td>

                <td>{member.club}</td>
              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default MemberTable;