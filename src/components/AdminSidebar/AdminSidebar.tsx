import logoutIcon from "@/assets/images/sign-out-alt.png";
import logo from "@/assets/images/logo.png";
import imageAvatar from "@/assets/images/img_avatar.png";

import { dataSidebar } from "@/constants/dataSidebar"; 

import { NavLink } from 'react-router-dom';
const AdminSidebar = () => {
  return (
    <div className="flex flex-col lg:px-[38px] py-[35px] w-14 lg:w-[270px] bg-[#F2EAE1] text-black">

      <div className="hidden lg:flex justify-center  gap-2 mb-[54px]">
        <span className="bg-primary h-[23px] w-1"></span>
        <img src={logo} alt="logo" className="h-[23px] w-[85px]" />
      </div>

      <div className="hidden lg:block mb-[70px] mx-auto">
      <picture className="rounded-full object-center h-[128px] w-[128px]" >
      <source  srcSet={undefined} />
      <img src={imageAvatar} alt="avatar error" className="rounded-full object-center leading-[128px] h-[128px] w-[128px]"/>
      </picture>

      <p className="mt-[20px] font-[700] text-lg text-center">
        Omar Rayes
      </p>
      </div>

      <ul className="flex items-center justify-center flex-col gap-2 lg:items-cente">
        {
          dataSidebar.map((item)=>(
            <NavLink className={({isActive})=>
              `flex items-center justify-center h-[41px] gap-2 lg:pe-4 capitalize text-sm font-medium w-full rounded-[4px]  transition hover:bg-primary/85
              ${isActive ? "bg-primary" : null}
              `} to={item.path}>
              <img src={item.icon} alt='bookmarkIcon' className="" />
              <span className="hidden lg:block">{item.title}</span>
              </NavLink>
          ))
        }
      </ul>

      <NavLink className={
          `mt-auto flex items-center justify-center gap-4 text-sm font-medium 
            transition hover:bg-primary/85"
          `
        }
        to="/">
        <span className="hidden lg:block">logout</span>
        <img src={logoutIcon} alt='logout icon' className="me-1" />
      </NavLink>
    </div>
  )
}

export default AdminSidebar;