import DashboardCards from "../../components/jointSecretary/DashboardCards";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
        Welcome, Joint Secretary 👋
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Manage your society events, members, and announcements.
      </p>

      <DashboardCards />
    </div>
  );
};

export default Dashboard;
