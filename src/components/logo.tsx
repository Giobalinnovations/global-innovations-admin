// import { logo } from '@/lib/images';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/brand/logo.webp';
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('relative overflow-hidden w-40 h-10', className)}
    >
      <Image
        alt="global innovation media logo"
        src={logo}
        width={40}
        height={30}
        className={cn('object-cover', className)}
        priority
      />
    </Link>
  );
}
