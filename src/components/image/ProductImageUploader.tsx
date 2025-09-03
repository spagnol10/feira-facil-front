import { useRef } from "react";
import Image from "next/image";
import { CameraIcon, DownloadIcon, TrashIcon } from "../svg/SvgIcons";

interface ProductImageUploaderProps {
  imageUrl?: string;
  onImageChange: (file: File | null) => void;
}

export default function ProductImageUploader({ imageUrl, onImageChange }: ProductImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Apenas arquivos de imagem são permitidos!");
        return;
      }
      onImageChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40 rounded-xl border border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt="Preview"
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => onImageChange(null)}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
            >
              <TrashIcon fill="#E53E3E" />
            </button>
          </>
        ) : (
          <button
            type="button"
            className="flex flex-col items-center text-gray-500"
            onClick={() => fileInputRef.current?.click()}
          >
            <CameraIcon fill="#6B7280" size={32} />
            <p className="text-xs">Adicionar imagem</p>
          </button>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}