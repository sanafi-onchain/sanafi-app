interface SanafiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'default' | 'inverse' | 'dark' | 'full';
}

export default function SanafiLogo({ 
  size = 'md', 
  className = '', 
  variant = 'default' 
}: SanafiLogoProps) {
  // Logo dimensions
  let sizeClass = '';
  switch (size) {
    case 'sm': sizeClass = "w-8 h-8"; break;
    case 'md': sizeClass = "w-12 h-12"; break;
    case 'lg': sizeClass = "w-16 h-16"; break;
    case 'xl': sizeClass = "w-24 h-24"; break;
    default: sizeClass = "w-12 h-12";
  }
  
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
    case 'dark': // Dark mode: white circle with green text (for dark backgrounds)
      bgColor = 'bg-white';
      textColor = 'text-primary';
      break;
  }

  // For full logo with text, return logo + text
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className={`${sizeClass} bg-primary rounded-full flex items-center justify-center shadow-sm`}>
          <div className="relative flex items-center justify-center">
            <span className="text-white font-bold text-3xl">S</span>
            <div className="absolute -right-1 -top-1 text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C12.5523 3 13 3.44772 13 4V5.15152C16.9463 5.6208 20 9.02049 20 13.0952C20 17.5295 16.4183 21.1111 12 21.1111C7.58172 21.1111 4 17.5295 4 13.0952C4 10.5678 5.21236 8.32273 7.09775 6.84066L6.70711 6.44721C6.31658 6.05669 6.31658 5.42352 6.70711 5.033C7.09763 4.64248 7.7308 4.64248 8.12132 5.033L9.52513 6.44721C9.9533 6.16318 10.4602 5.99595 11 5.96061V4C11 3.44772 11.4477 3 12 3Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-primary">Sanafi</h2>
          <p className="text-xs text-muted-foreground">Halal Onchain Banking</p>
        </div>
      </div>
    );
  }
  
  // For the regular icon-only version
  return (
    <div className={`${sizeClass} ${className} ${bgColor} rounded-full flex items-center justify-center shadow-sm`}>
      <div className="relative flex items-center justify-center">
        <span className={`${textColor} font-bold text-2xl`}>S</span>
        <div className={`absolute -right-1 -top-1 ${variant === 'inverse' ? 'text-white' : 'text-primary'}`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3C12.5523 3 13 3.44772 13 4V5.15152C16.9463 5.6208 20 9.02049 20 13.0952C20 17.5295 16.4183 21.1111 12 21.1111C7.58172 21.1111 4 17.5295 4 13.0952C4 10.5678 5.21236 8.32273 7.09775 6.84066L6.70711 6.44721C6.31658 6.05669 6.31658 5.42352 6.70711 5.033C7.09763 4.64248 7.7308 4.64248 8.12132 5.033L9.52513 6.44721C9.9533 6.16318 10.4602 5.99595 11 5.96061V4C11 3.44772 11.4477 3 12 3Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
