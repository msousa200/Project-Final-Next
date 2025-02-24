import {createContext} from "react";
import { useContext } from "react";
import { NomeContext } from "./NomeContext";
import {player}

export const NomeContext = createContext({name: ""})

export const NomeProvider = ({children}) => {
    return (
        <NomeContext.Provider value={{name: "Jhonny"}}>
            {children}
        </NomeContext.Provider>
    )
}

const player = () => {
    const {name} = useContext(NomeContext)
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}