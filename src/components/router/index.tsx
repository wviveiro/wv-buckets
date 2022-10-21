import React from "react";
import { Routes, HashRouter, Route } from "react-router-dom";
import { Accounts } from "../../pages/accounts";
import { NewAccounts } from "../../pages/new-account";

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Accounts />} />
          <Route path="new" element={<NewAccounts />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
