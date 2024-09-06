"use client";
import * as exifr from "exifr";
import React, { ChangeEvent, useRef } from "react";

type ImageUploaderProps = {
  setMetadata: (metadata: any) => void;
  setImageUrl: (imageUrl: string | null) => void;
  setFileName: (fileName: string | null) => void;
};

const ImageUploader = ({
  setMetadata,
  setImageUrl,
  setFileName,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleImageChange(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      className="flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
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
