import styled from 'styled-components';

const colors = {
  primary: '#4285F4',       // Azul suave (inspirado no Google)
  primaryLight: '#E8F0FE',  // Azul muito claro para hover
  primaryDark: '#3367D6',   // Azul mais escuro para active
  
  text: {
    primary: '#202124',     // Preto suave
    secondary: '#5F6368',   // Cinza para texto secundário
    contrast: '#FFFFFF',    // Branco para contraste
  },
  
  background: {
    main: '#FFFFFF',        // Branco puro
    secondary: '#F8F9FA',   // Cinza muito claro para fundos
    hover: '#F1F3F4',       // Cinza claro para hover
  },
  
  border: {
    light: '#DADCE0',       // Cinza claro para bordas
    medium: '#BDC1C6',      // Cinza médio
  },
  
  status: {
    success: '#34A853',     // Verde suave
    error: '#EA4335',       // Vermelho suave
    warning: '#FBBC05',     // Amarelo suave
  },
  
  shadow: '0 1px 6px rgba(32, 33, 36, 0.12)', // Sombra sutil
};

// Variáveis de espaçamento
const spacing = {
  small: '8px',
  medium: '16px',
  large: '24px',
  xlarge: '32px',
};

// Variáveis de borda
const borderRadius = {
  small: '4px',
  medium: '8px',
  large: '24px', // Para inputs arredondados
  full: '50px',  // Para elementos completamente arredondados
};

// Componentes estilizados
export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.full};
  background-color: ${colors.background.main};
  box-shadow: ${colors.shadow};
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(32, 33, 36, 0.16);
  }

  &:focus-within {
    border-color: ${colors.primary};
    box-shadow: 0 1px 6px rgba(66, 133, 244, 0.28);
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: ${spacing.medium} ${spacing.large};
  border: none;
  outline: none;
  font-size: 16px;
  color: ${colors.text.primary};
  background: transparent;

  &::placeholder {
    color: ${colors.text.secondary};
    opacity: 0.8;
  }
`;

export const SearchButton = styled.button`
  background: transparent;
  border: none;
  padding: ${spacing.small} ${spacing.medium};
  margin-right: ${spacing.small};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text.secondary};
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.primary};
    background: ${colors.primaryLight};
    border-radius: ${borderRadius.medium};
  }

  &:active {
    color: ${colors.primaryDark};
  }
`;

export const SearchIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor; /* Herda a cor do botão */
`;

export const SuggestionsDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${colors.background.main};
  border: 1px solid ${colors.border.light};
  border-radius: ${borderRadius.medium};
  box-shadow: 0 4px 12px rgba(32, 33, 36, 0.12);
  margin-top: ${spacing.small};
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  padding: ${spacing.small} 0;
`;

export const SuggestionItem = styled.li`
  padding: ${spacing.small} ${spacing.large};
  cursor: pointer;
  font-size: 14px;
  color: ${colors.text.primary};
  transition: background-color 0.1s ease;

  &:hover {
    background-color: ${colors.background.hover};
  }

  &.active {
    background-color: ${colors.primaryLight};
    color: ${colors.primary};
  }
`;

export const ClearButton = styled.button`
  background: none;
  border: none;
  padding: ${spacing.small};
  margin-left: auto;
  cursor: pointer;
  color: ${colors.text.secondary};
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.text.primary};
  }
`;