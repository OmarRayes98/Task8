export type TLoading = "idle" | "pending" | "succeeded" | "failed";

export type TProduct = {
  _id: string;
  name: string;
  price: string;
  user_name: string;
  image: {
    url: string;
    publicId: string;
  };
  created_at: string;
  updated_at: string;
  message?: string;
};
