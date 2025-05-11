import { ChangeEvent, DragEvent, useCallback, useRef, useState } from "react";

interface FileWithPreview {
  id: string;
  file: File;
  preview: string;
}

interface UseFileUploadOptions {
  accept?: string;
  multiple?: boolean;
}

interface UseFileUploadState {
  files: FileWithPreview[];
  isDragging: boolean;
  errors: string[];
}

interface UseFileUploadActions {
  handleDragEnter: (e: DragEvent) => void;
  handleDragLeave: (e: DragEvent) => void;
  handleDragOver: (e: DragEvent) => void;
  handleDrop: (e: DragEvent) => void;
  openFileDialog: () => void;
  removeFile: (id: string) => void;
  getInputProps: () => {
    type: string;
    accept: string | undefined;
    multiple: boolean | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
}

export function useFileUpload(
  options: UseFileUploadOptions = {}
): [UseFileUploadState, UseFileUploadActions] {
  const { accept, multiple = false } = options;
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File) => {
      const errors: string[] = [];

      if (accept) {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const fileType = file.type;
        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          if (type.endsWith("/*")) {
            const baseType = type.slice(0, -2);
            return fileType.startsWith(baseType);
          }
          return fileType === type;
        });

        if (!isAccepted) {
          errors.push(`File type must be ${accept}`);
        }
      }

      return errors;
    },
    [accept]
  );

  const processFiles = useCallback(
    (fileList: FileList) => {
      const newFiles: FileWithPreview[] = [];
      const newErrors: string[] = [];

      Array.from(fileList).forEach((file) => {
        const fileErrors = validateFile(file);
        if (fileErrors.length > 0) {
          newErrors.push(...fileErrors);
          return;
        }

        const preview = URL.createObjectURL(file);
        newFiles.push({
          id: Math.random().toString(36).slice(2),
          file,
          preview,
        });
      });

      if (newErrors.length > 0) {
        setErrors(newErrors);
        return;
      }

      setFiles((prevFiles) => {
        // If not multiple, replace existing files
        const updatedFiles = multiple ? [...prevFiles, ...newFiles] : newFiles;
        // Clean up old previews if not multiple
        if (!multiple) {
          prevFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        }
        return updatedFiles;
      });
      setErrors([]);
    },
    [multiple, validateFile]
  );

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = e.dataTransfer?.files;
      if (!droppedFiles?.length) return;

      processFiles(droppedFiles);
    },
    [processFiles]
  );

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (!selectedFiles?.length) return;

      processFiles(selectedFiles);
      // Reset input value to allow selecting the same file again
      e.target.value = "";
    },
    [processFiles]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prevFiles) => {
      const fileToRemove = prevFiles.find((file) => file.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prevFiles.filter((file) => file.id !== id);
    });
    setErrors([]);
  }, []);

  const getInputProps = useCallback(
    () => ({
      type: "file",
      accept,
      multiple,
      onChange: handleChange,
      ref: inputRef,
    }),
    [accept, multiple, handleChange]
  );

  return [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ];
}
