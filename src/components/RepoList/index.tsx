import { useState } from 'react';
import type { RepoListProps } from '../../types';
import './style.css';
import AuthorModal from '../AuthorModal';
import LoadingSpinner from '../Spinner';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const UnlockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
);


const RepoList = ({ repos }: RepoListProps) => {
    const [selectedAuthor, setSelectedAuthor] = useState<{
        login: string;
        avatar_url: string;
        html_url: string;
        id: number;
    } | null>(null);

    if (repos.length === 0) {
        return <div className="no-results">Nenhum repositório encontrado</div>;
    }

    return (
        <div className="repo-list">
            {repos.map((repo) => (
                <div key={repo.id} className="repo-card">
                    <div className="card-header-image"></div>

                    <div className="repo-header">
                        <span className="repo-visibility">
                            {repo.private ? <LockIcon /> : <UnlockIcon />}
                        </span>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-name-link">
                            <h3 className="repo-name">{repo.name}</h3>
                        </a>
                    </div>

                    <p className="repo-description" title={repo.description!}>
                        {repo.description || 'Sem descrição'}
                    </p>

                    <div className="repo-stars">
                        {Array.from({ length: Math.min(repo.stargazers_count, 5) }).map((_, index) => (
                            <span key={index} className="star">⭐</span>
                        ))}
                    </div>

                    <div className="repo-author" onClick={() => setSelectedAuthor({
                        login: repo.owner?.login || 'Anônimo',
                        avatar_url: repo.owner?.avatar_url || '',
                        html_url: `https://github.com/${repo.owner?.login}`,
                        id: repo.owner?.id || 0
                    })}>
                        <img
                            src={repo.owner?.avatar_url}
                            alt={repo.owner?.login || 'Autor'}
                            className="author-avatar"
                        />
                        <div className="author-details">
                            <span className="author-name">{repo.owner?.login || 'Autor'}</span>
                            <span className="repo-date">
                                {new Date(repo.created_at).toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {selectedAuthor && (
                <AuthorModal
                    author={selectedAuthor}
                    onClose={() => setSelectedAuthor(null)}
                />
            )}
        </div>
    );
};

export default RepoList;