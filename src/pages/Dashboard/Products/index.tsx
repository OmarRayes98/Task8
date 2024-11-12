import searchIcon from "@/assets/images/searchIcon.png";
import Card from "@/components/common/Card/Card";
import Modal from "@/components/common/Modal/Modal";
import Pagination from "@/components/common/Pagination/Pagination";
import { useState } from "react";

const Products = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <section className=" px-[64px] md:px-[109px] pt-[24px] pb-[24px]">

          <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">

        </div>
        <input type="text"  className="block w-full h-10 px-4 rounded-lg text-sm font-normal border border-input outline-none  focus:border-primary/90" placeholder="Search product by name" required />
        <div className="absolute inset-y-0 end-0 flex items-center pe-3">
            <img src={searchIcon} alt="search icon" />
        </div>
    </div>

    <div className="mt-[58px] text-end">
    <button
          type="submit"
          className="text-sm w-[200px] h-[44px]  font-medium  text-white  bg-primary transition duration-500 hover:bg-primary/85  focus:outline-none   rounded-[4px]   uppercase "
        >
          add new product
        </button>
    </div>

    <article className="mt-8 grid gap-10 grid-cols-1   sm:grid-cols-[repeat(auto-fit,minmax(208px,1fr))]">
     <Card/>
     <Card/>
     <Card/>
     <Card/>
     <Card/>
     <Card/>
     <Card/>
     <Card/>
     <Card/>
     <Card/>
    </article>

    <div className="mt-[80px] w-full mx-auto max-w-[450px] ">
    <Pagination         
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}/>
    </div>
    <Modal/>
    </section>
  )
}

export default Products
