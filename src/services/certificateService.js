const CERTIFICATE_KEY = "certificates";

function getCurrentStudentId() {
  try {
    return JSON.parse(localStorage.getItem("currentUser"))?.id || null;
  } catch {
    return null;
  }
}

export function getCertificates() {
  return JSON.parse(localStorage.getItem(CERTIFICATE_KEY) || "[]");
}

export function getStudentCertificates(studentId = getCurrentStudentId()) {
  return getCertificates().filter(
    (certificate) =>
      !certificate.studentId || certificate.studentId === studentId
  );
}

export function addCertificate(certificate) {
  const certificates = getCertificates();
  certificates.push(certificate);
  localStorage.setItem(CERTIFICATE_KEY, JSON.stringify(certificates));
}

export function removeCertificate(id) {
  localStorage.setItem(
    CERTIFICATE_KEY,
    JSON.stringify(
      getCertificates().filter((certificate) => certificate.id !== id)
    )
  );
}

export function downloadCertificate(certificate, user = {}) {
  const safe = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[char]));

  const studentName = user.name || "Student";
  const issueDate = certificate.issueDate || new Date().toLocaleDateString();

  const html = `<!doctype html>
<html>
<head>
<meta charset="UTF-8" />
<title>Certificate - ${safe(certificate.event)}</title>
<style>
body{margin:0;background:#eef2ff;font-family:Georgia,serif}
.certificate{width:900px;max-width:90%;margin:50px auto;padding:70px 60px;background:white;border:12px double #1d4ed8;text-align:center;box-sizing:border-box}
h1{font-size:48px;color:#1e3a8a;margin:0 0 10px}
h2{font-size:34px;margin:25px 0;color:#111827}
.name{font-size:32px;font-weight:bold;color:#1d4ed8;border-bottom:2px solid #cbd5e1;display:inline-block;padding:0 30px 8px}
p{font-size:19px;color:#475569;line-height:1.7}
.footer{display:flex;justify-content:space-between;margin-top:60px;font-size:15px;color:#475569}
@media print{body{background:white}.certificate{max-width:none;margin:0;border-width:10px}}
</style>
</head>
<body>
<div class="certificate">
<p>MYCA • EVENTS OF YMCA</p>
<h1>CERTIFICATE OF PARTICIPATION</h1>
<p>This certificate is proudly presented to</p>
<div class="name">${safe(studentName)}</div>
<p>for successfully participating in</p>
<h2>${safe(certificate.event)}</h2>
<p>Organised by <strong>${safe(certificate.society || "MYCA")}</strong></p>
<div class="footer"><span>Issue Date: ${safe(issueDate)}</span><span>MYCA Event Management System</span></div>
</div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${(certificate.event || "certificate")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()}-certificate.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
