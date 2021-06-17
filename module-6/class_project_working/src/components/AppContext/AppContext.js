import { createContext } from "react";
const Context = createContext({});
const initialStore = {
  username: "SJ",
  theme: "dark",
};
const AppContextProvider = Context.Provider;
// EXPORTS
export const AppStore = (props) => {
  return (
    <AppContextProvider value={initialStore}>
      {props.children}
    </AppContextProvider>
  );
};
export const AppStoreConsumer = Context.Consumer;
