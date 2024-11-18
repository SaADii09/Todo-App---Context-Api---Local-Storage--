import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className="header">
                <NavLink to="/">Todo</NavLink>
                <NavLink to={"/weather"}>Weather</NavLink>
                <NavLink to={"/jokes"}>Jokes</NavLink>
            </div>
        </>
    );
};

export default Header;
