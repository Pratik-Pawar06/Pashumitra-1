// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null); // "farmer" | "officer" | null
  const [user, setUser] = useState(null);
  console.log("user", user);

  return (
    <AuthContext.Provider value={{ role, setRole, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ export the hook separately
export function useAuth() {
  return useContext(AuthContext);
}
