import React, { useState, createContext } from "react";

export interface authState {
  token: string | null;
  refreshToken: string  | null;
  username: string  | null;
  id: number | null | string ;
}

export type authStateContext = [
  authState,
  React.Dispatch<React.SetStateAction<authState>>
];

export const AuthContext = React.createContext<authStateContext>([
  { token: "", refreshToken: "", username: "", id: 0 },
  () => null,
]);

export const AuthProvider: any = (props: any) => {
  const [authState, setAuthState] = useState<authState>({
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    username: localStorage.getItem('username'),
    id: localStorage.getItem('id'),
  });

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthContext.Provider>
  );
};
