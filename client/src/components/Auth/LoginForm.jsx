import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { submitLogin } from "../../api/authApi";
import { useUserAuth } from "../../context/useUserAuth";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useUserAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const isEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isPhone = (val) => /^\d{9,15}$/.test(val);

  const onSubmit = async (formData) => {
    const identifier = formData.identifier.trim();
    const { password } = formData;

    const payload = { password };

    if (isEmail(identifier)) {
      payload.email = identifier;
    } else if (isPhone(identifier)) {
      payload.phone = identifier;
    } else {
      toast.error("Please enter a valid email or phone number");
      return;
    }

    try {
      const data = await submitLogin(payload);

      if (data?.user) {
        login(data.user); // שמירה ב־sessionStorage
        toast.success("Welcome back!");

        reset();

        if (data.user.role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/profiles");
        }
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login error:", err.message);
      toast.error(err.message || "Login failed");
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

      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          {...register("rememberMe")}
          className="form-checkbox"
        />
        Remember me
      </label>

      <button type="submit" className="form-button">
        Sign In
      </button>

      <div className="text-white text-sm text-center font-light">
        New to Netflix?{" "}
        <a href="/register" className="text-blue-400 font-semibold">Sign up now</a>
      </div>
    </form>
  );
}

export default LoginForm;
