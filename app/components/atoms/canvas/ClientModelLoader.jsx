'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useThreeModel } from '@/app/hooks/useThreeModel';

// Dynamically load canvas — only on client
const ThreeCanvas = dynamic(() => import('./ThreeCanvas'), {
  ssr: false,
  loading: () => <div>Loading 3D...</div>,
});

const ClientModelLoader = ({ modelName }) => {
  const { load } = useThreeModel();

  useEffect(() => {
    if (modelName) load(modelName);
  }, [modelName, load]);

  return <ThreeCanvas />;
};

export default ClientModelLoader;
