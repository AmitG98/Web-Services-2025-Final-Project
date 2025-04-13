import { useForm } from "react-hook-form";
import { useUserLogin } from "../../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutate: loginUser, isLoading } = useUserLogin();

  const onSubmit = (data) => {
    loginUser({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2 className="form-title">Sign In</h2>

      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
        className="form-input"
      />
      {errors.email && <p className="form-error">{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 4, message: "Minimum 4 characters" },
          maxLength: { value: 60, message: "Maximum 60 characters" },
        })}
        className="form-input"
      />
      {errors.password && <p className="form-error">{errors.password.message}</p>}

      <label className="form-checkbox">
        <input type="checkbox" {...register("rememberMe")} />
        Remember me (1 hour)
      </label>

      <button type="submit" className="form-button" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;

<style>
{`
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
  }
  .form-title {
    font-size: 2rem;
    font-weight: bold;
    color: white;
    margin-bottom: 0.5rem;
  }
  .form-input {
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
  .form-checkbox {
    font-size: 0.875rem;
    color: white;
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .form-button {
    background: #dc2626;
    color: white;
    font-weight: bold;
    border-radius: 0.375rem;
    padding: 0.75rem;
    cursor: pointer;
  }
  .form-button:hover {
    background: #b91c1c;
  }
`}
</style>
