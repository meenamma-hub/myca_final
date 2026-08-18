import { downloadCertificate } from "../../services/certificateService";

function CertificateCard({ certificate, user }) {
  if (!certificate) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
        No certificate available.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-slate-800">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white">
        {certificate.event}
      </h2>

      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Society: {certificate.society}
      </p>

      <p className="text-gray-600 dark:text-gray-400">
        Date: {certificate.issueDate}
      </p>

      <button
        onClick={() => downloadCertificate(certificate, user)}
        className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Download Certificate
      </button>
    </div>
  );
}

export default CertificateCard;
