import React from "react";
import AuthLayout from "../components/Auth/AuthLayout";
import RegisterForm from "../components/Auth/RegisterForm";
import SiteFooter from "../components/Footer/Footer";

function Register() {
  return (
    <>
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
      <SiteFooter />
    </>
  );
}

export default Register;

// import React from "react";
// import { useForm } from "react-hook-form";
// import SiteFooter from "../components/Footer/Footer";
// import { useUserRegister } from "../hooks/useSession";

// function Register() {
//   console.log("📢 Register component loaded!");
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       username: "",
//       password: "",
//       role: "user",
//     },
//   });

//   const { mutate: createUser, isLoading, isError } = useUserRegister();

//   const onSubmit = (formData) => {
//     createUser(formData);
//     reset();
//   };

//   return (
//     <div className="form-wrapper">
//       <div className="form-overlay"></div>
//       <img src="/Logo.png" alt="Logo" className="form-logo" />

//       <form onSubmit={handleSubmit(onSubmit)} className="form-card">
//         <h2 className="form-title">Create Account</h2>

//         <input
//           placeholder="Email or Phone"
//           className="form-input"
//           {...register("username", { required: true })}
//         />
//         {errors.username && (
//           <p className="form-error">Please provide a valid email or phone</p>
//         )}

//         <input
//           type="password"
//           placeholder="Password"
//           className="form-input"
//           {...register("password", {
//             required: true,
//             minLength: 8,
//             pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
//           })}
//         />
//         {errors.password?.type === "required" && (
//           <p className="form-error">Password is required</p>
//         )}
//         {errors.password?.type === "minLength" && (
//           <p className="form-error">
//             Password must be at least 8 characters
//           </p>
//         )}
//         {errors.password?.type === "pattern" && (
//           <p className="form-error">
//             Password must contain letters and digits
//           </p>
//         )}

//         <select className="form-select" {...register("role")}>
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button
//           type="submit"
//           className="form-button"
//           disabled={isLoading}
//         >
//           {isLoading ? "Creating..." : "Register"}
//         </button>

//         {isError && (
//           <p className="form-error">Something went wrong. Try again.</p>
//         )}

//         <p className="recaptcha-text">
//           This page is protected by reCAPTCHA.{" "}
//           <a href="/" className="recaptcha-link">Learn more</a>
//         </p>
//       </form>
//       <SiteFooter />

//       <style>{`
//         .form-wrapper {
//           min-height: 100vh;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           background: #141414;
//           position: relative;
//         }
//         .form-overlay {
//           position: absolute;
//           inset: 0;
//           background: black;
//           opacity: 0.5;
//         }
//         .form-logo {
//           position: absolute;
//           top: 2rem;
//           left: 3rem;
//           width: 7rem;
//         }
//         .form-card {
//           position: relative;
//           background: rgba(0, 0, 0, 0.5);
//           padding: 2rem;
//           border-radius: 0.5rem;
//           color: white;
//           max-width: 400px;
//           width: 90%;
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//           z-index: 10;
//         }
//         .form-title {
//           font-size: 1.5rem;
//         }
//         .form-input, .form-select {
//           padding: 0.75rem;
//           border-radius: 0.375rem;
//           border: 1px solid #555;
//           background: transparent;
//           color: white;
//         }
//         .form-error {
//           color: #f87171;
//           font-size: 0.875rem;
//         }
//         .form-button {
//           background: #dc2626;
//           color: white;
//           font-weight: bold;
//           border-radius: 0.375rem;
//           padding: 0.75rem;
//         }
//         .form-button:hover {
//           background: #b91c1c;
//         }
//         .recaptcha-text {
//           font-size: 0.75rem;
//           color: #aaa;
//           margin-top: 3rem;
//         }
//         .recaptcha-link {
//           color: #3b82f6;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Register;
