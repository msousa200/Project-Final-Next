import { createContext, useState } from "react";

export const TemaContext = createContext({
    tema: "light",
    setTema: () => {},
});

export const TemaProvider = ({ children }:{ children: React.ReactMode }) => {
    const [tema, setTema] = useState("light");

    return (
        <TemaContext.Provider value={{ tema, setTema }}>
            {children}
        </TemaContext.Provider>
    );
}