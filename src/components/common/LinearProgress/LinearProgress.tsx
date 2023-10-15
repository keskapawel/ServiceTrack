import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const LindearProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => oldProgress + 2);
    }, 33);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant='determinate' value={progress < 100 ? progress : 100} aria-label='Loading label' role='progressbar' aria-busy='true' />
    </Box>
  );
};
