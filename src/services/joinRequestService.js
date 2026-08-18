const JOIN_REQUESTS_KEY = "joinRequests";

export function getJoinRequests() {
  return JSON.parse(
    localStorage.getItem(JOIN_REQUESTS_KEY)
  ) || [];
}

function saveJoinRequests(requests) {
  localStorage.setItem(
    JOIN_REQUESTS_KEY,
    JSON.stringify(requests)
  );
}

export function addJoinRequest(request) {
  const requests = getJoinRequests();

  requests.push({
    id: Date.now().toString(),
    status: "Pending",
    createdAt: new Date().toISOString(),
    ...request,
  });

  saveJoinRequests(requests);
}

export function updateJoinRequest(updatedRequest) {
  const requests = getJoinRequests();

  saveJoinRequests(
    requests.map((request) =>
      request.id === updatedRequest.id
        ? updatedRequest
        : request
    )
  );
}

export function deleteJoinRequest(id) {
  const requests = getJoinRequests();

  saveJoinRequests(
    requests.filter(
      (request) => request.id !== id
    )
  );
} 