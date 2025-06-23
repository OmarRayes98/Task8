import { TLoading } from "./shared.types";

export interface IAuthState {
  user: {
    email: string;
    first_name: string;
    last_name: string;
    user_name: string;
    profile_image: {
      url: string;
      publicId: string;
    };
  } | null;
  token: string | null;
  loading: TLoading;
  error: string | null;
}
