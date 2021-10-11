import React, { useEffect, useRef, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { DARKMODE_LOCAL } from '../utils/config';
import CssBaseline from '@mui/material/CssBaseline';


const useStyles = makeStyles({
  topScrollPaper: {
    alignItems: 'flex-start',
  },
  topPaperScrollBody: {
    verticalAlign: 'top',
  },
});

interface SearchOrgsProps {
  isOpen: boolean,
  handleClose: () => void
}

const SearchOrgs: React.FC<SearchOrgsProps> = (props: SearchOrgsProps) => {
  const classes = useStyles();
  const darkMode = useRef(false);

  useEffect(() => {
    darkMode.current = localStorage.getItem(DARKMODE_LOCAL) === 'dark';
    console.log(darkMode);
  }, [props.isOpen])

  // Search Query
  const [query, updateQuery] = useState<string>('');

  // Redirect to org
  const performSearch = () => {
    window.location.href = `/org/${query}`;
  }

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.handleClose()}
      classes={{
        scrollPaper: classes.topScrollPaper,
        paperScrollBody: classes.topPaperScrollBody,
      }}
    >
      <DialogTitle>Search for an Organization on GitHub</DialogTitle>
      <DialogContent>
        <CssBaseline />
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
