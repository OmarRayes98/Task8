import defaultImage from "@/assets/images/defaultProduct.png";
const Card = () => {
  return (
    <div className="w-full  h-[208px] rounded-2xl custom-shadow group">
    <div className="relative overflow-hidden h-full w-full ">
      <img className="h-[208px] mx-auto w-[208px] rounded-2xl" src={defaultImage} alt=""/>
      
      <div className="absolute cursor-pointer px-[15px] rounded-2xl h-full w-full bg-[#F2EAE1B2] flex flex-col items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-[22px] font-medium leading-[35px]">
        Name iphone x
        </p>
        <div className="flex justify-between gap-2 mt-[30px]">
        <button className="bg-primary rounded text-white w-[81px] h-[34px]">Edit</button>
        <button className="bg-[#FE0000] rounded text-white w-[81px] h-[34px]">Delete</button>

        </div>
      </div>
      
    </div>
    </div>
  )
}

export default Card
