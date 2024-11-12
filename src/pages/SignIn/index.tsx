
import logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <section className="w-[95%] max-w-[500px] my-[40px]    px-[30.5px] py-[42px] bg-white rounded-[20px]">

      <img src={logo} className="mb-10 mx-auto h-[40px] w-[150px] object-contain object-center" alt="focalX Agency logo" />

      <h2 className="uppercase mb-3 text-center font-semibold text-[22px] leading-[26px]">sign in</h2>
      <p className="text-center mb-14 text-secondary text-sm font-normal">Enter your credentials to access your account</p>
      <form className="">
  <div className="mb-6">
    <label htmlFor="email" className="block mb-[10px] text-secondary font-medium text-sm capitalize">email</label>
    <input type="email" id="email" className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]" placeholder="Enter you email" required />
  </div>
  <div className="mb-[30px]">
    <label htmlFor="password" className="block mb-[10px] text-secondary font-medium text-sm capitalize">password</label>
    <input type="password" id="password" className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]" placeholder="Enter your password" required />

  </div>

  <button type="submit" className="text-white mb-7 bg-primary transition duration-500 hover:bg-primary/85  focus:outline-none  font-medium rounded-[4px] text-sm w-full h-[44px] text-center uppercase ">Sign in</button>
  
  <p id="helper-text-explanation" className="text-center  text-secondary text-sm font-normal">Don't have an account ? {" "}
    <Link to="/signup" className="text-primary hover:underline ">Create one</Link>
    
  </p>

      </form>
    </section>
  )
}

export default SignIn
