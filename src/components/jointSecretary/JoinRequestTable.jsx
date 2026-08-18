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
        (request) =>
          request.club === currentUser.club
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
    <div className="bg-white rounded-xl shadow p-6">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3 text-left">
              Student
            </th>

            <th>Email</th>

            <th>Club</th>

            <th>Status</th>

            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {requests.length === 0 ? (

            <tr>
              <td
                colSpan="5"
                className="text-center py-8 text-gray-500"
              >
                No Join Requests
              </td>
            </tr>

          ) : (

            requests.map((request) => (

              <tr
                key={request.id}
                className="border-b"
              >

                <td className="p-4">
                  {request.name}
                </td>

                <td>{request.email}</td>

                <td>{request.club}</td>

                <td>{request.status}</td>

                <td>

                  {request.status === "Pending" && (
                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          updateStatus(
                            request,
                            "Approved"
                          )
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            request,
                            "Rejected"
                          )
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
  );
}

export default JoinRequestTable; 