export { LoginSchema } from "./model/schemas/LoginSchema";
export { PhoneSchema } from "./model/schemas/PhoneSchema";
export { RegisterSchema } from "./model/schemas/RegisterSchema";
export { getAuthData } from "./model/selectors";
export { userAction, userReducer } from "./model/slice/userSlice";
export { Gender } from "./model/types/UserType";
export type {
  RefreshToken,
  UserLoginData,
  UserErrorResponse,
} from "./model/types/UserType";

export type { RegisterType } from "./model/schemas/RegisterSchema";
export { useAuth } from "./model/useAuth";
export { useAuthModal } from "./model/useAuthModal";
export { useUser } from "./model/useUser";
export { AuthButton } from "./ui/AuthButton";
