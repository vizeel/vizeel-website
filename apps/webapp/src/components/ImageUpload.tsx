import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Upload, X, Image } from 'lucide-react';

interface ImageUploadProps {
  value?: {
    url: string;
    key: string;
    uploadedAt: Date;
  } | null;
  onChange: (imageData: { url: string; key: string; uploadedAt: Date } | null) => void;
  label?: string;
  disabled?: boolean;
}

const ImageUpload = ({ value, onChange, label = "Image", disabled = false }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, WebP, and GIF images are allowed');
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size must be less than 5MB');
      return;
    }

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4001';
      const token = localStorage.getItem('admin_token');

      const formData = new FormData();
      formData.append('image', file);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          setUploadProgress(progress);
        }
      });

      xhr.onload = () => {
        if (xhr.status === 201) {
          const response = JSON.parse(xhr.responseText);
          if (response.success) {
            onChange(response.data);
            toast.success('Image uploaded successfully');
          } else {
            toast.error('Upload failed');
          }
        } else {
          toast.error('Upload failed');
        }
        setUploading(false);
        setUploadProgress(0);
      };

      xhr.onerror = () => {
        toast.error('Upload failed');
        setUploading(false);
        setUploadProgress(0);
      };

      xhr.open('POST', `${apiUrl}/api/admin/blog/upload-image`);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {value ? (
        <div className="space-y-2">
          <div className="relative border rounded-lg p-2 bg-gray-50">
            <img 
              src={value.url} 
              alt="Uploaded image" 
              className="w-full h-32 object-cover rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1"
              onClick={handleRemove}
              disabled={disabled || uploading}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-xs text-gray-500">
            Uploaded: {new Date(value.uploadedAt).toLocaleDateString()}
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={triggerFileInput}
        >
          {uploading ? (
            <div className="space-y-2">
              <div className="animate-spin mx-auto">
                <Upload className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-sm text-gray-600">Uploading...</p>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-xs text-gray-500">{Math.round(uploadProgress)}%</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Image className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF, WebP up to 5MB
              </p>
            </div>
          )}
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled || uploading}
      />
    </div>
  );
};

export default ImageUpload;