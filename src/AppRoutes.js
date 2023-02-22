import React, { useContext } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import './index.css'
import Category from './pages/category/Category';

const AppRoutes = () =>{

    /*const Private = ({children}) =>{
        const { token } = useContext(AuthContext);
        if(token == null){
          return <Navigate to="/login"/>
        } 
        return children;
    }*/

    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/category/:slug" element={<Category />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;