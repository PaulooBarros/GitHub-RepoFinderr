import { useState, useEffect } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';
import './style.css';
import type { GitHubRepo } from '../../types';

interface SearchComponentProps {
  onSearchResults: (results: GitHubRepo[]) => void;
  placeholder?: string;
  className?: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SearchComponent = ({
  onSearchResults,
  placeholder = 'Buscar repositórios no GitHub...',
  className = '',
  isLoading,
  setIsLoading,
}: SearchComponentProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [initialRepos, setInitialRepos] = useState<GitHubRepo[]>([]);

  // Carrega repositórios iniciais ao montar o componente
  useEffect(() => {
    fetchInitialRepos();
  }, []);

  const fetchInitialRepos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.github.com/users/octocat/repos');
      const data = await response.json();
      setInitialRepos(data);
      onSearchResults(data); // Exibe os repositórios iniciais
      setSuggestions(data.slice(0, 0).map((repo: GitHubRepo) => repo.name));
    } catch (error) {
      console.error('Error fetching initial repos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchRepositories = async (query: string) => {
    if (!query.trim()) {
      // Se a busca estiver vazia, mostra os repositórios iniciais
      onSearchResults(initialRepos);
      setSuggestions(initialRepos.slice(0, 0).map(repo => repo.name));
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc`
      );
      
      if (!response.ok) throw new Error('Erro na busca');
      
      const data = await response.json();
      onSearchResults(data.items);
      setSuggestions(data.items.slice(0, 0).map(repo => repo.full_name));
    } catch (error) {
      console.error('Erro ao buscar:', error);
      onSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    searchRepositories(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    // Retorna aos repositórios iniciais quando limpa a busca
    onSearchResults(initialRepos);
    setSuggestions(initialRepos.slice(0, 0).map(repo => repo.name));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Se o campo estiver vazio, mostra os repositórios iniciais
    if (!value.trim()) {
      onSearchResults(initialRepos);
      setSuggestions(initialRepos.slice(0, 0).map(repo => repo.name));
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    searchRepositories(suggestion);
  };

  return (
    <div className={`search-container ${className}`}>
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Buscar repositórios no GitHub"
        />
        
        {searchQuery && (
          <button
            className="clear-button"
            onClick={handleClear}
            aria-label="Limpar busca"
          >
            <svg className="clear-icon" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
        
        <button 
          className="search-button"
          onClick={handleSearch}
          disabled={isLoading}
          aria-label="Pesquisar"
        >
          {isLoading ? (
            <div className="spinner" />
          ) : (
            <svg className="search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          )}
        </button>
      </div>

      {suggestions.length > 0 && !isLoading && (
        <ul className="suggestions-dropdown" role="listbox">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
              role="option"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;