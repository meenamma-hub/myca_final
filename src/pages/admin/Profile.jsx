import AdminProfileCard from "../../components/admin/AdminProfileCard";

function Profile() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          My Profile
        </h1>

        <p className="text-gray-500 mt-1">
          View and manage your account.
        </p>
      </div>

      <AdminProfileCard />

    </div>
  );
}

export default Profile;