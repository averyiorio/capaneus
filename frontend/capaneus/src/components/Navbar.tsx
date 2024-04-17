import { FaCode } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg mb-2">
      <div className="text-3xl font-semibold text-black">Capaneus</div>
      <a
        href="https://github.com/averyiorio/capaneus"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-lg font-[400] px-6 py-2 text-white bg-black bg-opacity-35 backdrop-filter backdrop-blur-lg rounded-md hover:bg-opacity-45 focus:outline-none border border-white-70 transition ease-in"
      >
        Source code
        <FaCode size={20} />
      </a>
    </nav>
  );
};

export default Navbar;
