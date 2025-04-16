import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { submitRegister } from "../../api/authApi";

function RegisterForm() {
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
      role: "user",
    },
  });

  const isEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isPhone = (val) => /^\d{9,15}$/.test(val);

  const onSubmit = async (formData) => {
    setServerError(null);
    const identifier = formData.identifier.trim();
    const { password, role } = formData;

    const payload = { password, role };

    if (isEmail(identifier)) {
      payload.email = identifier;
    } else if (isPhone(identifier)) {
      payload.phone = identifier;
    } else {
      toast.error("Please enter a valid email or phone number");
      return;
    }

    if (!payload.email) delete payload.email;
    if (!payload.phone) delete payload.phone;

    Object.keys(payload).forEach((key) => {
      if (payload[key] == null) delete payload[key];
    });
    console.log("📦 Final payload:", payload);
    try {
      await submitRegister(payload);
      toast.success("Account created! Please sign in.");
      reset();
      navigate("/login");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Registration failed. Please try again.";
      console.error("Registration error:", message);
      setServerError(message); // מציגים שגיאה מתחת לטופס
      toast.error("Registration failed", { description: message });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-card">
        <h2 className="form-title">Create Account</h2>

        <input
          type="text"
          placeholder="Email or Phone"
          className="form-input"
          {...register("identifier", { required: "Email or phone is required" })}
        />
        {errors.identifier && (
          <p className="form-error">{errors.identifier.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="form-input"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "At least 8 characters",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
              message: "Must contain at least one letter and one number",
            },
          })}
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}

        <select
          {...register("role", { required: true })}
          className="form-input"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="form-button">
          Register
        </button>
        {serverError && (
          <p className="form-error text-center mt-2">{serverError}</p>
        )}

        <p className="recaptcha-text">
          This page is protected by reCAPTCHA.{" "}
          <a href="/" className="recaptcha-link">
            Learn more
          </a>
        </p>
      </form>

      <style>{`
        .form-card {
          position: relative;
          background: rgba(0, 0, 0, 0.5);
          padding: 2rem;
          border-radius: 0.5rem;
          color: white;
          max-width: 400px;
          width: 90%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 10;
        }
        .form-title {
          font-size: 1.5rem;
        }
        .form-input, .form-select {
          padding: 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid #555;
          background: transparent;
          color: white;
        }
        .form-error {
          color: #f87171;
          font-size: 0.875rem;
        }
        .form-button {
          background: #dc2626;
          color: white;
          font-weight: bold;
          border-radius: 0.375rem;
          padding: 0.75rem;
        }
        .form-button:hover {
          background: #b91c1c;
        }
        .recaptcha-text {
          font-size: 0.75rem;
          color: #aaa;
          margin-top: 3rem;
        }
        .recaptcha-link {
          color: #3b82f6;
        }
      `}</style>
    </>
  );
}

export default RegisterForm;