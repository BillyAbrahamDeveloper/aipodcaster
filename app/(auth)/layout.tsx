import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=' relative h-screen w-full'>
      <div className=' absolute size-full'></div>
      <Image src={'/images/bg-img.png'} fill alt='name' />
      {children}
    </main>
  );
}
