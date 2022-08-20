import { Route, Routes, BrowserRouter } from "react-router-dom"

import AuthRouter from "../CustomRoutes/AuthRouter";
import NotLoggedRouter from "../CustomRoutes/NotLoggedRouter";

import ListPage from "./ListPage/ListPage";
import SideBar from "./SideBar/SideBar";
import LoginPage from "./LoginPage/LoginPage";
import AddUser from "./AddUser/AddUser";
import AddType from "./AddType/AddType";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AuthRouter />}>
          <Route path="" element={<SideBar />}>
            <Route path="IP_List/:direction" element={<ListPage />} />
            <Route path="History" element={<div>History</div>}></Route>
            <Route path="MyProfile" element={<div>MyProfile</div>}></Route>
            <Route path="Add_Attributes" element={<AddType />} ></Route>
            <Route path="Add_User" element={<AddUser />} ></Route>
          </Route>
        </Route>

        <Route path="/Login" element={<NotLoggedRouter />}>
          <Route path="" element={<LoginPage />}></Route>
        </Route>

        <Route path="*" element={<div>error page</div>} />

      </Routes >
    </BrowserRouter >
  );
}

export default App;