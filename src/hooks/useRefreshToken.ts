import { axiosPrivate } from "../api/axios";
import { useAuth } from "./useAuth";

export function useRefreshToken() {
  const { accessTokenChanger } = useAuth();

  const newAccessToken = async () => {
    try {
      const response = await axiosPrivate.post("/refresh");
      accessTokenChanger(response.data.accessToken);
    } catch (e) {
      console.log(e);
    }
  };
  return newAccessToken; //this is a hook return a function
}
