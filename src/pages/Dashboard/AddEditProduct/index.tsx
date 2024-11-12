import ArrowBack from "@/components/common/ArrowBack/ArrowBack";
import uploadIcon from "@/assets/images/UploadBigger.png";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const AddEditProduct = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image ,setImage] = useState("");
  const params = useParams();

  // Check if 'id' exists in params
  const hasID_Edit = Object.keys(params).includes('id');

  return (
    <section className="px-[64px] pt-[24px] pb-[24px]">
          <ArrowBack path="/dashboard" />
          
          <h2 className="mt-[76px] font-semibold text-4xl uppercase">
          {hasID_Edit ? "Edit Item" : "Add new Item"}
          </h2>

          <form className="mt-[77px] w-[95%]">
            
            <div className=" flex justify-between gap-6 ">
            <div className="flex flex-col justify-between w-[50%]">
            <div className="">
          <label
            htmlFor="name"
            className="block mb-[10px] text-secondary font-medium text-[30px] lead-[40px] capitalize"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]"
            placeholder="Enter you product name"
            required
          />
            </div>

            <div className="">
          <label
            htmlFor="price"
            className="block mb-[10px] text-secondary font-medium text-[30px] lead-[40px] capitalize"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]"
            placeholder="Enter you price"
            required
          />
            </div>

            </div>

            <div className="w-[50%]">
            <div className="">
          <label
            htmlFor="image"
            className="block mb-[10px] text-secondary font-medium text-[30px] lead-[40px] capitalize"
          >
            Image
          </label>
          
          <div onClick={()=>{
                      fileInputRef?.current?.click();
                  }} className=" w-full h-[209px] p-1 bg-[#F8F8FF]  rounded-lg custom-dashed
                flex justify-center items-center overflow-hidden cursor-pointer">
                  {
                    image
                    ? <img className="h-full" src={image}/>
                    : 
                    <div 
                    className="w-full h-full flex flex-col justify-center items-center"
                  >
                      <img className="h-[108] w-[120px]" src={uploadIcon} alt="upload icon" />
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

            </div>
            </div>

          <button
          type="submit"
          className="mt-[120px] text-[30px] flex items-center justify-center font-medium mx-auto text-white  bg-primary transition duration-500 hover:bg-primary/85  focus:outline-none   rounded-[4px] text-sm w-[200px] h-[60px]  uppercase "
        >
          Save
        </button>

          </form>

    </section>

  )
}

export default AddEditProduct
