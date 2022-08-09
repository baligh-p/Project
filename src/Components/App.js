import { Route, Routes, BrowserRouter } from "react-router-dom"
import AuthRouter from "../CustomRoutes/AuthRouter";
import ListPage from "./ListPage/ListPage";
import SideBar from "./SideBar/SideBar";
import ErrorBoundaries from "./ErrorBoundaries/ErrorBoundaries"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRouter />}>
          <Route path="" element={<SideBar />}></Route>
          <Route path="IP_List" element={<ErrorBoundaries><ListPage /></ErrorBoundaries>}>
            <Route path=":direction" element={<SideBar />} />
          </Route>
          <Route path="History" element={<SideBar />}></Route>
          <Route path="MyProfile" element={<SideBar />}></Route>
          <Route path="Add_Marks" element={<SideBar />} ></Route>
          <Route path="Add_User" element={<SideBar />} ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;