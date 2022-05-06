import { AppContext, AppContextProvider } from "../src/components/AppContext";
import "../styles/globals.css";

const App = ({ Component, pageProps, ...otherProps }) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider>
  );
};

export default App;
