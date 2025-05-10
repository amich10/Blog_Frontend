import React, { createContext, useState } from 'react';

export type IChildren = {
    children: React.ReactNode;
}

const CommentContext = createContext(undefined)


export const CommentProvider = ({children}:IChildren) =>{
    const [loading,setLoading] = useState(false)
    return (
        <>
        <CommentContext.Provider>

        </CommentContext.Provider>
        </>
    )
}