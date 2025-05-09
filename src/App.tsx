import { useState } from 'react';
import './App.css';
import SearchComponent from './components/search';
import RepoList from './components/RepoList';
import type { GitHubRepo } from './types/index'
import LoadingSpinner from './components/Spinner';

function App() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app">      
      <SearchComponent 
        onSearchResults={setRepos}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      
      {isLoading ? (
        
        <LoadingSpinner/>
      ) : (
        <RepoList repos={repos} isLoading={isLoading} />
      )}
    </div>
  );
}

export default App;