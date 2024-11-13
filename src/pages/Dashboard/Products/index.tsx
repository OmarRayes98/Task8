import searchIcon from "@/assets/images/searchIcon.png";
import Card from "@/components/common/Card/Card";
import Pagination from "@/components/common/Pagination/Pagination";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton/ProductSkeleton";
import useDebounce from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import actGetAllProducts from "@/store/products/act/actGetAllProducts";
import { searchProducts } from "@/store/products/productsSlice";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {

  const navigate = useNavigate();
  const {allProducts,filterProducts,loading} = useAppSelector((state) => state.products);
  const [querySearch , setQuerySearch] = useState("");
  const debouncedQuerySearch = useDebounce(querySearch,300);
  const [currentPage, setCurrentPage] = useQueryState("page");
  const limit=8;

  const dispatch = useAppDispatch();

  useEffect(()=>{

    if(querySearch?.trim()?.length ===0)
    dispatch(actGetAllProducts());

  },[dispatch,querySearch])
  
  //for search results 
  useEffect(()=>{
    if(debouncedQuerySearch?.trim()?.length >=1)
    dispatch(searchProducts(debouncedQuerySearch?.trim()))

  },[dispatch,debouncedQuerySearch])


  const totalPages = Math.ceil(((debouncedQuerySearch?.trim().length>=1)?filterProducts:allProducts)?.length/limit);

  const currentPageItems = ((debouncedQuerySearch?.trim().length>=1)?filterProducts:allProducts).slice((+((currentPage||currentPage===null||currentPage==='')?? 1) - 1) * limit, +((currentPage||currentPage===null||currentPage==='')?? 1) * limit);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page.toString());
  };

  const handleSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuerySearch(value)
  }

  
  
  return (
    <section className=" px-[64px] md:px-[109px] pt-[24px] pb-[24px]">

    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">

        </div>
        <input type="text" value={querySearch} onChange={handleSearchInput} disabled={loading==="pending" && true}  className="block w-full h-10 px-4 rounded-lg text-sm font-normal border border-input outline-none  focus:border-primary/90" placeholder="Search product by name" required />
        <div className="absolute inset-y-0 end-0 flex items-center pe-3">
            <img src={searchIcon} alt="search icon" />
        </div>
    </div>

    <div className="mt-[58px] text-end">
    <button
          onClick={()=>{navigate("create-product")}}
          className="text-sm w-[200px] h-[44px]  font-medium  text-white  bg-primary transition duration-500 hover:bg-primary/85  focus:outline-none   rounded-[4px]   uppercase "
        >
          add new product
        </button>
    </div>

    <article className="mt-8 grid gap-10 grid-cols-1 place-content-center	  sm:grid-cols-[repeat(auto-fit,minmax(208px,208px))]">
      {
        loading==="pending"?
        <ProductSkeleton/>
        :
        ((debouncedQuerySearch?.trim().length>=1)?filterProducts:allProducts)?.length >0 ?
        currentPageItems.map((item)=>(
          <Card key={item.id} itemObject={item} />
        ))
        :
        <h1>
          No Items 
        </h1>
      }
     
    </article>

    <div className="mt-[80px] w-full mx-auto max-w-[450px] ">
      {
        (loading==="pending"||((debouncedQuerySearch?.trim().length>=1)?filterProducts:allProducts)?.length ===0) ?
        null :
        <>
        <Pagination         
        totalPages={totalPages}
        currentPage={+((currentPage||currentPage===null||currentPage==='')?? 1)}
        onPageChange={handlePageChange}/>
        </>
      }
    
    </div>

    </section>
  )
}

export default Products
