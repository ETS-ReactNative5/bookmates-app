import React, {createContext} from 'react';

export const AuthContext = createContext({
    authState: {LoggedIn: false, token: ""},
    setAuthState: () => {},
});