import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { updateUser } from '../../../../store/userSlice';

const EditUserPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      setValue('username', response.data.username);
      setValue('phone', response.data.phone);
    };

    if (id) fetchUser();
  }, [id, setValue]);

  const onSubmit = async (data: any) => {
    const response = await axios.patch(`http://localhost:3000/api/users/${id}`, data);
    dispatch(updateUser(response.data));
    router.push('/users');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
      <h2 className="text-2xl font-bold mb-4">Edit User</h2>
      <div>
        <label>Username:</label>
        <input type="text" {...register('username')} className="border rounded p-1" required />
      </div>
      <div className="mt-2">
        <label>Phone:</label>
        <input type="text" {...register('phone')} className="border rounded p-1" required />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Update</button>
    </form>
  );
};

export default EditUserPage;
