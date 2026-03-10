'use client';
import { useMediaQuery } from './hooks/useMediaQuery';
import HomeDesktop from './components/pages/HomeDesktop';
import HomeMobile from './components/pages/HomeMobile';

export default function Page() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  if (isMobile === null) return null;
  return isMobile ? <HomeMobile /> : <HomeDesktop />;
}