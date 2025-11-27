'use client';

import { useState, useRef } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { uploadImage } from '@/lib/supabase/storage';

type Props = {
    defaultValue?: string | null;
    onChange: (url: string) => void;
    folder?: string;
    label?: string;
};

export const ImageUpload = ({
    defaultValue,
    onChange,
    folder = 'uploads',
    label = 'Upload Image',
}: Props) => {
    const [preview, setPreview] = useState<string | null>(defaultValue || null);
    const [uploading, setUploading] = useState(false);
    const [value, setValue] = useState<string>(defaultValue || '');
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
            setValue(publicUrl);
            onChange(publicUrl);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload image. Please try again.');
            setPreview(defaultValue || null);
            setValue(defaultValue || '');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        setValue('');
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className='space-y-4'>
            <div className='flex items-center gap-4'>
                {preview ? (
                    <div className='relative h-40 w-40 overflow-hidden rounded-lg border-2 border-yellow-500/30 bg-black/30'>
                        <Image
                            src={preview}
                            alt='Preview'
                            fill
                            className='object-cover'
                        />
                        <button
                            type='button'
                            onClick={handleRemove}
                            className='absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white hover:bg-red-600 transition-colors'
                        >
                            <FaTimes className='h-4 w-4' />
                        </button>
                        {uploading && (
                            <div className='absolute inset-0 flex items-center justify-center bg-black/60'>
                                <div className='h-8 w-8 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent' />
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        type='button'
                        onClick={() => fileInputRef.current?.click()}
                        className='flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-yellow-500/40 bg-black/20 hover:bg-black/40 hover:border-yellow-500/60 transition-all'
                    >
                        <FaUpload className='h-8 w-8 text-yellow-500' />
                        <span className='text-sm text-yellow-500 font-medium'>{label}</span>
                    </button>
                )}
                <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='hidden'
                />
            </div>
            <input type='hidden' name='photoURL' value={value} />
        </div>
    );
};
