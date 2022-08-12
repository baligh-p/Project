import { Route, Routes, BrowserRouter } from "react-router-dom"


import AuthRouter from "../CustomRoutes/AuthRouter";
import NotLoggedRouter from "../CustomRoutes/NotLoggedRouter";

import ListPage from "./ListPage/ListPage";
import SideBar from "./SideBar/SideBar";
import LoginPage from "./LoginPage/LoginPage";
import ErrorBoundaries from "./ErrorBoundaries/ErrorBoundaries"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRouter />}>
          <Route index element={<SideBar />}></Route>
          <Route path="IP_List" element={<ListPage />}>
            <Route path=":direction" element={<div></div>} />
          </Route>
          <Route path="History" element={<SideBar />}></Route>
          <Route path="MyProfile" element={<SideBar />}></Route>
          <Route path="Add_Marks" element={<SideBar />} ></Route>
          <Route path="Add_User" element={<SideBar />} ></Route>
        </Route>

        <Route path="/Login" element={<NotLoggedRouter />}>
          <Route path="" element={<LoginPage />}></Route>
        </Route>

      </Routes >
    </BrowserRouter >
  );
}

export default App;