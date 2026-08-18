export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition">
      <h3 className="text-sm text-gray-500 mb-2">
        {title}
      </h3>

      <p className="text-3xl font-bold text-blue-600">
        {value}
      </p>
    </div>
  );
}