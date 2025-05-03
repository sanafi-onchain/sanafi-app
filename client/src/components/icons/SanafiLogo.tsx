interface SanafiLogoProps {
  small?: boolean;
  className?: string;
  variant?: 'default' | 'inverse' | 'dark';
}

export default function SanafiLogo({ 
  small = false, 
  className = '', 
  variant = 'default' 
}: SanafiLogoProps) {
  // Logo dimensions based on new brand styling
  const size = small ? "w-8 h-8" : "w-12 h-12";
  
  // Determine background and text colors based on variant
  let bgColor = '';
  let textColor = '';
  let shadowStyle = '';
  
  switch (variant) {
    case 'default': // Default: Deep green background with cream text
      bgColor = 'bg-[#1b4d3e]';
      textColor = 'text-[#e9e1ca]';
      shadowStyle = 'shadow-md';
      break;
    case 'inverse': // Inverse: Cream background with deep green text
      bgColor = 'bg-[#e9e1ca]';
      textColor = 'text-[#1b4d3e]';
      shadowStyle = 'shadow-sm';
      break;
    case 'dark': // Dark mode: Bright cream on dark green for better contrast
      bgColor = 'bg-[#1b4d3e]';
      textColor = 'text-[#f5f0e5]';
      shadowStyle = 'shadow-lg';
      break;
  }
  
  return (
    <div 
      className={`${size} ${className} ${bgColor} ${shadowStyle} rounded-full flex items-center justify-center transition-transform hover:scale-105`}
      style={{ boxShadow: variant === 'default' ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '' }}
    >
      <span className={`${textColor} font-bold ${small ? 'text-xl' : 'text-2xl'} font-[Poppins]`}>S</span>
    </div>
  );
}
