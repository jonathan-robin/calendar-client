import React, {useState, createContext} from 'react'; 


// type IUserState = {
//     currentUser?: object;
// };

// type ICurrentUserContext = [IUserState, React.Dispatch<React.SetStateAction<IUserState>>];

// const CurrentUserContext = React.createContext<ICurrentUserContext>([{}, () => null]);

// const CurrentUserProvider = ({ children }: { children: any }) => {
//     const [state, setState] = useState<IUserState>({
//         currentUser: null,
//     });

//     return <CurrentUserContext.Provider value={[state, setState]}>{children}</CurrentUserContext.Provider>;
// };


interface authState{
    token:string, 
    refreshToken:string
}

type authStateContext = [authState, React.Dispatch<React.SetStateAction<authState>>]
 
export const AuthContext = React.createContext<authStateContext>([{token:'',refreshToken:''}, () => null]);

export const AuthProvider:any = (props:any) => {
    const [authState, setAuthState] = useState<authState>({ 
        token:'', 
        refreshToken:''
    }); 

    return(
    <AuthContext.Provider value={[authState, setAuthState]}>
        {props.children}
    </AuthContext.Provider>
    );

};
// export const AuthContext = createContext([a.authState, a.setAuthState]);


//     authState: authState, 
//     setAuthState: (authState:authState) => void
// }
// const a:Props = {
//     authState:{token:'', refreshToken:''}, 
//     setAuthState: ():void => {} 
// } 



