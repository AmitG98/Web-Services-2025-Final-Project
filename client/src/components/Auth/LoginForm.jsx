import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { submitLogin } from "../../api/authApi"; // ✅ מייבאת את ה-API
import { useSessionContext } from "../../context/UserSessionProvider"; // ✅ כדי לעדכן context
import { toast } from "sonner"; // ✅ כדי להראות toast
import { Link } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useSessionContext(); // ✅ משמש כדי לעדכן context עם המשתמש
  const [serverError, setServerError] = useState(null); // חדש

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

      if (res?.user) {
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
      setServerError(message); // פה מציגים שגיאה מתחת לטופס
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-black/50 p-8 rounded-lg shadow-lg flex flex-col gap-4 max-w-[400px] w-[90%] z-30"
      >
      <h2 className="text-2xl font-medium text-white">Sign In</h2>

      <input
        className="form-input"
        placeholder="Email or phone number"
        {...register("identifier", { required: true })}
      />
      {errors.identifier && (
        <span className="form-error">Please enter a valid email or phone number</span>
      )}

      <input
        type="password"
        placeholder="Password"
        className="form-input"
        {...register("password", { required: true })}
      />
      {errors.password && (
        <span className="form-error">Password is required</span>
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
}

export default LoginForm;
