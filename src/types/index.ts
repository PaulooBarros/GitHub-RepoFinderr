export interface SearchResult {
    id: string;
    title: string;
  }
  
  export interface SearchComponentProps {
    initialQuery?: string;
    onSearch: (query: string) => void;
    placeholder?: string;
    className?: string;
    showClearButton?: boolean;
    suggestions?: SearchResult[];
    isLoading?: boolean;
    maxSuggestions?: number;
  }

  export interface GitHubOwner {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
  }
  
  export interface GitHubLicense {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
  }
  

  export interface GitHubSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubRepo[];
  }

  export interface GitHubOwner {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;
  }
  
  export interface GitHubLicense {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
  }
  
  export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner: GitHubOwner;
    html_url: string;
    description: string | null ;
    fork: boolean;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    forks_count: number;
    open_issues_count: number;
    license: GitHubLicense | null;
    topics: string[];
    created_at: string;
    updated_at: string;
    pushed_at: string;
    default_branch: string;
  }
  
  export interface GitHubSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubRepo[];
  }

  export interface AuthorModalProps {
    author: {
        login: string;
        avatar_url: string;
        html_url: string;
        id: number;
    };
    onClose: () => void;
}
export interface RepoListProps {
    repos: GitHubRepo[];
    isLoading: boolean; // Adicione esta prop

}
