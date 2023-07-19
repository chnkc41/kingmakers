import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="border pb-5">
        {/* Content */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
