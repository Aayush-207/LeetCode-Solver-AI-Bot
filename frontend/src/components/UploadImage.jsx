import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

export default function UploadImage({ setSolution, setLoading }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setSolution('');
  };

  const handleGenerate = async () => {
    if (!file) return;
    setLoading(true);

    const { data: { text } } = await Tesseract.recognize(file, 'eng');

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gemini`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text }),
    });

    if (!res.ok) {
      console.error('Server returned an error:', res.status);
      setSolution('Error: Could not generate solution.');
      setLoading(false);
      return;
    }

    const data = await res.json();
    setSolution(data.solution);
    setLoading(false);
  };

  return (
    <div className="my-8 flex flex-col items-center">
      <p className="text-vscodeText font-code text-xl mb-4">Upload an image</p>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {!preview && (
        <div
          onClick={() => inputRef.current.click()}
          className="w-80 h-48 flex items-center justify-center border-2 border-dashed border-vscodeAccent bg-[#2d2d2d] text-vscodeAccent text-6xl font-bold cursor-pointer rounded-lg hover:bg-[#3a3a3a] transition"
        >
          +
        </div>
      )}

      {preview && (
        <>
          <img
            src={preview}
            alt="Uploaded Screenshot"
            className="max-w-md border rounded-lg shadow mb-4"
          />
          <button
            onClick={handleGenerate}
            className="bg-vscodeAccent hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition"
          >
            Generate Solution
          </button>
        </>
      )}
    </div>
  );
}
