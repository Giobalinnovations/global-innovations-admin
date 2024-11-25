// import { logo } from '@/lib/images';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/brand/logo.webp';
export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('relative overflow-hidden w-40', className)}>
      <Image
        alt="adcrest media logo"
        src={logo}
        className={cn('object-cover w-36', className)}
        priority
      />
    </Link>
  );
}
