import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="py-5">
        {/* Content */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
