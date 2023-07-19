import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="border dark:border-gray-800 py-5">
        {/* Content */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
