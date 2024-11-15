
import logo from "@/assets/images/logo.png";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { signInSchema, signInType } from "@/validations/signInSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { actAuthLogin } from "@/store/auth/authSlice";
import { IAuthState } from "@/types/auth.types";

const SignIn = () => {

  const { 
    // error, 
    loading, 
    token } = useAppSelector<IAuthState>((state) => state.auth);




  const dispatch = useAppDispatch();

  const navigate = useNavigate();





  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<signInType>({
    mode: "onSubmit",
    resolver: zodResolver(signInSchema),
  });

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const submitForm: SubmitHandler<signInType> = async (data) => {

    
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      });
  };


  return (
    <section className="w-[95%] max-w-[500px] my-[40px]    px-[30.5px] py-[42px] bg-white rounded-[20px]">

      <img src={logo} className="mb-10 mx-auto h-[40px] w-[150px] object-contain object-center" alt="focalX Agency logo" />

      <h2 className="uppercase mb-3 text-center font-semibold text-[22px] leading-[26px]">sign in</h2>
      <p className="text-center mb-14 text-secondary text-sm font-normal">Enter your credentials to access your account</p>
      
      <form onSubmit={handleSubmit(submitForm)}>
  <div className="mb-6">
    <label htmlFor="email" className="block mb-[10px] text-secondary font-medium text-sm capitalize">email</label>
    <input 
    type="email" 
    id="email" 
    className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]" placeholder="Enter you email"
    {...register("email")}
    />
    {formErrors.email &&
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {formErrors.email?.message}
      </p>
    }
  </div>

  <div className="mb-[30px]">
    <label htmlFor="password" className="block mb-[10px] text-secondary font-medium text-sm capitalize">password</label>
    <input 
    type="password" 
    id="password" 
    className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]" placeholder="Enter your password"
    {...register("password")}
    />
    {formErrors.password &&
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {formErrors.password?.message}
      </p>
    }
  </div>

  <button 
  type="submit" 
  className="text-white mb-7 bg-primary transition duration-500 hover:bg-primary/85  focus:outline-none  font-medium rounded-[4px] text-sm w-full h-[44px] text-center uppercase ">
    Sign in
    {
      loading==="pending" &&
      <svg aria-hidden="true" role="status" className="inline mx-2 w-6 h-6 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
      </svg>
    }
    </button>
  
  <p id="helper-text-explanation" className="text-center  text-secondary text-sm font-normal">Don't have an account ? {" "}
    <Link to="/signup" className="text-primary hover:underline ">Create one</Link>
    
  </p>

      </form>
    </section>
  )
}

export default SignIn
