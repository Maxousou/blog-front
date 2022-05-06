import Link from "next/link";
import { useContext } from "react";
import useApi from "../src/components/useApi.js";
import Button from "../src/components/Button.jsx";
import { AppContext } from "../src/components/AppContext.js";

const IndexPage = () => {
  const [err, { data }] = useApi([null, {}], "get", "/users");
  const { logout } = useContext(AppContext);
  return (
    <div>
      <h1> Coucou Toi</h1>
      <ul>
        <li>
          <Link href="/sign-in">
            <a className="text-blue-680">Sign in</a>
          </Link>
        </li>
        <li>
          <Link href="/sign-up">
            <a className="text-blue-680">Sign up</a>
          </Link>
        </li>
        <li>
          <Button onClick={logout}>LOGOUT</Button>
        </li>
      </ul>
      {err ? (
        <p className="bg-red-600 text-white px-4 py-2 font-bold"></p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default IndexPage;
