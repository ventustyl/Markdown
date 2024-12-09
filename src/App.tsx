
import Hero from "./components/Hero";
import MarkdownEditor from "./components/MarkdownEditor";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      <Hero />
      <MarkdownEditor />
    </div>
  );
}
