import React, { useState } from 'react';
import UploadImage from './components/UploadImage.jsx';
import SolutionCard from './components/SolutionCard.jsx';
import NavBar from './components/NavBar.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

export default function App() {
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-vscodeBg flex flex-col items-center py-8">
      <NavBar />
      <UploadImage setSolution={setSolution} setLoading={setLoading} />
      {loading && <LoadingSpinner />}
      {solution && <SolutionCard solution={solution} />}
      
        <p className="fixed bottom-4 right-6 text-xs text-red-500 font-code">
        by Aayush Raut
        </p>

    </div>
  );
}
