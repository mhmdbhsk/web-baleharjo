import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <Image
        src="/wonogiri-logo.svg"
        alt="Desa Baleharjo"
        width={36}
        height={36}
      />
      <div className="flex flex-col">
        <span className="ml-2 font-semibold text-gray-900">Desa Baleharjo</span>
        <span className="ml-2 text-xs text-muted-foreground">
          Eromoko • Wonogiri
        </span>
      </div>
    </Link>
  );
};

export default Logo;
