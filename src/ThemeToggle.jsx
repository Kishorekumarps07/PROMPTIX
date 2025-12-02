import { useTheme } from './ThemeContext';

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle Dark Mode"
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(15deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
        >
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
}

export default ThemeToggle;
