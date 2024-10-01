import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(`http://localhost:3000/api/users/${id}/profile`);
      const { username, email, gender, address, pincode, city, state } = response.data;
      setValue('username', username);
      setValue('email', email);
      setValue('gender', gender);
      setValue('address', address);
      setValue('pincode', pincode);
      setValue('city', city);
      setValue('state', state);
    };

    if (id) fetchProfile();
  }, [id, setValue]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this profile?')) {
      await axios.delete(`http://localhost:3000/api/users/${id}/profile`);
      router.push('/users');
    }
  };

  const onSubmit = async (data: any) => {
    await axios.patch(`http://localhost:3000/api/users/${id}/profile`, data);
    router.push(`/users/profile/${id}`);
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div>
          <label>Username:</label>
          <input type="text" {...register('username')} className="border rounded p-1" required readOnly />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" {...register('email')} className="border rounded p-1" required />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" {...register('gender')} className="border rounded p-1" required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" {...register('address')} className="border rounded p-1" required />
        </div>
        <div>
          <label>Pincode:</label>
          <input type="text" {...register('pincode')} className="border rounded p-1" required />
        </div>
        <div>
          <label>City:</label>
          <input type="text" {...register('city')} className="border rounded p-1" required />
        </div>
        <div>
          <label>State:</label>
          <input type="text" {...register('state')} className="border rounded p-1" required />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Update Profile</button>
      </form>
      <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded">Delete Profile</button>
    </div>
  );
};

export default ProfilePage;
