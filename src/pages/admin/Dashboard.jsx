import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getStudents,
  getJointSecretaries,
} from "../../services/userService";
import { getEvents } from "../../services/eventService";

function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    jointSecretaries: 0,
    events: 0,
  });

  useEffect(() => {
    setStats({
      students: getStudents().length,
      jointSecretaries: getJointSecretaries().length,
      events: getEvents().length,
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome to the MYCA Admin Panel
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Students</h2>
          <p className="text-4xl font-bold mt-3 text-blue-600">
            {stats.students}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Joint Secretaries</h2>
          <p className="text-4xl font-bold mt-3 text-green-600">
            {stats.jointSecretaries}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">Events</h2>
          <p className="text-4xl font-bold mt-3 text-purple-600">
            {stats.events}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/admin/joint-secretaries"
            className="bg-blue-500 text-white rounded-lg p-4 text-center hover:bg-blue-600"
          >
            Manage Joint Secretaries
          </Link>

          <Link
            to="/admin/students"
            className="bg-green-500 text-white rounded-lg p-4 text-center hover:bg-green-600"
          >
            Manage Students
          </Link>

          <Link
            to="/admin/events"
            className="bg-purple-500 text-white rounded-lg p-4 text-center hover:bg-purple-600"
          >
            Manage Events
          </Link>

          <Link
            to="/admin/societies"
            className="bg-orange-500 text-white rounded-lg p-4 text-center hover:bg-orange-600"
          >
            Manage Societies
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;