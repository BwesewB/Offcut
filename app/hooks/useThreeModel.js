import ThreeCanvas from '@/app/components/atoms/canvas/ThreeCanvas';

export const useThreeModel = () => {
  return {
    load: (name) => {
      ThreeCanvas.loadModel(`/models/${name}.glb`);
    }
  };
};
