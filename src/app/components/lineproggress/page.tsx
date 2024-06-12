"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Instance } from '@popperjs/core';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './lin.css';

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          height: "30px",
          fontSize: "1em",
          color: "white",
          backgroundColor: "#0F8B8D",
        },
        arrow: {
          color: "#0F8B8D",
        },
      },
    },
  },
});

interface ProgressBarWithDynamicTooltipProps {
  progress: number;
  height?: number;
  width?: string;
}

const LineProgress: React.FC<ProgressBarWithDynamicTooltipProps> = ({
  progress,
  height = 10,
  width = '100%',
}) => {
  const [tooltipPosition, setTooltipPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const popperRef = React.useRef<Instance>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const updateTooltipPosition = () => {
    const progressWidth = areaRef.current!.offsetWidth;
    const progressX = areaRef.current!.getBoundingClientRect().x;
    const offsetX = progressWidth * (progress / 100);
    setTooltipPosition({ x: progressX + offsetX, y: areaRef.current!.getBoundingClientRect().y });
  };

  React.useEffect(() => {
    updateTooltipPosition();
    window.addEventListener('scroll', updateTooltipPosition);

    return () => {
      window.removeEventListener('scroll', updateTooltipPosition);
    };
  }, [progress]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width, position: 'relative', marginTop: 1 }}>
        <Tooltip
          className='tooltip11'
          followCursor={true}
          title={`${progress}%`}
          placement="top"
          arrow
          PopperProps={{
            popperRef,
            anchorEl: {
              getBoundingClientRect: () => {
                return new DOMRect(
                  tooltipPosition.x,
                  tooltipPosition.y,
                  0,
                  0,
                );
              },
            },
          }}
          open
        >
          <Box
            ref={areaRef}
            sx={{
              position: 'relative',
              height,
              bgcolor: 'transparent',
            }}
          >
            <LinearProgress
              className='mt-1'
              color='inherit'
              variant="determinate"
              value={progress}
              sx={{
                height: "5px",
                borderRadius: 0,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 0,
                  bgcolor: '#0F8B8D',
                },
              }}
            />
          </Box>
        </Tooltip>
        <Box
          sx={{
            marginTop:"10px",
            height: "30px",
            position: 'absolute',
            right: 60,
            top: '136%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#0F8B8D',
            color: 'white',
            padding: '0.5em',
            borderRadius: '4px',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '100%', // Position the arrow at the bottom of the tooltip box
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottom: '5px solid #0F8B8D', // Same as the background color of the box
            },
          }}
        >
          <span>Expert Scores</span>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LineProgress;
