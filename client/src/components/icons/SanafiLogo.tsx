interface SanafiLogoProps {
  small?: boolean;
  className?: string;
  inverse?: boolean;
}

export default function SanafiLogo({ small = false, className = '', inverse = false }: SanafiLogoProps) {
  // Logo dimensions
  const size = small ? "w-7 h-7" : "w-8 h-8";
  
  return (
    <div className={`${size} ${className} ${inverse ? 'bg-primary' : 'bg-white'} rounded-full flex items-center justify-center`}>
      <span className={`${inverse ? 'text-white' : 'text-primary'} font-bold text-xl`}>S</span>
    </div>
  );
}
