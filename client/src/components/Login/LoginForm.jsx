import React from "react";
import { useForm } from "react-hook-form";
import { useUserLogin } from "../../hooks/useSession";
import { Link } from "react-router";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutate: loginUser, isLoading, isError } = useUserLogin();

  const onSubmit = (data) => {
    console.log("📦 Trying to log in with:", data);
    loginUser(data, {
      onSuccess: () => reset(), // רק אם ההתחברות הצליחה
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-32 h-3/4 m-5 relative z-30 bg-black/50 p-8 rounded-lg shadow-lg flex flex-col gap-4 w-10/12 lg:w-1/4 max-w-md text-white"
    >
      <h2 className="text-2xl font-medium">Sign In</h2>

      <input
        className="w-full h-12 p-3 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        placeholder="Email or phone number"
        {...register("username", { required: true })}
      />
      {errors.username && (
        <span className="text-red-500 text-sm">
          Please enter a valid email or phone number
        </span>
      )}

      <input
        className="w-full h-12 p-3 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        placeholder="Password"
        type="password"
        {...register("password", {
          required: true,
          minLength: 4,
          maxLength: 60,
        })}
      />
      {errors.password && (
        <span className="text-red-500 text-sm">
          Your password must be between 4 and 60 characters.
        </span>
      )}

      <button
        type="submit"
        className="w-full h-12 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition"
        disabled={isLoading}
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>

      {isError && (
        <div className="text-red-500 text-sm">Login failed. Try again.</div>
      )}

      <div className="text-center font-light">Forget Password?</div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="w-4 h-4 bg-transparent border border-gray-400 rounded-sm appearance-none checked:text-white flex items-center justify-center before:content-['✔'] before:hidden checked:before:block before:text-white before:font-bold before:text-xs"
          />
          Remember me
        </label>
      </div>

      <div className="font-light">
        <span className="text-gray-300"> New to Netflix? </span>
        <Link to="/register" className="cursor-pointer font-semibold">
          Sign up now
        </Link>
      </div>

      <div className="text-gray-400 text-sm font-thin">
        This page is protected by Google reCAPTCHA to ensure you're not a robot{" "}
        <a className="text-blue-600" href="/">
          Learn more
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
