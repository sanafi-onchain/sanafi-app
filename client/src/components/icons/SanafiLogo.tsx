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
  // Logo dimensions
  const size = small ? "w-7 h-7" : "w-8 h-8";
  
  // Determine background and text colors based on variant
  let bgColor = '';
  let textColor = '';
  
  switch (variant) {
    case 'default': // Default: white background, green text (for light backgrounds)
      bgColor = 'bg-white';
      textColor = 'text-primary';
      break;
    case 'inverse': // Inverse: green background, white text (for white backgrounds)
      bgColor = 'bg-primary';
      textColor = 'text-white';
      break;
    case 'dark': // Dark mode: white background, green text (for dark backgrounds)
      bgColor = 'bg-white';
      textColor = 'text-primary';
      break;
  }
  
  return (
    <div className={`${size} ${className} ${bgColor} rounded-full flex items-center justify-center`}>
      <span className={`${textColor} font-bold text-xl`}>S</span>
    </div>
  );
}
