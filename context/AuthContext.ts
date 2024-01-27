import { useContext, useEffect, createContext, useState } from "react";
// import {
//     GoogleAuthProvider,
//     signInWithPopup,
//     signInWithRedirect,
//     signOut,
//     onAuthStateChanged
// } from 'firebase/auth'

import { User } from "firebase/auth";
export const AuthContext = createContext({
    googleSignIn: () => {},
    logOut: () => {},
    delUser: (user:User) => {},
    signIn: (email:string, password:string) =>  null as any ,
    updatePass: (user:User, password:string) => {},
    user: null as User | null,
});

// export const AuthContextProvider = ({ children }) => {
//     const [user, setUser] = useState({});
//     const googleSignIn = () => {
//         const provider = new GoogleAuthProvider();
//         signInWithRedirect(auth, provider)
//     }
//     const logOut = () => {
//         signOut(auth);
//     }
//     useEffect(()=> {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//         });
//         return () => {
//             unsubscribe();
//         }
//     }, [])
//     return (
//         <AuthContext.Provider value={{googleSignIn, logOut, user}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const UserAuth = () => {
//     return useContext(AuthContext)
// }