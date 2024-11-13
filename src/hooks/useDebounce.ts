import { useEffect, useState } from "react";

 const useDebounce = <T>(value:T, delay=700)=>{
    const [debouncedValue , setDebouncedValue]=useState<T>(value);
  
    useEffect(()=>{
  
      const timout = setTimeout(()=>{
        setDebouncedValue(value);
      },delay);
  
      return ()=> clearTimeout(timout)
  
    },[value]);
  
    return debouncedValue;
  }
  
  export default useDebounce;