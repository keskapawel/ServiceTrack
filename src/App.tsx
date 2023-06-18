import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import GlobalLayout from 'layouts/GlobalLayout';
import { Layout } from 'layouts/Layout';
import { PageNotFoundPage } from 'pages/PageNotFoundPage';
import UnauthorizedOnlyLayout from 'layouts/UnauthorizedOnlyLayout';
import { LoginPage } from 'pages/LoginPage';
import { ProtectedLayout } from 'components/ProtectedLayout/ProtectedLayout';
import { HomePage } from 'pages/HomePage';
import { RegisterPage } from 'pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<GlobalLayout />}>
          {/* <Route element={<Layout />}> */}
          <Route path='*' element={<PageNotFoundPage />} />
          {/* </Route> */}

          <Route element={<UnauthorizedOnlyLayout />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
