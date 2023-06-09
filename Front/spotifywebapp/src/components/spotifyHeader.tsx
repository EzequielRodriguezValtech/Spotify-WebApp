import Image from "next/image";

export default function spotifyHeader() {
  return (
    <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <Image src="/vercel.svg" alt="Vercel Logo" className="dark:invert" width={100} height={24} priority />
      <h1>el headerrrrrx</h1>
    </header>
  );
}
