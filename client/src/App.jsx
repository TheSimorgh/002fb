// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Routes, Route } from "react-router-dom";
import "./styles/icons/icons.css";
import "./index.css";
import "./styles/dark.css";

import { Home, Login, NotFound, Profile } from "./pages";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
// import { darkTheme_false, darkTheme_true } from "./reducer/features/themeSlice";
// import { useSelector } from "react-redux";

{
  /* <a href="https://vitejs.dev" target="_blank">
<img src={viteLogo} className="logo" alt="Vite logo" />
</a>
<a href="https://react.dev" target="_blank">
<img src={reactLogo} className="logo react" alt="React logo" />
</a> */
}

const data = [
  // { path: "/login", element: <Login /> },
  { path: "/profile", element: <Profile /> },
  { path: "/", element: <Home /> },
];
function App() {
  // (async () => {
  //   const res =await fetch("http://localhost:8000")
  //    console.log(res)

  // })();

  return (
    <div className={`"container mx-auto h-screen bg-dark` } >
      <Routes>
        <Route element={<LoggedInRoutes />}>
          {data.map((e, i) => (
            <Route path={e.path} element={e.element} key={i} />
          ))}
        </Route>
        <Route element={<NotLoggedInRoutes />}>
           <Route path="/login" element={<Login />} />
        </Route>
      <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
