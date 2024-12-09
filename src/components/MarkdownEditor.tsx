import { useState, useEffect, ChangeEvent } from "react";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const MarkdownEditor: React.FC = () => {
  const [html, setHtml] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const turndownService = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
  });

  turndownService.use(gfm);

  turndownService.addRule("strikethrough", {
    filter: ["del"],
    replacement: (_: string) => `~~${_}~~`, // Utilisation de `_` pour ignorer la variable
  });

  turndownService.addRule("images", {
    filter: "img",
    replacement: (_: string, node: HTMLElement | Node) => {
      if (node instanceof HTMLElement) {
        const src = node.getAttribute("src") || "";
        const alt = node.getAttribute("alt") || "Image";
        return `![${alt}](${src})`;
      }
      return "";
    },
  });

  const saveToLocalStorage = (key: string, value: string) => {
    const expiration = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 1 semaine
    const data = { value, expiration };
    localStorage.setItem(key, JSON.stringify(data));
  };

  const loadFromLocalStorage = (key: string): string => {
    const data = localStorage.getItem(key);
    if (data) {
      const parsedData = JSON.parse(data) as {
        value: string;
        expiration: number;
      };
      if (new Date().getTime() < parsedData.expiration) {
        return parsedData.value;
      } else {
        localStorage.removeItem(key); // Supprime si expiré
      }
    }
    return "";
  };

  const handleHtmlChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputHtml = e.target.value;
    setHtml(inputHtml);
    const convertedMarkdown = turndownService.turndown(inputHtml);
    setMarkdown(convertedMarkdown);

    saveToLocalStorage("htmlContent", inputHtml);
  };

  const handleCopy = () => {
    if (markdown.trim()) {
      navigator.clipboard.writeText(markdown).then(() => {
        setMessage("Markdown copié dans le presse-papiers !");
        setTimeout(() => setMessage(""), 3000);
      });
    } else {
      setMessage("Rien à copier, la zone est vide !");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    const savedHtml = loadFromLocalStorage("htmlContent");
    if (savedHtml) {
      setHtml(savedHtml);
      setMarkdown(turndownService.turndown(savedHtml));
    }
  }, []);

  return (
    <section
      id="editor"
      className="w-full h-screen py-25 px-6 bg-gray-100 flex flex-col items-center"
    >
      <h2 className="text-3xl font-bold mb-6">
        Convertisseur HTML en Markdown (Avancé)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-8xl">
        {/* Input HTML */}
        <textarea
          value={html}
          onChange={handleHtmlChange}
          className="w-full h-80 md:h-150 p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Collez votre HTML ici..."
        />
        {/* Output Markdown */}
        <textarea
          value={markdown}
          readOnly
          onClick={handleCopy} // Appel à handleCopy lors du clic
          className="w-full h-80 md:h-150 p-4 border border-gray-300 rounded bg-gray-50 resize-none focus:outline-none cursor-pointer"
          placeholder="Le Markdown converti apparaîtra ici..."
        />
      </div>
      {message && (
        <p className="mt-4 text-center text-lg font-medium text-blue-600 duration-1000 ">
          {message}
        </p>
      )}
    </section>
  );
};

export default MarkdownEditor;
