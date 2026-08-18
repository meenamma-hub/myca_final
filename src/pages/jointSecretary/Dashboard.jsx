import DashboardCards from "../../components/jointSecretary/DashboardCards";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">
        Welcome, Joint Secretary 👋
      </h1>

      <p className="text-gray-600 mb-8">
        Manage your society events, members, and announcements.
      </p>

      <DashboardCards />
    </div>
  );
};

export default Dashboard;