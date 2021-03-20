import React from "react";
import Context from "./Context";
import useStorage from "./useStorage";
export interface AuxProps {
  children: React.ReactNode;
}

function StoreProvider({ children }: AuxProps) {
  const [token, setToken] = useStorage("token");

  return (
    <Context.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default StoreProvider;
