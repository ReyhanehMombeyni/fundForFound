"use client";

import { PostFormContextType } from "@/types/context";
import { createContext, useContext, ReactNode, useReducer } from "react";
import { initialState, reducer } from "./lib/reducer";

const PostFormContext = createContext<PostFormContextType | null>(
  null
);

export const PostFormProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PostFormContext.Provider value={{ state, dispatch }}>
      {children}
    </PostFormContext.Provider>
  );
};

export const usePostForm = () => {
  const context = useContext(PostFormContext);
  if (!context)
    throw new Error("usePostForm must be used inside PostFormProvider");
  return context;
};
