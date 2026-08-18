import { useEffect, useState } from "react";
import { downloadCertificate, getStudentCertificates } from "../../services/certificateService";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  useEffect(() => {
    setCertificates(getStudentCertificates(currentUser?.id));
  }, [currentUser?.id]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Certificates
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Download a printable certificate for your completed activities.
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 text-center text-gray-500">
          No certificates are available yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 border border-gray-100 dark:border-slate-800"
            >
              <h2 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">
                {certificate.event}
              </h2>

              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Society:</span>{" "}
                {certificate.society}
              </p>

              <p className="mb-5 text-gray-600 dark:text-gray-400">
                <span className="font-medium">Issue Date:</span>{" "}
                {certificate.issueDate}
              </p>

              <button
                onClick={() => downloadCertificate(certificate, currentUser)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Download Certificate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
