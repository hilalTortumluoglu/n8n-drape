import { useRef, DragEvent, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
  className?: string;
}

export default function UploadZone({
  onFileSelect,
  accept = 'image/*',
  label = 'Drop your file here',
  className = ''
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-gold transition-colors ${className}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <Upload className="w-8 h-8 mx-auto mb-2 text-muted" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
