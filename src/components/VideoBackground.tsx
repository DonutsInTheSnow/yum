'use client';

import { usePathname } from 'next/navigation';

export default function VideoBackground() {
  const pathname = usePathname();

  if (pathname === '/') {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-[-10]"
      >
        <source src="/videos/yum-cake-convert.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return null;
}