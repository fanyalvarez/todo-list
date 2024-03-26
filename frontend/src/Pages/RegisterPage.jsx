import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/UserContext.jsx";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      registered_at: new Date(),
      updated_at: new Date(),
    },
  });
  const { signup } = useAuth();

  const onSubmit = handleSubmit(async (user) => {
    await signup(user);
  });
  return (
    <>
      <div className="flex h-full items-center justify-center ">
        <div className="p-10 rounded-md bg-zinc-800 w-[33rem] mt-10">
          <h1 className="text-2xl font-bold mb-4">Register </h1>

          <form onSubmit={onSubmit} className="grid grid-col-1 w-full gap-2">
            <input
              type="text"
              {...register("nickname", { required: true })}
              className=" bg-zinc-700 text-white text-lg px-4 py-2 rounded-md mt-2"
              placeholder="Nickname"
            />
            {errors.nickname && (
              <p className="text-red-500">Username is required</p>
            )}

            <input
              type="text"
              {...register("full_name", { required: true })}
              className=" bg-zinc-700 text-white text-lg px-4 py-2 rounded-md mt-2"
              placeholder="Fullname"
            />
            {errors.full_name && (
              <p className="text-red-500">Fullname is required</p>
            )}

            <input
              type="email"
              {...register("email", { required: true })}
              className=" bg-zinc-700 text-white text-lg px-4 py-2 rounded-md mt-2"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <input
              type="password"
              {...register("hashed_password", { required: true })}
              className=" bg-zinc-700 text-white text-lg px-4 py-2 rounded-md mt-2"
              placeholder="Password"
            />
            {errors.hashed_password && (
              <p className="text-red-500">Password is required</p>
            )}

            <button
              type="submit"
              className="bg-sky-700 px-4 py-2 rounded my-3 w-28">
              Send
            </button>
          </form>

          <p className="flex gap-x-2 justify-between my-2">
            Already have an account?
            <Link to="/login" className="text-sky-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
