import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useDispatch } from 'react-redux';
import { setThemeColor } from '../redux/themeSlice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';

const ThemeSelector = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'color-popover' : undefined;

  const handleChangeComplete = (color) => {
    dispatch(setThemeColor(color.hex));
  };

  return (
    <Box sx={{ p: 1 }}>
      <Button
        variant="outlined"
        onClick={handleClick}
        aria-describedby={id}
        sx={{ textTransform: 'none' }}
      >
        🎨 Pick Theme Color
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <SketchPicker onChangeComplete={handleChangeComplete} />
      </Popover>
    </Box>
  );
};

export default ThemeSelector;
