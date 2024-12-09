const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-black text-white py-4 px-6 fixed top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Markdown Converter</h1>
        <a
          href="#editor"
          className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200"
        >
          Convertir
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
