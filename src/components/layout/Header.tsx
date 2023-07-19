import ThemeMode from 'components/themeMode/ThemeMode';
import kingMakersLogo from 'assets/images/kingMakersLogo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5">
      <Link to="/">
        <img src={kingMakersLogo} className="w-48" alt="kingmakers logo" />
      </Link>
      <div className="mr-5">
        <ThemeMode />
      </div>
    </header>
  );
};

export default Header;
