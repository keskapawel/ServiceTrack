import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import GlobalLayout from 'layouts/GlobalLayout';
import { Layout } from 'layouts/Layout';
import { PageNotFoundPage } from 'pages/PageNotFoundPage';
import UnauthorizedOnlyLayout from 'layouts/UnauthorizedOnlyLayout';
import { LoginPage } from 'pages/LoginPage';
import { ProtectedLayout } from 'components/ProtectedLayout/ProtectedLayout';
import { HomePage } from 'pages/HomePage';
import { RegisterPage } from 'pages/RegisterPage';
import { EPageType } from 'pages/PageType';
import { ManageUsersPage } from 'pages/ManageUsersPage';
import { SingleUserPage } from 'pages/SingleUserPage';
import { SettingsPage } from 'pages/SettingsPage/SettingsPage';
import { TicketsPage } from 'pages/TicketsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path='*' element={<PageNotFoundPage />} />

          <Route element={<UnauthorizedOnlyLayout />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />

              <Route path={`/${EPageType.SETTINGS}`}>
                <Route index element={<SettingsPage />} />
                <Route path={`${EPageType.MANAGE_USERS}`} element={<ManageUsersPage />} />
                <Route path={`${EPageType.MANAGE_USERS}/:id`} element={<SingleUserPage />} />
              </Route>

              <Route path={`/${EPageType.TICKETS}`}>
                <Route index element={<TicketsPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
