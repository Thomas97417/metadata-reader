"use client";
import * as exifr from "exifr";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useImageContext } from "./ImageContext";

type ImageUploaderProps = {
  setFileName: (fileName: string | null) => void;
};

const ImageUploader = ({ setFileName }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setImageUrl, setMetadata } = useImageContext();
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = async (file: File) => {
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();

      reader.onload = async (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);

        try {
          // Utilisation de la bibliothèque exifr pour extraire les métadonnées
          const metadata = await exifr.parse(file);
          setMetadata(metadata);
        } catch (error) {
          console.error("Error reading EXIF data:", error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      handleImageChange(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center cursor-pointer border-2 border-dashed rounded-lg p-8 h-64 text-center ${
        isDragging ? "border-primary bg-primary/10" : "border-gray-300"
      }`}
    >
      <p>Drag & drop an image here, or click to select one</p>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUploader;
