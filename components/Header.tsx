import Link from 'next/link';

const Header = ({ headerTitle }: { headerTitle: string }) => {
  return (
    <header className='flex items-center justify-between mb-4'>
      {headerTitle ? (
        <h1 className='text-18 font-bold text-white-1 '>{headerTitle}</h1>
      ) : (
        <div />
      )}

      <Link href='/discover' className='text-16 font-semibold text-orange-1'>
        See all
      </Link>
    </header>
  );
};

export default Header;
