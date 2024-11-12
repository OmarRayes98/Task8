import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import uploadIcon from "@/assets/images/Upload_icon.png";

import { useRef, useState } from "react";

const SignUp = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image ,setImage] = useState("");
  // const [fileName, setFileName] = useState("");

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
      <form className="">

      <div className="mb-6">
          <label
            htmlFor="firstname"
            className="block mb-[10px] text-secondary font-medium text-sm capitalize"
          >
            name
          </label>
          <div className="flex gap-6">
          <input
            type="text"
            id="firstname"
            className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]"
            placeholder="First Name"
            required
          />
            <input
            type="text"
            id="lastname"
            className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]"
            placeholder="Last Name"
            required
          />
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
            required
          />
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
            required
          />
            <input
            type="password"
            id="re-password"
            className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]"
            placeholder="Re-Enter your password"
            required
          />
          </div>

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
                    image
                    ? <img className="aspect-[2/2] object-contain	" src={image}/>
                    : 
                    <div 
                    className="w-full h-full flex flex-col justify-center items-center"
                  >
                      <img src={uploadIcon} alt="upload icon" />
                    </div>
                  }

                </div>

                <input type="file" className="hidden" 
                accept="image/*"
                ref={fileInputRef}
                onChange={(e)=>{
                  if(e.target && e.target.files){
                    const file = e.target.files[0];
                    // setFileName(file.name);
                    setImage(URL.createObjectURL(file))
                  }
                }}/>
        </div>

        <button
          type="submit"
          className="text-white mb-7 bg-primary transition duration-500 hover:bg-primary/85  focus:outline-none  font-medium rounded-[4px] text-sm w-full h-[44px] text-center uppercase "
        >
          Sign in
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
