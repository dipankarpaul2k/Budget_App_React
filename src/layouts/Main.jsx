import { Outlet, useLoaderData } from "react-router-dom";

// Import helper function
import { fetchData } from "../helpers";

// Import footer image
import wave from "../assets/wave.svg";

// Import components
import NavBar from "../components/NavBar";

// Loader function
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export default function Main() {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <NavBar userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} />
    </div>
  );
}
