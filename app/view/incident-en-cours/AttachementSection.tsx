import React, { useRef } from "react";

interface Attachment {
  name: string;
  size: number;
  url: string;
}

interface AttachmentsSectionProps {
  attachments: Attachment[];
  onAddFile: (file: File) => void;
}

const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({
  attachments,
  onAddFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onAddFile(event.target.files[0]);
      event.target.value = ""; // reset input
    }
  };

  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes >= 1_000_000) return `${(sizeInBytes / 1_000_000).toFixed(1)} MB`;
    if (sizeInBytes >= 1_000) return `${(sizeInBytes / 1_000).toFixed(1)} KB`;
    return `${sizeInBytes} B`;
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return <span className="text-red-600 text-lg">📄</span>;
      case 'ai':
        return <span className="text-orange-500 text-lg">🎨</span>;
      case 'png':
      case 'jpg':
      case 'jpeg':
        return <span className="text-blue-400 text-lg">🖼️</span>;
      case 'zip':
        return <span className="text-yellow-500 text-lg">🗜️</span>;
      default:
        return <span className="text-gray-400 text-lg">📁</span>;
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-gray-800">
          Pièces jointes ({attachments.length})
        </h3>
        <button className="text-blue-600 hover:underline text-sm font-medium">
          Tout télécharger
        </button>
      </div>
      <div className="flex gap-3 flex-wrap">
        {attachments.map((file, index) => (
          <div
            key={index}
            className="border rounded-lg px-4 py-2 flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition-colors w-full max-w-xs"
          >
            <div className="flex items-center gap-2">
              <div>{getFileIcon(file.name)}</div>
              <div>
                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)} ·{" "}
                  <a
                    href={file.url}
                    download
                    className="hover:underline text-blue-600"
                  >
                    Télécharger
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Bouton + */}
        <button
          onClick={handleAddClick}
          className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-4 text-gray-500 hover:bg-gray-100 transition"
        >
          +
        </button>

        {/* Input caché */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default AttachmentsSection;
