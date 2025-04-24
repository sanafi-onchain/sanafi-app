interface SanafiLogoProps {
  small?: boolean;
  className?: string;
}

export default function SanafiLogo({ small = false, className = '' }: SanafiLogoProps) {
  // Logo dimensions
  const size = small ? "w-7 h-7" : "w-8 h-8";
  
  return (
    <div className={`${size} ${className} bg-white rounded-full flex items-center justify-center`}>
      <span className="text-primary font-bold text-xl">S</span>
    </div>
  );
}
