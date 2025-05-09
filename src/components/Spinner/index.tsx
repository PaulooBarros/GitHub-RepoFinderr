// components/LoadingSpinner.tsx
import './style.css';

const LoadingSpinner = () => (
    <svg className="spinner" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
  );

export default LoadingSpinner;