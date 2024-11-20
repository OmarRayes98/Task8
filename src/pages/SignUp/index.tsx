import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import uploadIcon from "@/assets/images/Upload_icon.png";

import { useRef, useState } from "react";
import { actAuthRegister } from "@/store/auth/authSlice";
import {  Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpType } from "@/validations/signUpSchema";
import { useAppDispatch, useAppSelector } from "@/store/hook";

const SignUp = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image ,setImage] = useState("");

  // const [fileName, setFileName] = useState("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();


  const { 
    // error, 
    loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors: formErrors },
  } = useForm<signUpType>({
    mode: "onSubmit",
    resolver: zodResolver(signUpSchema),
  });

  const submitForm: SubmitHandler<signUpType> = async (data) => {
    
    const userData = { ...data, user_name: data.first_name + '_' + data.last_name };
    
    dispatch(actAuthRegister(userData))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      });
  };

  
  return (
    <section className="w-[95%] max-w-[500px] my-[40px] px-[30.5px] py-[42px] bg-white rounded-[20px]">
      <img
        src={logo}
        className="mb-10 mx-auto h-[40px] w-[150px] object-contain object-center"
        alt="focalX Agency logo"
      />

      <h2 className="uppercase mb-3 text-center font-semibold text-[22px] leading-[26px]">
        sign up
      </h2>
      <p className="text-center mb-14 text-secondary text-sm font-normal">
      Fill in the following fields to create an account.
      </p>
      <form onSubmit={handleSubmit(submitForm)}>

      <div className="mb-6">
          <label
            htmlFor="first_name"
            className="block mb-[10px] text-secondary font-medium text-sm capitalize"
          >
            name
          </label>
          <div className="flex gap-6">
          <div>
          <input
            type="text"
            id="first_name"
            className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]"
            placeholder="First Name"
            {...register("first_name")}
            
          />
          {formErrors.first_name &&
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {formErrors.first_name?.message}
      </p>
    }
          </div>
          <div>
          <input
            type="text"
            id="last_name"
            className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]"
            placeholder="Last Name"
            {...register("last_name")}
            
          />
          {formErrors.last_name &&
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {formErrors.last_name?.message}
      </p>
    }
          </div>
           
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-[10px] text-secondary font-medium text-sm capitalize"
          >
            email
          </label>
          <input
            type="email"
            id="email"
            className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]"
            placeholder="Enter you email"
            {...register("email")}
          />
          {formErrors.email &&
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {formErrors.email?.message}
      </p>
    }
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-[10px] text-secondary font-medium text-sm capitalize"
          >
            password
          </label>
          <div className="flex gap-6">
          <input
            type="password"
            id="password"
            className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]"
            placeholder="Enter you password"
            {...register("password")}
          />
          
            <input
            type="password"
            id="password_confirmation"
            className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]"
            placeholder="Re-Enter your password"
            {...register("password_confirmation")}
          />
          
          </div>
          {formErrors.password ?
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {formErrors.password?.message}
        
      </p>
      :
      formErrors.password_confirmation &&
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {formErrors.password_confirmation?.message}
        
      </p>
    }

        </div>


        <div className="mb-[30px]">
          <label
            htmlFor="upload"
            className="block mb-[15px] text-secondary font-medium text-sm capitalize"
          >
            profile image
          </label>
            <div onClick={()=>{
                      fileInputRef?.current?.click();
                  }} className=" w-[100px] h-[100px] p-1 bg-[#F8F8FF]  rounded-lg custom-dashed
                flex justify-center items-center overflow-hidden cursor-pointer">
                  {
                    (image && image !=="empty")
                    ? <img className="aspect-[2/2] object-contain	" src={image}/>
                    : 
                    <div 
                    className="w-full h-full flex flex-col justify-center items-center"
                  >
                      <img src={uploadIcon} alt="upload icon" />
                    </div>
                  }

            </div>

                <Controller
        name="profile_image"
        control={control}
        render={({ field }) => (
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={(e) => {
              fileInputRef.current = e;
              field.ref(e); // Connects the ref to React Hook Form
            }}
            onChange={(e) => {
              if (e.target && e.target.files) {
                const file = e.target.files[0];
                setImage(URL.createObjectURL(file));
                setValue("profile_image", file, { shouldValidate: true }); // Updates the file in React Hook Form
              }
            }}
          />
        )}
      />

      { (!image || image==="empty" ) &&
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {formErrors.profile_image?.message?.toString()}
                  
                </p>
      }
  
        </div>


        <button
          type="submit"
          className="text-white mb-7 bg-primary transition duration-500 hover:bg-primary/85  focus:outline-none  font-medium rounded-[4px] text-sm w-full h-[44px] text-center uppercase "
        >
          Sign in
          {
      loading==="pending" &&
      <svg aria-hidden="true" role="status" className="inline mx-2 w-6 h-6 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
      </svg>
    }
        </button>

        <p
          id="helper-text-explanation"
          className="text-center  text-secondary text-sm font-normal"
        >
          Do you have an account?{" "}
          <Link to="/" className="text-primary hover:underline ">
          Sign in
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
