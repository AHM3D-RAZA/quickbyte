import { useAuth } from "/src/context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Profile</h1>

      <p className="mt-5">
        Welcome {user?.username}! This is your profile page. You can view and edit your personal information here.
      </p>
    </div>
  );
};

export default Profile;