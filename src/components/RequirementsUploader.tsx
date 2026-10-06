import { useRef } from 'react';
import type { Language } from '../i18n';
import { translate } from '../i18n';

interface RequirementsUploaderProps {
  onFileLoad: (content: string) => void;
  disabled?: boolean;
  language: Language;
}

export function RequirementsUploader({ onFileLoad, disabled, language }: RequirementsUploaderProps) {
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
        {translate('loadRequirements', language)}
      </button>
      <p className="text-sm text-gray-600">
        {translate('selectRequirementsFile', language)}
      </p>
    </div>
  );
}
