import {createContext, useEffect, useState} from "react";
import axios from "axios";
// import {data} from "autoprefixer";

export const UserContext = createContext({});


// eslint-disable-next-line react/prop-types
export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [ready,setReady] = useState(false);

    useEffect(() => {
        if (!user) {
          axios.get('/profile')
            .then(({data}) => {
              setUser(data);
              setReady(true);
            })
            .catch(error => {
              console.error('Error fetching profile:', error);
              setReady(true);
            });
        }
      }, []);

    return (
      <UserContext.Provider value={{user, setUser, ready}}>
        {children}
      </UserContext.Provider>
    );
  }