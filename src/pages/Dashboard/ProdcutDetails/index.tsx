
import imageDefault from "@/assets/images/defaultProduct.png";
import ArrowBack from "@/components/common/ArrowBack/ArrowBack";

const ProdcutDetails = () => {
  return (
    <section className="px-[64px] pt-[24px] pb-[24px]">
      <ArrowBack path="/dashboard" />

      <h2 className="mt-[76px] font-semibold text-4xl capitalize">
      iphone x
      </h2>

      <div className="mt-10 w-full max-w-[370px] max-h-[370px] mx-auto">
      <picture className="rounded-2xl h-full w-full bg-[#FEFEFE]" >
      <source  srcSet={undefined} />
      <img src={imageDefault} alt="imageDefault" className=" object-fill rounded-2xl h-[90%] w-[90%] bg-[#FEFEFE]"/>
      </picture>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-[25px] lg:gap-0 mt-[25px] ">
      <p className="font-semibold text-4xl capitalize inline-block">
      <span>
        Price:
      </span>
      <span className="text-[#8080808C] mx-4">
        200$
      </span>
      </p>

      <p className="font-semibold text-4xl capitalize inline-block">
      <span className="">
        Added At:
      </span>
      <span className="text-[#8080808C] mx-4">
        30/3/2420
      </span>
      </p>
      </div>

      <p className="text-center font-semibold text-4xl capitalize  mt-[25px]">
      <span>
        Updated At:
      </span>
      <span className="text-[#8080808C] mx-4">
        30/3/2020
      </span>
      </p>


    </section>
  )
}

export default ProdcutDetails
