import ThemeMode from 'components/themeMode/ThemeMode'; 
import kingMakersLogo from 'assets/images/kingMakersLogo.png';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5">
      <img src={kingMakersLogo} className="w-48" alt="kingmakers logo" />
      <div className="mr-5">
        <ThemeMode />
      </div>
    </header>
  );
};

export default Header;
