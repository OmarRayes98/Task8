import ArrowBack from "@/components/common/ArrowBack/ArrowBack";
import uploadIcon from "@/assets/images/UploadBigger.png";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {  SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addOrEditFormSchema, formType } from "@/validations/addOrEditFormSchema";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import actAddProduct from "@/store/products/act/actAddProduct";
import { toast } from "react-toastify";
import actEditProduct from "@/store/products/act/actEditProduct";
import actGetProduct from "@/store/products/act/actGetProduct";
import ProductEditFormSkeleton from "@/components/skeletons/ProductEditFormSkeleton";
import { resetDetailsProduct } from "@/store/products/productsSlice";

const AddEditProduct = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image ,setImage] = useState("");
  const dispatch = useAppDispatch();
  const {loading,loadingProduct,product} = useAppSelector((state)=>state.products)

  // Check if 'id' exists in params
  // const hasID = Object.keys(params).includes('id');
  const {id} = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<formType>({
    mode: "onSubmit",
    resolver: zodResolver(addOrEditFormSchema),
    // defaultValues,

  });

  useEffect(()=>{
    //claa api once , not every time the useEffect invoking
    if(id &&!product){

      dispatch(actGetProduct(id)).unwrap()

    }else if(id && product && Object.keys(product)?.length > 1){ // lenght > 1 : the reposne not { message }
      
      reset(product);
      if(product?.image_url){
        setImage(product?.image_url)
      }else
      setImage("")

    }

    return ()=>{
      if(id && product && Object.keys(product)?.length > 0)
      dispatch(resetDetailsProduct())
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch,product?.name,product?.price,product?.image_url])

  

  // const defaultValues: Partial<formType> = {
  //   name:product?.name ? product.name :"",
  //   price:product?.price ? product.price :"",
  // }
  


  const submitForm: SubmitHandler<formType> = async (data) => {
    
    if(!image || image==="empty"){
      setImage("empty")
      return
    }

    const formData = { ...data, image:fileInputRef!.current!.files![0]  };
    if(id){

    const formDataEdit = { ...data,id:id,_method:"PUT", image:fileInputRef!.current!.files![0]  };
      dispatch(actEditProduct(formDataEdit))
      .unwrap()
      .then(() => {
        
        // setImage("");
        // reset(); : no need reset with edit . maybe user want to change again .
        toast.success(("The Item Is Edited"), {
          position: "bottom-right",
          autoClose: 1800,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          className : 'toast-message',
          progressClassName: 'toast-message-progress',
      })

      });

    }else{
      dispatch(actAddProduct(formData))
      .unwrap()
      .then(() => {
        
        setImage("");
        reset();
        toast.success(("The Item Is Added"), {
          position: "bottom-right",
          autoClose: 1800,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          className : 'toast-message',
          progressClassName: 'toast-message-progress',
      })

      });
    }
    
  };

  return (
    <section className="px-[64px] pt-[24px] pb-[24px]">
          <ArrowBack path="/dashboard" />
          
          {
            (id && loadingProduct ==="pending") ?
            <ProductEditFormSkeleton/>
            :
            <>
            <h2 className="mt-[76px] font-semibold text-4xl uppercase">
          {id ? "Edit Item" : "Add new Item"}
          </h2>

          <form onSubmit={handleSubmit(submitForm)} className="mt-[77px] w-[95%]">
            
            <div className=" flex justify-between gap-6 ">
            <div className="flex flex-col justify-between w-[50%]">
            <div className="relative">
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
            {...register("name")}
          />
            {formErrors.name &&
              <p className="absolute top-full start-0	 mt-2 text-sm text-red-600 dark:text-red-500">
                {formErrors.name?.message}
              </p>
            }
            </div>

            <div className="relative">
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
            {...register("price")}

          />
            {formErrors.price &&
              <p className="absolute top-full start-0	 mt-2 text-sm text-red-600 dark:text-red-500">
                {formErrors.price?.message}
              </p>
            }
            </div>

            </div>

            <div className="w-[50%]">
            <div className="relative">
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
                    (image && image !=="empty") 
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
                
                { (image==="empty" ) &&
                  <p className="absolute top-full start-0	 mt-2 text-sm text-red-600 dark:text-red-500">
                  not selected 
                  
                </p>
                }

            </div>

            </div>
            </div>

          <button
          type="submit"
          className="mt-[120px] text-[30px] flex items-center justify-center font-medium mx-auto text-white  bg-primary transition duration-500 hover:bg-primary/85  focus:outline-none   rounded-[4px] text-sm w-[200px] h-[60px]  uppercase "
        >
          {
            loading==="pending"?
            <svg aria-hidden="true" role="status" className="inline mx-2 w-6 h-6 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
            </svg>
            :
            "Save"
          }
        </button>

          </form>
            </>
          }
          


    </section>

  )
}

export default AddEditProduct
