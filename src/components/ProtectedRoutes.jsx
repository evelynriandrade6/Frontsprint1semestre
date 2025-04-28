import { Navigate } from "react-router-dom";
import DefaltLayout from "./Layout";


const ProtectedRoute = ({children}) =>{
    const isAuthenticated = localStorage.getItem("authenticated");
    return isAuthenticated ? <DefaltLayout>{children}</DefaltLayout>  : <Navigate to="/"/>
}
export default ProtectedRoute