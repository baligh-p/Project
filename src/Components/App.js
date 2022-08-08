import { Route, Routes, BrowserRouter } from "react-router-dom"
import AuthRouter from "../CustomRoutes/AuthRouter";
import SideBar from "./SideBar/SideBar";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRouter />}>
          <Route path="" element={<SideBar />}></Route>
          <Route path="IP_List" element={<SideBar />}>
            <Route path=":direction" element={<SideBar />} />
          </Route>
          <Route path="History" element={<SideBar />}></Route>
          <Route path="MyProfile" element={<SideBar />}></Route>
          <Route path="marks" element={<SideBar />} ></Route>
          <Route path="types" element={<SideBar />} ></Route>
          <Route path="Add_User" element={<SideBar />} ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;