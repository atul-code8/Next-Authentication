export default function UserProfile({ params }: any) {
  return (
    <div>
      <h1>User Profile</h1>
      <p>
        Profile page: <span className="text-[#dc143c]">{params.id}</span>
      </p>
    </div>
  );
}
