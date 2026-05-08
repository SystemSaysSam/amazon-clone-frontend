import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {

   const user = localStorage.getItem('userEmail');

   if(!user){
      return <Navigate to="/signin" />;
   }

   return children;
}