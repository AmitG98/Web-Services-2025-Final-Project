import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCurrentUser, submitLogin, submitRegister } from "../api/authApi";
import { useSessionContext } from "../context/UserSessionProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useUserLogin = () => {
  const { login } = useSessionContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: submitLogin,
    onSuccess: (res, variables) => {
      if (res?.user) {
        login(res.user);
        if (variables.rememberMe) {
        }
        toast.success("Welcome", {
          description: `Hello, ${res.user.username}`,
        });
        if (res.user.role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/profiles"); 
        }
      } 
    },
    onError: (err) => {
      toast.error("Login error", {
        description:
          err?.response?.data?.message || "Something went wrong",
      });
    },
  });
};

// export const useUserRegister = () => {
//   const navigate = useNavigate();

//   return useMutation({
//     mutationFn: submitRegister,
//     onSuccess: () => {
//       toast.success("Registration successful", {
//         description: "You can now log in.",
//       });
//       navigate("/login");
//     },
//     onError: (err) => {
//       console.error("❌ Registration error from server:", err);
//       toast.error("Registration error", {
//         description:
//           err?.response?.data?.message || "Try again later.",
//       });
//     },
//   });
// };

export const useUserQuery = () => {
  const { login, setCurrentUser } = useSessionContext();
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["active-user"],
    queryFn: fetchCurrentUser,
    onSuccess: (data) => {
      if (data) {
        login(data);
        navigate("/");
      }
    },
    onError: () => {
      setCurrentUser(null);
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
