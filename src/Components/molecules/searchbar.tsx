'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search...',
  buttonText = 'Search',
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      router.push(`/store/${encodeURIComponent(trimmed)}`);
      setValue(''); // ✅ Clear input after search
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center space-x-2 ${className}`}
    >
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit">{buttonText}</Button>
    </form>
  );
}
