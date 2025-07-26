import React from 'react';

import { AddOutlined } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';

type Props = {
  onClick: () => void;
};
export default function PlaceholderButton({ onClick }: Props) {
  return (
    <ButtonBase
      onClick={(ev) => {
        ev.stopPropagation();
        onClick();
      }}
      sx={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: 48,
        width: '100%',
        bgcolor: 'rgba(0,0,0, 0.08)', // slightly darker for visibility
      }}
    >
      <AddOutlined
        sx={{
          p: 0.12,
          bgcolor: 'primary.main', // use theme primary for better contrast
          borderRadius: 24,
          color: 'background.paper', // ensures icon is visible on light bg
        }}
        fontSize="small"
      />
    </ButtonBase>
  );
}
