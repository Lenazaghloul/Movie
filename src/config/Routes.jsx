import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/:category/search/:keyword" Component={Catalog} />
      <Route path="/detail" Component={Detail} />
      <Route path="/"Component={Home} />
      <Route path='/:category' Component={Catalog}/>
    </Routes>
  );
};

export default AppRoutes;
