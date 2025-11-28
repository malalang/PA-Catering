"use client";

import { useState, useRef } from "react";
import { HiPhoto, HiXMark } from "react-icons/hi2";
import Image from "next/image";
import { uploadImage } from "@/lib/supabase/storage";

type Props = {
    defaultValue?: string | null;
    onChange: (url: string, filePath?: string) => void;
    folder?: string;
    fieldName?: string;
};

export const ImageUpload = ({ defaultValue, onChange, folder = "uploads", fieldName = "image_url" }: Props) => {
    const [preview, setPreview] = useState<string | null>(defaultValue || null);
    const [uploading, setUploading] = useState(false);
    const [value, setValue] = useState<string>(defaultValue || "");
    const [uploadedPath, setUploadedPath] = useState<string>(""); // Track for cleanup
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create local preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setUploading(true);

        try {
            const publicUrl = await uploadImage(file, folder);
            const filePath = publicUrl.split(`${folder}/`)[1] || "";
            console.log("ImageUpload: Upload success, URL:", publicUrl);
            setValue(publicUrl);
            setUploadedPath(filePath);
            onChange(publicUrl, `${folder}/${filePath}`);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload image. Please try again.");
            setPreview(defaultValue || null); // Revert on failure
            setValue(defaultValue || "");
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        console.log("ImageUpload: Removing image");
        setPreview(null);
        setValue("");
        setUploadedPath("");
        onChange("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                {preview ? (
                    <div className="relative h-40 w-40 overflow-hidden rounded-lg border border-white/10 bg-yellow-900/50">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-rose-500 transition-colors"
                        >
                            <HiXMark className="h-4 w-4" />
                        </button>
                        {uploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-yellow-900/20 hover:bg-yellow-900/40 transition-colors"
                    >
                        <HiPhoto className="h-8 w-8 text-yellow-400" />
                        <span className="text-xs text-yellow-400">Upload Image</span>
                    </button>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
            <input type="text" name={fieldName} value={value} readOnly className="w-full text-xs bg-yellow-800 text-yellow-400 p-2 rounded" />
        </div>
    );
};
