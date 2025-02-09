import { cn } from '@/lib/utils';
import Link from 'next/link';

type UnderlineLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const UnderlineLink = ({ href, children, className }: UnderlineLinkProps) => {
  return (
    <div className="group text-orange-500 transition-all duration-300 ease-in-out">
      <Link
        href={href}
        className={cn(
          'bg-left-bottom bg-gradient-to-r from-orange-500 to-orange-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out',
          className
        )}
      >
        {children}
      </Link>
    </div>
  );
};

export default UnderlineLink;
