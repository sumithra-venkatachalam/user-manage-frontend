import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../store/userSlice';
import Link from 'next/link';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id)); // You might want to call an API to delete from backend here
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <Link href="/users/create" className="bg-green-500 text-white py-2 px-4 rounded mb-4">
        Create User
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300">Username</th>
              <th className="border border-gray-300">Phone</th>
              <th className="border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td className="border border-gray-300">{user.username}</td>
                <td className="border border-gray-300">{user.phone}</td>
                <td className="border border-gray-300">
                  <Link href={`/users/edit/${user.id}`} className="text-blue-500">Edit</Link>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 ml-4">Delete</button>
                  <Link href={`/users/profile/${user.id}`} className="text-green-500 ml-4">View Profile</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersPage;
