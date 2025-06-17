export type TLoading = "idle" | "pending" | "succeeded" | "failed";

export type TProduct ={
    id: string;
    name: string;
    price: string;
    user_name:string;
    image:string;
    created_at:string;
    updated_at:string;
    message?:string;
}