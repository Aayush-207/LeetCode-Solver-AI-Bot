import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('python', python);

export default function SolutionCard({ solution }) {
  const lines = solution.split('\n');

  let inCodeBlock = false;
  let codeBuffer = [];
  const elements = [];

  lines.forEach((line, idx) => {
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // Close code block
        elements.push(
          <SyntaxHighlighter
            key={`code-${idx}`}
            language="python"
            style={atomOneDark}
            showLineNumbers
            customStyle={{
              borderRadius: '0.5rem',
              padding: '1rem',
              fontSize: '0.9rem',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            {codeBuffer.join('\n')}
          </SyntaxHighlighter>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        // Open code block
        inCodeBlock = true;
      }
    } else if (inCodeBlock) {
      codeBuffer.push(line);
    } else {
      // Highlight important headings / sections
      const trimmed = line.trim().toLowerCase();

      if (trimmed.includes('time complexity')) {
        elements.push(
          <div key={`heading-${idx}`} className="text-vscodeAccent font-bold mt-6 mb-2 text-lg">
            🕒 {line}
          </div>
        );
      } else if (trimmed.includes('space complexity')) {
        elements.push(
          <div key={`heading-${idx}`} className="text-vscodeAccent font-bold mt-6 mb-2 text-lg">
            📦 {line}
          </div>
        );
      } else if (
        trimmed.includes('better') ||
        trimmed.includes('alternative') ||
        trimmed.includes('simpler')
      ) {
        elements.push(
          <div key={`heading-${idx}`} className="text-green-400 font-bold mt-6 mb-2 text-lg">
            ✅ {line}
          </div>
        );
      } else if (trimmed.startsWith('solution')) {
        elements.push(
          <div key={`heading-${idx}`} className="text-purple-400 font-bold mt-6 mb-2 text-lg">
            💡 {line}
          </div>
        );
      } else if (line.trim() !== '') {
        elements.push(<div key={`text-${idx}`}>{line}</div>);
      }
    }
  });

  return (
    <div className="bg-vscodeBg text-vscodeText p-6 rounded-lg shadow max-w-4xl mx-auto whitespace-pre-wrap font-mono leading-relaxed">
      {elements}
    </div>
  );
}
