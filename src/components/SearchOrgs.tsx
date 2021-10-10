import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


interface SearchOrgsProps {
  isOpen: boolean,
  handleClose: () => void
}

const SearchOrgs: React.FC<SearchOrgsProps> = (props: SearchOrgsProps) => {
  // Search Query
  const [query, updateQuery] = useState<string>('');

  const performSearch = () => {
    window.location.href = `/org/${query}`;
  }

  return (
    <Dialog open={props.isOpen} onClose={() => props.handleClose()}>
      <DialogTitle>Search for an Organization on GitHub</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Organization Name"
          type="text"
          fullWidth
          variant="outlined"
          value={query}
          onChange={(e) => updateQuery(e.target.value.toLowerCase())}
          onKeyUp={(event) => {
            if (event.key === 'Enter')
              performSearch();
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleClose()}>Cancel</Button>
        <Button disableElevation variant="contained" onClick={() => performSearch()}>Search</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SearchOrgs;
