import { useForm } from "react-hook-form";
import { useUserRegister } from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      role: "user",
    },
  });

  const { mutate: createUser, isLoading, isError } = useUserRegister();

  const onSubmit = (formData) => {
    console.log("📨 Register formData:", formData);
    createUser(formData, {
      onSuccess: () => {
        toast.success("Account created! Please sign in.");
        reset();
        navigate("/login");
      },
      onError: (err) => {
        console.error("❌ Registration error in form:", err);
        toast.error("Registration failed.");
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-card">
        <h2 className="form-title">Create Account</h2>

        <input
          type="text"
          placeholder="Email or Phone"
          className="form-input"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p className="form-error">Please provide a valid email or phone</p>
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

        <select
          {...register("role", { required: true })}
          className="form-input"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? "Creating..." : "Register"}
        </button>

        {isError && (
          <p className="form-error">Something went wrong. Try again.</p>
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
