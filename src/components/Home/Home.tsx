import { Navbar } from "./navbar";

export const Home = () => {
  return (
    <>
      <div className="object-center relative h-screen md:w-full bg-cover  bg-[url('./background.jpg')]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              Welcome to
            </span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 animate-fade-in-up animation-delay-300">
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
              Sri Lankan Highway System
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
            Experience the future of highway travel with our cutting-edge
            computer vision system. Register now to seamlessly connect and
            navigate the island's road network like never before.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up animation-delay-900">
            Explore Our Highways
          </button>
        </div>
      </div>

      <Navbar />
    </>
  );
};
