import { createContext } from "react";

const StoreContext = createContext({
  token: null,
  setToken: (p: object) => {},
});

export default StoreContext;
