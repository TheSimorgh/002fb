// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Routes, Route } from "react-router-dom";
import "./styles/icons/icons.css";
import "./index.css";
import "./styles/dark.css";

import { Activate, Home, Login, NotFound, Profile, Reset } from "./pages";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

import CreatePostPopup from "./components/create_post_popup";
import { useSelector } from "react-redux";
// import { darkTheme_false, darkTheme_true } from "./reducer/features/themeSlice";

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
  { path: "/activate/:token", element: < Activate/> },
];

export const server_url="http://localhost:8000"
function App() {
  const {user}=useSelector(state=>state.user)


  return (
    <div className={`"container mx-auto h-screen bg-dark` } >
      <CreatePostPopup user={user} />
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
      <Route path="/reset" element={<Reset/>} />

      </Routes>
    </div>
  );
}

export default App;
