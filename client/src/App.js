import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from './components/Register'
import Login from './components/Login';
import Logout from  './components/Logout';
import ProtectedRoutes from './components/ProtectedRoutes';
import Bookmark from './components/Bookmark';
import Addbook  from './components/Addbook';
import ContextProvider from './components/AxiosContext';
import Favorite from './components/Cart';
import Editbook from './components/Editbook';


function App() {
  return (
    <>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/bookmark" element={<Bookmark/>}></Route>
            <Route path="/addbook" element={<Addbook/>}></Route>
            <Route path="/favorite" element={<Favorite/>}></Route>
            <Route path="/editbook" element={<Editbook/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;