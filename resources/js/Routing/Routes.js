import { Route } from "react-router";
import { Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Plans from '../Pages/Plans';
import Dashboard from '../Pages/Dashboard';


export default function Routing(props) {
    return (
        <Routes>
            <Route exact path="/" element={<Home {...props} />} />
            <Route exact path="/plans" element={<Plans {...props} />} />
            <Route exact path="/dashboard" element={<Dashboard {...props} />} />
        </Routes>
    );
}