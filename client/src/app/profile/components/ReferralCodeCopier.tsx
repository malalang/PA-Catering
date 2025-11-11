'use client';

import { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import Button from '@/components/ui/Button';

interface ReferralCodeCopierProps {
  code: string;
}

const ReferralCodeCopier: React.FC<ReferralCodeCopierProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className='flex items-center gap-4'>
      <p className='font-semibold text-white text-lg bg-black/30 p-2 rounded-md'>{code}</p>
      <Button onClick={handleCopy} variant='secondary' size='sm' className='w-32'>
        {isCopied ? (
          <>
            <FaCheck />
            Copied!
          </>
        ) : (
          <>
            <FaCopy />
            Copy Code
          </>
        )}
      </Button>
    </div>
  );
};

export default ReferralCodeCopier;
