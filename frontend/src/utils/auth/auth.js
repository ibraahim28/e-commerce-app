import {jwtDecode} from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("auth_token");
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const decodedToken = jwtDecode(token);
    console.log("decodedToken", decodedToken)
    return decodedToken.role; // Assuming role is stored in the token
  } catch (error) {
    return null;
  }
};

export const getUserData = ()=>{
    const token = getToken();
    if (!token) return null;
    try {
        const decodedUser = jwtDecode(token);
        return decodedUser.data;
    } catch (error) {
        return null;
    }
}

export const isAuthenticated = () => {
  const token = getToken();
  return token ? true : false;
};
