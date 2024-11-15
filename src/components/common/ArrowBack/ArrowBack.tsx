import { Link } from "react-router-dom"
import backArrow from "@/assets/images/ArrowBack.png";

const ArrowBack = ({path}:{path:string }) => {
  return (
    <Link to={path}  className="block h-[40px] w-[40px]">
    <img src={backArrow} alt="back icon" className="h-full w-full" />
  </Link>
  )
}

export default ArrowBack
