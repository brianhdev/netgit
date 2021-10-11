import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import ButtonGroup from '@mui/material/ButtonGroup';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


interface CommitDrawerProps {
  isOpen: boolean,
  closeCommits: () => void,
  orgname: string,
  reponame: string,
  commits: Array<Commit>
}

const CommitDrawer: React.FC<CommitDrawerProps> = (props: CommitDrawerProps) => {
  const theme = useTheme();
  const screenLarge = useMediaQuery(theme.breakpoints.up('sm'));

  // Styles
  const titleSize = [22,15];
  const subSize = [15,11];

  return (
    <Drawer
      anchor='right'
      open={props.isOpen}
      onClose={() => props.closeCommits()}
    >
      <List>
        <ListSubheader
          sx={{ px: 2 }}
        >
          <ButtonGroup>
            <Button
              sx={{flexGrow: 1}}
              variant="contained"
              endIcon={<CloseIcon />}
              onClick={() => props.closeCommits()}
              disableElevation
            >
              Close
            </Button>
            <Button
              sx={{flexGrow: 1}}
              variant="outlined"
              color="inherit"
              endIcon={<GitHubIcon />}
              onClick={() => window.open(`https://github.com/${props.orgname}/${props.reponame}`, '_blank')}
            >
              View Github
            </Button>
          </ButtonGroup>
          <Typography variant="h5">
            {props.reponame} - Recent Commits
          </Typography>
          <hr />
        </ListSubheader>
        {
          (props.commits.length > 0) ? props.commits.map((commit: Commit) => (
            <ListItem
              alignItems="flex-start"
              sx={{ px: 0, py: 1}}
              key={commit.hash}
            >
              <ListItemButton
                onClick={() => window.open(commit.url, '_blank')}
              >
                <ListItemAvatar>
                  <Avatar alt={commit.username} src={commit.userImg} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: 'inline',
                          fontSize: titleSize[screenLarge ? 0 : 1]
                        }}
                        component="span"
                        variant="h6"
                        color="text.primary"
                      >
                        { commit.title.split('\n')[0] }
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{
                          display: 'inline',
                          fontSize: subSize[screenLarge ? 0 : 1]
                        }}
                        component="span"
                        variant="subtitle2"
                        color="text.primary"
                      >
                        {commit.username ? (<b>by {commit.username}&nbsp;</b> ) : 'Created '}
                        at&nbsp;
                        {new Date(commit.dateCreated).toLocaleDateString()}, {new Date(commit.dateCreated).toLocaleTimeString()}
                      </Typography><br/>
                      <Typography
                        sx={{
                          display: 'inline',
                          fontSize: subSize[screenLarge ? 0 : 1]
                        }}
                        variant="body2"
                      ><i>{commit.hash}</i>
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItemButton>
            </ListItem>
          )) : 'No results'
        }
      </List>
    </Drawer>
  );
}

export default CommitDrawer;