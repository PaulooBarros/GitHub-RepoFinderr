import type { AuthorModalProps } from '../../types';
import './style.css';




const AuthorModal = ({ author, onClose }: AuthorModalProps) => (
    <div className="modal-overlay">
        <div className="modal-content">
            <button className="modal-close" onClick={onClose}>×</button>
            <img src={author.avatar_url} alt={author.login} className="modal-avatar" />
            <h3>{author.login}</h3>
            <div className="modal-info">
                <p><strong>ID:</strong> {author.id}</p>
                <p>
                    <strong>Perfil:</strong>
                    <a href={author.html_url} target="_blank" rel="noopener noreferrer">
                        {author.html_url}
                    </a>
                </p>
            </div>
        </div>
    </div>
);

export default AuthorModal;