import logoutIcon from "@/assets/images/sign-out-alt.png";
import logo from "@/assets/images/logo.png";
import imageAvatar from "@/assets/images/img_avatar.png";

import { dataSidebar } from "@/constants/dataSidebar"; 

import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "@/store/hook";
import actAuthLogout from "@/store/auth/act/actAuthLogout";
const AdminSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {user,loading} = useAppSelector((state) => state.auth);

  const handleLogout = ()=>{
    dispatch(actAuthLogout())
    .unwrap()
    .then(() => {
      navigate("/");
    });
  }

  console.log(import.meta.env.VITE_API_Domain+user?.profile_image,"sdaa")
  return (
    <div className="flex flex-col lg:px-[38px] py-[35px] w-14 lg:w-[270px] bg-[#F2EAE1] text-black">

      <div className="hidden lg:flex justify-center  gap-2 mb-[54px]">
        <span className="bg-primary h-[23px] w-1"></span>
        <img src={logo} alt="logo" className="h-[23px] w-[85px]" />
      </div>

      <div className="hidden lg:block mb-[70px] mx-auto">
      <picture className="rounded-full object-center h-[128px] w-[128px]" >
      <source  srcSet={import.meta.env.VITE_API_Domain+user?.profile_image} />
      <img src={imageAvatar} alt="avatar error" className="rounded-full object-center leading-[128px] h-[128px] w-[128px]"/>
      </picture>

      <p className="mt-[20px] font-[700] text-lg text-center">
        
          <span>
            {user?.first_name }
          </span>
          <span className="ms-2">
          {user?.last_name }
          </span>
        
      </p>
      </div>

      <ul className="flex items-center justify-center flex-col gap-2 lg:items-cente">
        {
          dataSidebar.map((item)=>(
            <NavLink key={item?.id} end  className={({isActive})=>
              `flex items-center justify-center h-[41px] gap-2 lg:pe-4 capitalize text-sm font-medium w-full rounded-[4px]  transition hover:bg-primary/85
              ${isActive ? "bg-primary pointer-events-none" : null}
              `} to={item.path} >
              <img src={item.icon} alt='bookmarkIcon' className="" />
              <span className="hidden lg:block">{item.title}</span>
              </NavLink>
          ))
        }
      </ul>

      <div onClick={handleLogout} className={
          `mt-auto flex items-center justify-center gap-4 text-sm font-medium 
            transition hover:bg-primary/85"
          `
        }
        >
        <span className="hidden lg:block cursor-pointer">logout</span>
       {loading==="pending" ? 
             <svg aria-hidden="true" role="status" className="inline mx-2 w-5 h-5 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
             </svg>
       :
        <img src={logoutIcon} alt='logout icon' className="me-1" />}
      </div>
    </div>
  )
}

export default AdminSidebar;