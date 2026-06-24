type FramedImageProps = {
    src: string;
    alt: string;
    className?: string;
    gradient?: string;
    overlay?: boolean;
  };
  
  export function FramedImage({
    src,
    alt,
    className = "",
    gradient = "from-navy/25 via-transparent to-transparent",
    overlay = true,
  }: FramedImageProps) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="pointer-events-none absolute inset-0 z-20 border border-gold/30" />
        <span className="pointer-events-none absolute left-3 top-3 z-20 h-7 w-7 border-l border-t border-gold/70" aria-hidden="true" />
        <span className="pointer-events-none absolute right-3 top-3 z-20 h-7 w-7 border-r border-t border-gold/70" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-3 left-3 z-20 h-7 w-7 border-b border-l border-gold/70" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-3 right-3 z-20 h-7 w-7 border-b border-r border-gold/70" aria-hidden="true" />
  
        {overlay ? (
          <div
            className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-br ${gradient}`}
            aria-hidden="true"
          />
        ) : null}
  
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }
  