import React from 'react';

import Box from '@mui/system/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import StarIcon from '@mui/icons-material/Star';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CodeIcon from '@mui/icons-material/Code';
import { grey } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';

interface RepoCardProps {
  name: string,
  lang: string,
  desc: string,
  starCount: number,
  forkCount: number,
  dateCreated: string,
  openCommits: () => void,
}

const RepoCard: React.FC<RepoCardProps> = (props: RepoCardProps) => {
  const theme = useTheme();
  const screenLarge = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Grid item xs={12} md={6}>
      <Card elevation={0}>
        <CardActionArea sx={{ p: 1 }} onClick={() => props.openCommits()}>
          <CardContent sx={{ height: 250, maxHeight: 250 }}>
            {/* Title and Date*/}
            <Typography sx={{ fontSize: props.name.length > 15 ? 30 : 35 }}>{props.name}</Typography>
            <Typography sx={{ p:0, mb: 1, color: grey[500], fontSize: 13 }}><i>
              {new Date(props.dateCreated).toLocaleDateString()} - {new Date(props.dateCreated).toLocaleTimeString()}
            </i></Typography>

            {/* Badges */}
            <Tooltip title={`Starred ${props.starCount} times.`} placement="top">
              <Chip icon={<StarIcon />} label={props.starCount} color="primary" variant="outlined" sx={{ fontWeight: 'bold' }} />
            </Tooltip>&nbsp;
            <Tooltip title={`Forked ${props.forkCount} times.`} placement="top">
              <Chip icon={<CallSplitIcon />} label={props.forkCount} color="primary" variant="outlined" sx={{ fontWeight: 'bold' }} />
            </Tooltip>&nbsp;
            <Tooltip title={`Primary: ${props.lang}`} placement="top">
              <Chip icon={<CodeIcon />} label={props.lang} color="primary" variant="outlined" sx={{ fontWeight: 'bold' }} />
            </Tooltip><hr />

            {/* Description */}
            <Box sx={{ mt: 1 }}>
              <Typography style={{wordWrap: 'break-word'}}>
                {
                  (!props.desc) ?
                    'No description' :
                    // Truncate description depending on current screen size
                    screenLarge ? props.desc :
                      (props.desc && props.desc.length > 100) ?
                        props.desc.substr(0,100)+'...' : props.desc
                }
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default RepoCard;
