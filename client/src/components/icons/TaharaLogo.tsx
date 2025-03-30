interface TaharaLogoProps {
  small?: boolean;
}

export default function TaharaLogo({ small = false }: TaharaLogoProps) {
  // Logo dimensions
  const size = small ? "w-7 h-7" : "w-8 h-8";
  
  return (
    <div className={`${size} bg-white rounded-full flex items-center justify-center`}>
      <span className="text-primary font-bold text-xl">T</span>
    </div>
  );
}
