import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { submitLogin } from "../../api/authApi"; 
import { useSessionContext } from "../../context/UserSessionProvider";
import { toast } from "sonner"; 
import { Link } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useSessionContext();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const res = await submitLogin(data);
      console.log("🔐 Login response:", res);

      if (res?.user) {
        sessionStorage.setItem("user", JSON.stringify({ accessToken: res.accessToken }));
        login(res.user);
        toast.success(`Welcome, ${res.user.username || res.user.email}`);
        navigate(res.user.role === "admin" ? "/admin-dashboard" : "/profiles");
        reset();
      }
    } catch (err) {
      console.error("Login error:", err);
      const message =
        err?.response?.data?.message || "Something went wrong. Try again.";
      toast.error("Login failed", { description: message });
      setServerError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-black/50 p-8 rounded-lg shadow-lg flex flex-col gap-4 max-w-[400px] w-[90%] z-30"
      >
      <h2 className="text-2xl font-medium text-white">Sign In</h2>

      <input
        className="w-full h-12 p-3 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        placeholder="Email or phone number"
        {...register("identifier", { required: true })}
      />
      {errors.identifier && (
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
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
      {serverError && (
        <div className="text-red-500 text-sm text-center mt-2">
          {serverError}
        </div>
      )}
      <div className="text-center font-light text-white">Forget Password?</div>
      <div>
        <label className="flex items-center gap-2 text-white">
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
        <Link to="/register" className="cursor-pointer font-semibold text-white">
          Sign up now.
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