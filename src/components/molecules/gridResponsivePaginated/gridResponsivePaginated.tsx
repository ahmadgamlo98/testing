import { useUsers } from "../../../context/UsersPaginatedContext";

const GridResponsivePaginated = () => {
  const { usersPaginatedContext } = useUsers();

  if (!usersPaginatedContext) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {usersPaginatedContext.data.map(user => (
        <div key={user.id}>{user.first_name}</div>
      ))}
    </div>
  );
};

export default GridResponsivePaginated;
