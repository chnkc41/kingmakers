import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="border mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
