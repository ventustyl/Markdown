function Hero() {
    return (
      <section className="h-screen w-full bg-blue-600 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center py-10">Convertisseur Markdown</h1>
        <p className="text-lg md:text-2xl max-w-xl text-center">
          Saisissez votre texte Markdown dans l’éditeur ci-dessous et voyez-le converti instantanément en HTML.
        </p>
        <a href="#editor" className="mt-6 px-8 py-3 bg-white text-blue-600 font-bold rounded hover:bg-gray-200">
          Commencez
        </a>
      </section>
    );
  }
  
  export default Hero;
  