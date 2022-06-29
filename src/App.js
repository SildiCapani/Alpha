import { render } from "@testing-library/react"
import React, { Component, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

import Login from "./components/Login"
import Home from "./container/Home"
import { fetchUser } from "./utils/fetchUser"

const App = () => {

    return ( 
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/*" element={<Home />} />
        </Routes>
    )
}

export default App