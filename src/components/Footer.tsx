import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  return (
    <div>
      <br /><hr />
      <Box sx={{ mt: 5, mb: 10, textAlign: 'center' }}>
        <Typography variant="subtitle1">NETGIT - Your Favorite Company's GitHub at a Glance</Typography>
        <Typography variant="subtitle2"><i>Created by <a href="https://github.com/brianhdev" target="_blank" rel="noreferrer">Brian Hong</a>, 2021</i></Typography>
      </Box>
    </div>
  );
}

export default Footer;
