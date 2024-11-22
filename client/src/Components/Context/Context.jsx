import React, { createContext, useEffect, useState } from 'react'
export const ContextApi = createContext();
const Context = ({ children }) => {
    const colors = {
        primaryColor: "#2C3E50",
        secondaryColor: "#2980B9",
        backgroundColor: "#ECF0F1",
        textColor: "#34495E",
        errorColor: "#E74C3C",
        successColor: "#27AE60",
        whiteColor: "#ffffff",
    }

    const [auth, setAuth] = useState(null)
    useEffect(() => {
        const savedAuth = localStorage.getItem("auth");
        if (savedAuth) {
            setAuth(JSON.parse(savedAuth));
        }
    }, []);

    return (
        <ContextApi.Provider value={{ colors, auth, setAuth }}>
            {children}
        </ContextApi.Provider>
    )
}

export default Context