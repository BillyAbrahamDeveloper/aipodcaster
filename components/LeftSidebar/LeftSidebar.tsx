'use client';

import { sideBarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { SignOutButton, SignedIn, SignedOut, useClerk } from '@clerk/nextjs';

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <section className=' left_sidebar'>
      <nav className='flex flex-col gap-6'>
        <Link
          href='/'
          className=' flex cursor-pointer items-center gap-1 max-lg:justify-center pb-10'
        >
          <Image src='/icons/logo.svg' alt='logo' width={25} height={28} />
          <h1 className=' text-white-1 text-24 font-extrabold max-lg:hidden'>
            PodcastMe
          </h1>
        </Link>
        {sideBarLinks.map(({ route, label, imgURL }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link
              href={route}
              key={label}
              className={
                isActive
                  ? 'bg-nav-focus border-r-4 border-orange-1 flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start'
                  : 'flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start'
              }
            >
              <Image src={imgURL} width={24} height={24} alt={label} />
              <p>{label}</p>
            </Link>
          );
        })}
      </nav>
      <SignedOut>
        <div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
          <Button asChild className='text-16 w-full bg-orange-1 font-extrabold'>
            <Link href='/sign-in'>Sign in</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
          <Button
            className='text-16 w-full font-extrabold border-orange-1 border-solid border hover:bg-orange-1 hover:text-white-1 text-orange-1 '
            onClick={() => signOut(() => router.push('/'))}
          >
            Log Out
          </Button>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
