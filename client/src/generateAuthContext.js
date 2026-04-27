const fs = require("fs");
const path = require("path");

const content = `
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
`;

const filePath = path.join(__dirname, "src", "context", "AuthContext.js");

// Write the file cleanly
fs.writeFileSync(filePath, content.trim(), { encoding: "utf-8" });

console.log("AuthContext.js file created successfully.");
