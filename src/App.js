import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

import Home from "./component/Home";
import UsersShow from "./component/UsersShow";
import PlacesShow from "./component/PlacesShow";

function App() {
  const {id} = useParams();
  console.log(id);

  return (
    < div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UsersShow />} />
          <Route path="/places/:id" element={<PlacesShow />} />
        </Routes>
      </Router>
    </ div>
  );
}

export default App;