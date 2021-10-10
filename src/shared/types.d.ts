// A Given Org's Types
type Org = {
  name: string,
  img: string,
  url: string
};

// A Given Repository's Types
type Repo = {
  name: string,
  lang: string,
  desc: string,
  starCount: number,
  forkCount: number,
  dateCreated: string
}

// fetchOrgAndRepos Response Type
type OrgAndRepos = {
  orgInfo: Org,
  repoList: Repo[],
  error: NetgitError
}

// Commit Type
type Commit = {
  title: string,
  username: string,
  userImg: string,
  hash: string,
  dateCreated: Date,
  url: string
}

// fetchCommitData Response Type
type CommitDataResponse = {
  commitData: Commit[],
  error: NetgitError
}

// Error Type
type NetgitError = {
  errorCode: any,
  errorName: any,
  errorMsg: any
}
