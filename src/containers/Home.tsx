import React, { useState, useEffect} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AxiosError } from 'axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import SearchIcon from '@mui/icons-material/Search';

import CommitDrawer from './CommitDrawer';
import RepoCard from '../components/RepoCard';
import { fetchCommitData, fetchOrgAndRepos } from '../utils/netgitapi';
import SearchOrgs from '../components/SearchOrgs';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import OrgNotFound from '../components/OrgNotFound';


interface HomeProps {
  orgname: string
}

const Home: React.FC<RouteComponentProps<HomeProps>> = (props: RouteComponentProps<HomeProps>) => {

  // General State
  const [loading, updateLoading] = useState(true);
  const [searchFailed, setSearchFailed] = useState(false);

  // Current Organization and Repositories
  const [org, updateOrg] = useState<Org>({} as Org);
  const [repos, updateRepos] = useState<Array<Repo>>([]);
  const [currentRepo, updateCurrentRepo] = useState('');

  // Drawer State
  const [showCommits, toggleCommits] = useState(false);
  const [commitData, updateCommitData] = useState<Commit[]>({} as Commit[]);

  // Search State
  const [searchWindowOpen, toggleSearchWindow] = useState(false);

  useEffect(() => {

    // Fetch Org and Repository Data From Github API
    fetchOrgAndRepos(props.match.params.orgname)
      .then((response: OrgAndRepos) => {
        if (!response.error.errorCode) {
          updateLoading(false);
          updateOrg(response.orgInfo);
          updateRepos(response.repoList);
        } else {
          console.error(response.error);
          throw new Error();
        }
      }).catch((error: AxiosError) => {
        updateLoading(false);
        setSearchFailed(true);
        console.error(error.stack);
      });

  }, [props.match.params.orgname]);

  // Fetch Commit Data
  const getCommitData = (reponame: string) => {
    if (!showCommits) {
      fetchCommitData(org.name, reponame)
        .then((response: CommitDataResponse) => {
          if (!response.error.errorCode) {
            updateCurrentRepo(reponame);
            updateCommitData(response.commitData);
            toggleCommits(true);
          } else {
            console.error(response.error);
            throw new Error();
          }
        })
        .catch((error: AxiosError) => {
          console.error(error.stack);
        });
    }
  }

  return (

    <Box sx={{ flexGrow: 1, m: 2 }}>

      {/* Search FAB */}
      <Tooltip title="Search For An Organization" placement="left-start">
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            zIndex: 10,
            position: 'fixed',
            bottom: 48,
            right: 32
          }}
          onClick={() => toggleSearchWindow(true)}
        >
          <SearchIcon />
        </Fab>
      </Tooltip>

      {/* Search Window */}
      <SearchOrgs
        isOpen={searchWindowOpen}
        handleClose={() => toggleSearchWindow(false)}
      />

      {
        ((searchFailed || repos.length < 1) && !loading) ?
        ( // SEARCH FAILED
          <OrgNotFound
            isEmpty={!searchFailed && repos.length === 0}
            orgname={props.match.params.orgname}
          />
        ) :
        ( // SEARCH SUCCESS
          <Box>
            <CommitDrawer
              isOpen={showCommits}
              reponame={currentRepo}
              orgname={props.match.params.orgname}
              closeCommits={() => toggleCommits(false)}
              commits={commitData}
            />
            <Grid container spacing={1}>
              <Grid item xs={5} sm={2}>
                {
                  org.img ?
                  <img
                    alt={org.name}
                    src={org.img}
                    width={100}
                    height={100}
                    style={{
                      borderRadius: '10px',
                      float: 'right',
                      marginRight: '20px'
                    }}
                  /> :
                  <Skeleton variant="rectangular" sx={{height:100}}/>
                }
              </Grid>
              <Grid item xs={7} sm={10}>
                <Typography variant="h3">{org.name || <Skeleton sx={{width: 500}}/>}</Typography>
                <Button onClick={() => window.open(org.url, '_blank')} variant="text">
                  <Typography>{ org.url ? 'view github' : <Skeleton sx={{width: 300, height:30}} />}</Typography>
                </Button>
              </Grid>
            </Grid><hr/>

            <Grid container spacing={2}>
              { repos.map((repo: any) => (
                <RepoCard
                  key={'key-'+repo.name}
                  name={repo.name}
                  lang={repo.lang}
                  desc={repo.desc}
                  starCount={repo.starCount}
                  forkCount={repo.forkCount}
                  dateCreated={repo.dateCreated}
                  openCommits={() => getCommitData(repo.name)}
                />
              ))}
            </Grid>
          </Box>
        )
      }
    </Box>
  );
}

export default Home;
