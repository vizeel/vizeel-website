import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  priority?: boolean;
  preload?: "none" | "metadata" | "auto";
  onLoad?: () => void;
  onError?: () => void;
}

const LazyVideo = ({
  src,
  poster,
  width,
  height,
  className = "",
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  priority = false,
  preload = "metadata",
  onLoad,
  onError
}: LazyVideoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px"
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoadedData = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-muted rounded-lg",
        className
      )}
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : "16 / 9",
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined
      }}
    >
      {/* Poster image when video not loaded */}
      {poster && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {/* Loading indicator */}
      {!isLoaded && !hasError && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Video element */}
      {(isInView || priority) && !hasError && (
        <video
          ref={videoRef}
          width={width}
          height={height}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          preload={preload}
          playsInline
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoadedData={handleLoadedData}
          onError={handleError}
          onPlay={handlePlay}
          onPause={handlePause}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Custom play button overlay */}
      {!controls && isLoaded && !hasError && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors duration-200 group"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-200">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-black ml-0" />
            ) : (
              <Play className="w-8 h-8 text-black ml-1" />
            )}
          </div>
        </button>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 opacity-50">🎥</div>
            <p className="text-sm">Failed to load video</p>
          </div>
        </div>
      )}

      {/* Accessibility: Video description */}
      <div className="sr-only">
        Video content: {src.split('/').pop()?.split('.')[0] || 'Video'}
      </div>
    </div>
  );
};

export default LazyVideo;