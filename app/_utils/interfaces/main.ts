export const unCountedMessage = "There is a problem, Please try again later.";

export interface SignUpInterface {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  age: number;
  password: string;
}
export interface VerifyEmailInterface {
  email: string;
  verification_code: string;
}
export interface LoginInterface {
  email: string;
  password: string;
}
export interface UserPayloadInterface {
  client_id?: string | null;
  worker_id?: string | null;
  admin_id?: string | null;
  user_id?: string | null;
  first_name: string | null;
  last_name: string | null;
  role: string | null;
  avatar: string | null;
  email: string | null;
  gender: string | null;
  age: number | null;
  state?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
export interface UpdateUserDataInterface {
  first_name?: string | null;
  last_name?: string | null;
  avatar?: string | null;
  gender?: string | null;
  age?: number | null;
  state?: string | null;
}
export interface ReqResInterface {
  done: boolean;
  message?: string;
  status?: number;
}
export interface RefreshTokenInterface extends ReqResInterface {
  access_token?: string;
}
export interface ProfileInterface extends ReqResInterface {
  data?: UserPayloadInterface;
}
export interface TicketInterface {
  subject: string;
  body: string;
  image1?: string;
  image2?: string;
  image3?: string;
}
export interface PostInterface {
  title: string;
  description: string;
  language: string;
  language_level: string;
  price: number;
  state: string;
  image: string;
}
export interface WorkerBusiness {
  id: string;
  image: string;
  title: string;
  price: number;
  rate: number;
  worker: {
    email: string;
    first_name: string;
    last_name: string;
    gender: string;
  };
}
