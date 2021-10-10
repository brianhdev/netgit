/**
 * Various API helper methods that help to
 * - fetch and cache various API requests in session data
 * - properly format return data to be easily parsed
 *
 * Unfortunately due to time restrictions, I wasn't able to improve upon this further.
 * Future improvements might be:
 * - auto-cleaning old, cached requests to prevent sessionStorage from being filled up with so many requests
 * - storing already-formatted data instead of the raw response data, lessens the size of each storage key-value pair
 */

import axios, { AxiosResponse, AxiosError } from 'axios';
import { ORGNAME_PARAM, REPONAME_PARAM, REPO_ENDPOINT, COMMITS_ENDPOINT } from './config';

/**
 * Make API call to endpoint, cache return data by using endpoint as the key in sessionStorage
 * Search sessionstorage for endpoint existence. If exists, use that value instead of making a new request.
 * @param endpoint API endpoint of which to get data from
 * @returns response body object
 */
const rawFetch = async (endpoint: string) => {
  let responseBody:any = {};

  // Check if endpoint data is in storage
  const cachedResponse = sessionStorage.getItem(endpoint);
  if (cachedResponse) {
    // Load cached response if exists
    responseBody = JSON.parse(cachedResponse);
  } else {
    // Make request if doesn't exist
    await axios.get(endpoint)
      .then((response: AxiosResponse) => {
        responseBody = response.data
      })
      .catch((error: AxiosError) => {
        responseBody = {
          errorCode: error.code,
          errorName: error.name,
          errorMsg: error.message
        }
      });
    // Cache response for later
    sessionStorage.setItem(endpoint, JSON.stringify(responseBody));
  }

  return responseBody;
}

/**
 * Makes request to Github API to fetch Org Info and Info for all its Repositories
 * @param orgname name of organization to get data from
 * @returns {
 *  orgInfo: Org,
 *  repoList: List,
 *  error: {}
 * }
 */
export const fetchOrgAndRepos = async (orgname: string) => {
  const responseBody = await rawFetch(REPO_ENDPOINT.replace(ORGNAME_PARAM, orgname));
  let returnObject = {
    orgInfo: {} as Org,
    repoList: [],
    error: responseBody.errorCode ? responseBody : {}
  } as OrgAndRepos;

  try {
    // Extract data
    for (let repo of responseBody) {
      // Add Organization Info during first iteration
      if (returnObject.orgInfo && returnObject.orgInfo.name !== repo.owner.login) {
        returnObject.orgInfo = {
          name: repo.owner.login,
          img: repo.owner.avatar_url,
          url: repo.owner.html_url
        }
      }
      // Add Repository Data to Repo List
      returnObject.repoList.push({
        name: repo.name,
        lang: repo.language,
        desc: repo.description,
        starCount: repo.stargazers_count,
        forkCount: repo.forks,
        dateCreated: repo.created_at
      });
    }

    // Sort data by starcount
    returnObject.repoList.sort((a, b) => {
      return b.starCount - a.starCount
    });

  } catch(error: any) {
    returnObject.error = {
      errorCode: error.code || 400,
      errorName: error.message,
      errorMsg: error.stack
    }
  }

  return returnObject;
}

/**
 * Makes request to Github API to fetch a given organization's repository's commits
 * @param orgname string, name of organization
 * @param reponame string, name of repository to get commits from
 * @returns CommitDataResponse object
 */
export const fetchCommitData = async (orgname: string, reponame: string) => {
  const responseBody = await rawFetch(COMMITS_ENDPOINT.replace(ORGNAME_PARAM, orgname).replace(REPONAME_PARAM, reponame));
  let returnObject = {
    commitData: [],
    error: responseBody.errorCode ? responseBody : {}
  } as CommitDataResponse;

  // Format Commit Data
  try {
    for (let c of responseBody) {
      returnObject.commitData.push({
        title: c.commit.message,
        username: c.author && c.author.login,
        userImg: c.author && c.author.avatar_url,
        hash: c.sha,
        dateCreated: c.commit.author.date,
        url: c.html_url
      });
    }
  } catch(error: any) {
    returnObject.error = {
      errorCode: error.code || 400,
      errorName: error.message,
      errorMsg: error.stack
    }
  }

  return returnObject;
}