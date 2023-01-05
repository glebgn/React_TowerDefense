import {createContext, useState} from "react";

// Purpose of this is to create peice of data that is accesable to all compments within our app
const UserContext = createContext(null);

/*export function UserProvider({children}){
    const [items, setItems] = useState([]);
    const updateUser = (login,user) =>{
        setItems({login,user});
    }
    return(
        <UserContext.Provider value={{items,updateUser}}>{children}</UserContext.Provider>
    );
}*/

export default UserContext