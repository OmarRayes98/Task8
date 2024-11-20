import { UseFormRegister } from "react-hook-form";

interface InputProps {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    error?: string;
    id?: string;
    className?: string;
  }

const Input = ({type,name,id,label,placeholder,register,error}:InputProps) => {
    
  return (
    <>
    <label htmlFor={id} className="block mb-[10px] text-secondary font-medium text-sm capitalize">{label}</label>
    <input 
    type={type} 
    id={id} 
    className="text-xs font-normal  border border-input rounded-[4px] outline-none  focus:border-primary/90 block w-full h-[44px] px-[15px]" placeholder={placeholder}
    {...register(name)}
    />
    {error &&
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        {error}
      </p>
    }
    </>
  )
}

export default Input
