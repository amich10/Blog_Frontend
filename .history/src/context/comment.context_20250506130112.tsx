

import React, { createContext, ReactNode } from "react";

const CommentContext = createContext({});

interface CommentProviderProps {
  children: ReactNode;
}

export const CommentProvider: React.FC<CommentProviderProps> = ({ children }) => {
  return (
	<CommentContext.Provider value={{}}>
	  {children}
	</CommentContext.Provider>
  );
};