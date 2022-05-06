import { AppContext } from "./AppContext";
import { makeClient } from "../services/makeClient";
import { useContext, useState, useEffect } from "react";

const useApi = (defaultValue, method, ...args) => {
  const [result, setResult] = useState(defaultValue);
  const { jwt } = useContext(AppContext);
  const deps = JSON.stringify(args);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await makeClient({ headers: { authentication: jwt } })[
          method
        ](...args);

        setResult([null, data]);
      } catch (err) {
        setResult([err, err.response]);
      }
    })();
  }, [jwt, args, method]);

  return result;
};

export default useApi;
