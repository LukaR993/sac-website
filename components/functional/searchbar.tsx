'use client'
import { Search, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSearchParams, useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { useDebounce } from '@/hooks/use-debounce';

export default function Searchbar() {
  const [input, setInput] = useState('');
  const searchParams = useSearchParams();
  const debouncedValue = useDebounce(input, 500);
  const router = useRouter();

  useEffect(() => {
    if (debouncedValue) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('title', debouncedValue);
      router.push(`/products?${params.toString()}`);
    }
  }, [debouncedValue, router, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('title');
      router.push(`/products?${params.toString()}`);
    }
    setInput(e.target.value);
  };

  return (
    <div className='relative mb-4 flex items-center'>
      <Search className='w-4 h-4 absolute left-2' />
      <Input 
        placeholder="Search" 
        className='w-full px-9 bg-white'
        value={input}
        onChange={handleInputChange}
      />
      <Button 
        size={'sm'} 
        variant={'ghost'} 
        className='absolute hover:bg-background focus-visible:text-primary rounded right-[2px]'
        onClick={() => {
          if (input.trim().length === 0) {
            toast.error("Please enter a search term");
            return;
          }
        }}
      >
        <ArrowRight className='w-2 h-2 -rotate-90' />
      </Button>
    </div>
  );
}
