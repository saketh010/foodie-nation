// import React, { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaFacebookF, FaGithub, FaGoogle, FaRegUser } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import Modal from "./Modal";
// import { AuthContext } from "../contexts/AuthProvider";
// import axios from "axios";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// const Signup = () => {
//   const { signUpWithGmail, createUser, updateUserProfile } = useContext(AuthContext);
//   const axiosPublic = useAxiosPublic();

//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = location.state?.from?.pathname || "/";

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     const email = data.email;
//     const password = data.password;
//     // console.log(email, password)
//     createUser(email, password).then((result) => {
//       // Signed up
//       const user = result.user;
//       updateUserProfile(data.email, data.photoURL).then(() => {
//         const userInfor = {
//           name: data.name,
//           email: data.email,
//         }
//         axiosPublic.post('/users', userInfor)
//           .then((response) => {
//             alert("signin successful!");
//             navigate(from, { replace: true })
//           })
//       })

//     })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//       });
//   };

//   // login with google
//   const handleRegister = () => {
//     signUpWithGmail()
//       .then((result) => {
//         const user = result.user;
//         const userInfor = {
//           name: result?.user?.displayName,
//           email: result?.user?.email,
//         };
//         axiosPublic.post("/users", userInfor)
//           .then((response) => {
//             // console.log(response);
//             alert("Signin successful!");
//             navigate("/");
//           })
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
//       <div className="mb-5">
//         <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
//           <h3 className="font-bold text-lg">Please Create An Account!</h3>
//           {/* name */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Name</span>
//             </label>
//             <input
//               type="name"
//               placeholder="Your name"
//               className="input input-bordered"
//               {...register("name")}
//             />
//           </div>

//           {/* email */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               type="email"
//               placeholder="email"
//               className="input input-bordered"
//               {...register("email")}
//             />
//           </div>

//           {/* password */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="password"
//               className="input input-bordered"
//               {...register("password")}
//             />
//             <label className="label">
//               <a href="#" className="label-text-alt link link-hover mt-2">
//                 Forgot password?
//               </a>
//             </label>
//           </div>

//           {/* error message */}
//           <p>{errors.message}</p>

//           {/* submit btn */}
//           <div className="form-control mt-6">
//             <input
//               type="submit"
//               className="btn bg-green text-white"
//               value="Sign up"
//             />
//           </div>

//           <div className="text-center my-2">
//             Have an account?
//             <Link to="/login">
//               <button className="ml-2 underline">Login here</button>
//             </Link>
//           </div>
//         </form>
//         <div className="text-center space-x-3">
//           <button
//             onClick={handleRegister}
//             className="btn btn-circle hover:bg-green hover:text-white"
//           >
//             <FaGoogle />
//           </button>
//           <button className="btn btn-circle hover:bg-green hover:text-white">
//             <FaFacebookF />
//           </button>
//           <button className="btn btn-circle hover:bg-green hover:text-white">
//             <FaGithub />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useContext } from "react"; // Import useContext from React
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle, FaRegUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver

const Signup = () => {
  const { signUpWithGmail, createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Schema for yup validation
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((response) => {
            alert("Signup successful!");
            navigate(from, { replace: true });
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/users", userInfo).then((response) => {
          alert("Signup successful!");
          navigate("/");
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Create an Account</h3>
          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name")}
              autoComplete="off"
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email")}
              autoComplete="off"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
              <span className="tooltip ml-1" title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character">*</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              {...register("password")}
              autoComplete="new-password"
            />
            <p className="text-red-500">{errors.password?.message}</p>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover mt-2">
                Forgot password?
              </a>
            </label>
          </div>

          {/* submit btn */}
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-green text-white"
              value="Sign up"
            />
          </div>

          <div className="text-center my-2">
            Have an account?
            <Link to="/login" className="ml-2 underline">
              Login here
            </Link>
          </div>
        </form>
        <div className="text-center space-x-3">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-green hover:text-white"
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

