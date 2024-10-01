import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../store/userSlice';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreateUserPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const response = await axios.post('http://localhost:3000/api/users', data);
    dispatch(addUser(response.data));
    router.push('/users');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <div>
        <label>Username:</label>
        <input type="text" {...register('username')} className="border rounded p-1" required />
      </div>
      <div className="mt-2">
        <label>Phone:</label>
        <input type="text" {...register('phone')} className="border rounded p-1" required />
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default CreateUserPage;
