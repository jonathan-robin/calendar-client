import React, { useState, createContext } from "react";

export interface authState {
  token: string;
  refreshToken: string;
  username: string;
  id: number;
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
    token: "",
    refreshToken: "",
    username: "",
    id: 0,
  });

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthContext.Provider>
  );
};
