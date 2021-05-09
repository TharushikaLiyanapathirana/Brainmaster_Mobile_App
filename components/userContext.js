import React, { useEffect, useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) =>{
    return(
        <UserContext.Provider>
            {props.children}
        </UserContext.Provider>
    )
}