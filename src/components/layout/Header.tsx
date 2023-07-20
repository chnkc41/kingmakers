import { Link } from 'react-router-dom';

import ThemeMode from 'components/themeMode/ThemeMode';
import kingMakersLogo from 'assets/images/kingMakersLogo.png';

const Header = () => {
  return (
    <header className="flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8 py-5">
      <Link to="/">
        <img
          src={kingMakersLogo}
          className="w-32 sm:w-48 inline-block pr-2"
          alt="kingmakers logo"
        />
      </Link>
      <div className="mr-5">
        <ThemeMode />
      </div>
    </header>
  );
};

export default Header;
