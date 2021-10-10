import React, { useEffect } from 'react';

interface RepoProps { }

const Repo: React.FC<RepoProps> = (props: RepoProps) => {

  useEffect(() => {
    // Fetch info
  }, []);

  return (
    <div>Repo</div>
  );
}

export default Repo;
