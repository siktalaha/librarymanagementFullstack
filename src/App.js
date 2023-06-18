import './stylesheets/alignments.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import './stylesheets/sizes.css';
import './stylesheets/theme.css';
import { useSelector } from 'react-redux';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile"
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import BookDescription from './pages/BookDescription';
function App() {
  const {loading} =useSelector((state)=>state.loaders)
  return (
    <div>
      {loading &&  <Loader />}
      <BrowserRouter>
      <Routes>
      <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <BookDescription />
              </ProtectedRoute>
            }
          />
      <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>

      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
