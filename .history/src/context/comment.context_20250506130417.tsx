import React, { createContext } from 'react';

export type IChildren = {
    children: React.ReactNode;
}

const CommentContext = createContext(undefined)


export const CommentProvider = ({children}:IChildren) =>{
    return (
        <>
        <CommentContext.Provider>
            
        </CommentContext.Provider>
        </>
    )
}