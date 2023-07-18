import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Loading from 'components/loading/Loading';
import NotFound from 'views/errorPages/NotFound';
import Layout from 'components/layout/Layout';
import Campaigns from 'views/campaigns/Campaigns';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
            <Route path="/" element={<Campaigns />} />
              <Route path="*" element={<NotFound />} /> 
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
