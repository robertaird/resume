import React, { createContext, useContext, useState, useEffect } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

const WindowDimensionsCtx = createContext<Dimensions | null>(null);

const WindowSizeProvider: React.FC = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowDimensionsCtx.Provider value={dimensions}>
      {children}
    </WindowDimensionsCtx.Provider>
  );
};

export const useWindowDimensions = () => useContext(WindowDimensionsCtx);

export default WindowSizeProvider;
