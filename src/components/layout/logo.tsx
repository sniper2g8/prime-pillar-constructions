import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'small' | 'default' | 'large';
}

export function Logo({ className = '', size = 'default' }: LogoProps) {
  const sizes = {
    small: { width: 150, height: 40 },
    default: { width: 220, height: 60 },
    large: { width: 300, height: 80 },
  };
  
  return (
    <Image
      src="/images/logo.png"
      alt="PrimePillar Constructions"
      width={sizes[size].width}
      height={sizes[size].height}
      className={className}
      priority
    />
  );
}

// Text-only version for footer/mobile (CSS recreation)
interface LogoTextProps {
  className?: string;
}

export function LogoText({ className = '' }: LogoTextProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-2xl font-bold tracking-wider text-primary-500">
        PRIMEPILLAR
      </span>
      <span className="text-sm tracking-[0.3em] text-secondary-500">
        CONSTRUCTIONS
      </span>
    </div>
  );
}