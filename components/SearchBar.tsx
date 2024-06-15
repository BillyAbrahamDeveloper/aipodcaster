'use client';

import Image from 'next/image';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDebounce } from '@/lib/useDebounce';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const debouncedValue = useDebounce(search, 800);

  useEffect(() => {
    if (debouncedValue) {
      router.push(`/discover?search=${debouncedValue}`);
    } else if (!debouncedValue && pathname === '/discover') {
      router.push(`/discover`);
    }
  }, [pathname, router, debouncedValue]);

  return (
    <div className=' relative  mt-8 block'>
      <Input
        className='input-class py-6 pl-12 focus:ring-orange-1'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch('')}
      />
      <Image
        src='/icons/search.svg'
        height={20}
        width={20}
        className=' absolute left-4 top-3.5'
        alt='searchicon'
      />
    </div>
  );
};

export default SearchBar;
