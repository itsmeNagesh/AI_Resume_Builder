"use client";

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';  // Import PropTypes
import './lin.css';

 const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          height: '30px',
          fontSize: '1em',
          color: 'white',
          backgroundColor: '#0F8B8D',
        },
        arrow: {
          color: '#0F8B8D',
        },
      },
    },
  },
});

const LineProgress = ({ progress, height, width }) => {  // Destructure props here
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const areaRef = useRef(null);

  const updateTooltipPosition = () => {
    if (areaRef.current) {
      const progressWidth = areaRef.current.offsetWidth;
      const progressX = areaRef.current.getBoundingClientRect().x;
      const offsetX = progressWidth * (progress / 100);
      setTooltipPosition({ x: progressX + offsetX, y: areaRef.current.getBoundingClientRect().y });
    }
  };

  useEffect(() => {
    updateTooltipPosition();
    window.addEventListener('resize', updateTooltipPosition);
    window.addEventListener('scroll', updateTooltipPosition);

    return () => {
      window.removeEventListener('resize', updateTooltipPosition);
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
            anchorEl: {
              getBoundingClientRect: () => new DOMRect(tooltipPosition.x, tooltipPosition.y, 0, 0),
            },
          }}
          open
        >
          <Box
            ref={areaRef}
            sx={{
              position: 'relative',
              height: `${height}px`,  // Ensure height is applied as a string with 'px'
              bgcolor: 'transparent',
            }}
          >
            <LinearProgress
              className='mt-1'
              color='inherit'
              variant="determinate"
              value={progress}
              sx={{
                height: `${height}px`,
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
            marginTop: '10px',
            height: '30px',
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
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottom: '5px solid #0F8B8D',
            },
          }}
        >
          <span>Expert Scores</span>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

LineProgress.propTypes = {
  progress: PropTypes.number.isRequired,  // Ensure progress is a number and required
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,  // Ensure height is either string or number and required
  width: PropTypes.string.isRequired,  // Ensure width is a string and required
};

export default LineProgress;
