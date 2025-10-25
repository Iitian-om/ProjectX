export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <section className="text-center px-6">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          Welcome to <span className="text-blue-400">ProjectX</span> 🚀
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-300 mb-8">
          Your personal automation manager — handling schedules, reminders, and meetings so you can focus on what truly matters.
        </p>
        <div className="space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md">
            Get Started
          </button>
          <button className="border border-gray-400 hover:border-blue-500 text-gray-200 px-6 py-3 rounded-xl transition-all">
            Learn More
          </button>
        </div>
      </section>
      <footer className="absolute bottom-6 text-sm text-gray-500">
        © {new Date().getFullYear()} ProjectX Corporation Ltd.
      </footer>
    </main>
  );
} 