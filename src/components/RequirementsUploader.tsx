import { useRef } from 'react';

interface RequirementsUploaderProps {
  onFileLoad: (content: string) => void;
  disabled?: boolean;
}

export function RequirementsUploader({ onFileLoad, disabled }: RequirementsUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      return;
    }

    // Check file type
    if (!file.name.endsWith('.json')) {
      alert('Please select a JSON file (.json)');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Read file
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        onFileLoad(content);
      }
    };

    reader.onerror = () => {
      alert('Failed to read the file. Please try again.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        disabled={disabled}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
      >
        Load requirements.json
      </button>
      <p className="text-sm text-gray-600">
        Select a requirements.json file from your computer
      </p>
    </div>
  );
}
