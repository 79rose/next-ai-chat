'use client';
import useTheme from '@/hooks/useTheme';
const Button: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-primary bg-secondary rounded-xl border-2 border-solid px-2"
    >
      切换主题
    </button>
  );
};

export default Button;
