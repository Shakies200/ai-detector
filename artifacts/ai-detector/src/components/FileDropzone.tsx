import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File, X, FileText, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

interface FileDropzoneProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  isLoading?: boolean;
}

export function FileDropzone({ file, onFileSelect, isLoading }: FileDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    disabled: isLoading
  });

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="w-9 h-9 text-red-400" />;
    if (type.includes('word') || type.includes('document')) return <File className="w-9 h-9 text-primary" />;
    if (type.includes('image')) return <ImageIcon className="w-9 h-9 text-teal-400" />;
    return <File className="w-9 h-9 text-muted-foreground" />;
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            {...getRootProps()}
            className={clsx(
              "relative flex flex-col items-center justify-center w-full p-10 mt-2",
              "border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200",
              "hover:bg-primary/5 hover:border-primary/60",
              isDragActive ? "bg-primary/5 border-primary scale-[1.01]" : "border-border bg-background/50",
              isDragReject && "bg-red-500/5 border-red-500",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <input {...getInputProps()} />
            <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">
              {isDragActive ? "Drop file here" : "Click or drag to upload"}
            </h3>
            <p className="text-xs text-muted-foreground text-center max-w-xs">
              Supports PDF · Word (.docx) · Images (PNG, JPG)
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="file-preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between p-4 mt-2 bg-card border border-border rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 rounded-xl bg-muted/50 flex-shrink-0">
                {getFileIcon(file.type)}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium text-foreground truncate max-w-[180px] sm:max-w-[250px] text-sm">
                  {file.name}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {(file.size / 1024 / 1024).toFixed(2)} MB · {file.type.split('/').pop()?.toUpperCase() || 'File'}
                </span>
              </div>
            </div>
            {!isLoading && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect(null);
                }}
                className="p-1.5 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors flex-shrink-0 ml-2"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
