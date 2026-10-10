import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import {
  getJoinRequests,
  updateJoinRequest,
} from "../../services/joinRequestService";

function JoinRequestTable() {
  const currentUser = getCurrentUser();

  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    const allRequests = getJoinRequests();

    setRequests(
      allRequests.filter(
        (request) => request.club === currentUser.club
      )
    );
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateStatus = (request, status) => {
    updateJoinRequest({
      ...request,
      status,
    });

    loadRequests();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <div className="overflow-x-auto">
        <table className="w-full text-gray-800 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Club</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  No Join Requests
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4">{request.name}</td>
                  <td className="p-4">{request.email}</td>
                  <td className="p-4">{request.club}</td>
                  <td className="p-4">{request.status}</td>

                  <td className="p-4">
                    {request.status === "Pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            updateStatus(request, "Approved")
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(request, "Rejected")
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JoinRequestTable;
