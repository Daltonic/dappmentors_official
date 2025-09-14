import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaStepBackward,
  FaStepForward,
  FaExpand,
  FaCog,
} from "react-icons/fa";

declare global {
  interface Window {
    YT: YTInterface;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTInterface {
  Player: typeof Player;
  PlayerState: typeof PlayerState;
}

enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

interface PlayerEvent {
  target: Player;
}

interface OnStateChangeEvent extends PlayerEvent {
  data: PlayerState;
}

interface OnPlaybackRateChangeEvent extends PlayerEvent {
  data: number;
}

interface OnErrorEvent extends PlayerEvent {
  data: number;
}

interface PlayerVars {
  rel?: 0 | 1;
  showinfo?: 0 | 1;
  modestbranding?: 0 | 1 | 2;
  controls?: 0 | 1;
  disablekb?: 0 | 1;
  iv_load_policy?: 1 | 3;
  fs?: 0 | 1;
  cc_load_policy?: 0 | 1;
  playsinline?: 0 | 1;
  origin?: string;
  widget_referrer?: string;
}

interface PlayerOptions {
  height?: string | number;
  width?: string | number;
  videoId?: string;
  playerVars?: PlayerVars;
  events?: {
    onReady?: (event: PlayerEvent) => void;
    onStateChange?: (event: OnStateChangeEvent) => void;
    onPlaybackRateChange?: (event: OnPlaybackRateChangeEvent) => void;
    onError?: (event: OnErrorEvent) => void;
  };
}

declare class Player {
  constructor(elementId: string | HTMLElement, options: PlayerOptions);
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  setVolume(volume: number): void;
  mute(): void;
  unMute(): void;
  setPlaybackRate(rate: number): void;
  getPlaybackRate(): number;
  getAvailableQualityLevels(): string[];
  getPlaybackQuality(): string;
  setPlaybackQuality(suggestedQuality: string): void;
  destroy(): void;
}

// TypeScript interface for props
interface CustomYouTubePlayerProps {
  videoUrl: string;
  onTimeUpdate?: (time: number) => void;
  onProgressUpdate?: (progress: number) => void;
  width?: string;
  height?: string;
}

const CustomYouTubePlayer: React.FC<CustomYouTubePlayerProps> = memo(
  ({
    videoUrl,
    onTimeUpdate,
    onProgressUpdate,
    width = "100%",
    height = "360px",
  }) => {
    // State management
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [showControls, setShowControls] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [availableQualities, setAvailableQualities] = useState<string[]>([]);
    const [currentQuality, setCurrentQuality] = useState("auto");
    const [showQualityMenu, setShowQualityMenu] = useState(false);

    // Refs
    const playerRef = useRef<Player | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeUpdateInterval = useRef<NodeJS.Timeout | null>(null);
    const qualityMenuRef = useRef<HTMLDivElement>(null);

    // Extract video ID from YouTube URL
    const extractVideoId = useCallback((url: string): string | null => {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/,
        /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
      return null;
    }, []);

    // Load YouTube IFrame API
    const loadYouTubeAPI = useCallback(() => {
      return new Promise<void>((resolve, reject) => {
        if (window.YT && window.YT.Player) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.onload = () => {
          window.onYouTubeIframeAPIReady = () => resolve();
        };
        script.onerror = () => reject(new Error("Failed to load YouTube API"));
        document.head.appendChild(script);
      });
    }, []);

    // Quality level display names
    const getQualityDisplayName = useCallback((quality: string): string => {
      const qualityMap: { [key: string]: string } = {
        hd2160: "2160p (4K)",
        hd1440: "1440p",
        hd1080: "1080p",
        hd720: "720p",
        large: "480p",
        medium: "360p",
        small: "240p",
        tiny: "144p",
        auto: "Auto",
      };
      return qualityMap[quality] || quality;
    }, []);

    // Initialize YouTube player
    const initializePlayer = useCallback(async () => {
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        setError("Invalid YouTube URL");
        return;
      }

      try {
        await loadYouTubeAPI();

        playerRef.current = new window.YT.Player("youtube-player", {
          height: "100%",
          width: "100%",
          videoId: videoId,
          playerVars: {
            rel: 0,
            showinfo: 0,
            modestbranding: 1,
            controls: 0,
            disablekb: 1,
            iv_load_policy: 3,
            fs: 0,
            cc_load_policy: 0,
            playsinline: 1,
            origin: window.location.origin,
            widget_referrer: window.location.origin,
          },
          events: {
            onReady: (event: PlayerEvent) => {
              setDuration(event.target.getDuration());
              setIsLoading(false);

              // Get available quality levels
              if (
                typeof event.target.getAvailableQualityLevels === "function"
              ) {
                const qualities = event.target.getAvailableQualityLevels();
                // Filter to ensure minimum 360p and add auto option
                const filteredQualities = [
                  "auto",
                  ...qualities.filter((q) =>
                    [
                      "hd2160",
                      "hd1440",
                      "hd1080",
                      "hd720",
                      "large",
                      "medium",
                    ].includes(q),
                  ),
                ];
                setAvailableQualities(filteredQualities);
              }

              // Get current quality
              if (typeof event.target.getPlaybackQuality === "function") {
                setCurrentQuality(event.target.getPlaybackQuality());
              }

              // Start time update interval
              let lastUpdateTime = 0;
              timeUpdateInterval.current = setInterval(() => {
                if (
                  playerRef.current &&
                  typeof playerRef.current.getCurrentTime === "function"
                ) {
                  const time = playerRef.current.getCurrentTime();
                  setCurrentTime(time);

                  // Throttle external callbacks to reduce frequency
                  const now = Date.now();
                  if (now - lastUpdateTime >= 1000) {
                    // Update external callbacks every 1 second
                    if (onTimeUpdate) {
                      try {
                        onTimeUpdate(time);
                      } catch (error) {
                        console.warn("Error in onTimeUpdate callback:", error);
                      }
                    }

                    if (duration > 0 && onProgressUpdate) {
                      try {
                        const progress = (time / duration) * 100;
                        onProgressUpdate(progress);
                      } catch (error) {
                        console.warn(
                          "Error in onProgressUpdate callback:",
                          error,
                        );
                      }
                    }
                    lastUpdateTime = now;
                  }
                }
              }, 100);
            },
            onStateChange: (event: OnStateChangeEvent) => {
              const state = event.data;
              setIsPlaying(state === window.YT.PlayerState.PLAYING);

              if (state === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
              }
            },
            onPlaybackRateChange: (event: OnPlaybackRateChangeEvent) => {
              setPlaybackRate(event.data);
            },
            onError: () => {
              setError("Error loading video");
            },
          },
        });
      } catch {
        setError("Failed to initialize player");
      }
    }, [
      videoUrl,
      extractVideoId,
      loadYouTubeAPI,
      onTimeUpdate,
      onProgressUpdate,
      duration,
    ]);

    // Control handlers
    const togglePlay = useCallback(() => {
      if (!playerRef.current) return;

      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }, [isPlaying]);

    const handleSeek = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!playerRef.current || !duration) return;

        const seekTime = (parseFloat(e.target.value) / 100) * duration;
        playerRef.current.seekTo(seekTime, true);
        setCurrentTime(seekTime);
      },
      [duration],
    );

    const skipTime = useCallback(
      (seconds: number) => {
        if (!playerRef.current) return;

        const newTime = Math.max(0, Math.min(currentTime + seconds, duration));
        playerRef.current.seekTo(newTime, true);
      },
      [currentTime, duration],
    );

    const handleVolumeChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!playerRef.current) return;

        const newVolume = parseFloat(e.target.value) / 100;
        setVolume(newVolume);
        playerRef.current.setVolume(newVolume * 100);

        if (newVolume === 0) {
          setIsMuted(true);
        } else if (isMuted) {
          setIsMuted(false);
        }
      },
      [isMuted],
    );

    const toggleMute = useCallback(() => {
      if (!playerRef.current) return;

      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }, [isMuted]);

    const handlePlaybackRateChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!playerRef.current) return;

        const rate = parseFloat(e.target.value);
        playerRef.current.setPlaybackRate(rate);
        setPlaybackRate(rate);
      },
      [],
    );

    const handleQualityChange = useCallback((quality: string) => {
      if (!playerRef.current) return;

      if (quality === "auto") {
        // Let YouTube handle auto quality
        playerRef.current.setPlaybackQuality("default");
      } else {
        playerRef.current.setPlaybackQuality(quality);
      }
      setCurrentQuality(quality);
      setShowQualityMenu(false);
    }, []);

    const toggleQualityMenu = useCallback(() => {
      setShowQualityMenu((prev) => !prev);
    }, []);

    const toggleFullscreen = useCallback(() => {
      if (!containerRef.current) return;

      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }, [isFullscreen]);

    const formatTime = useCallback((time: number): string => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }, []);

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
    }, []);

    // Effects
    useEffect(() => {
      initializePlayer();

      return () => {
        if (timeUpdateInterval.current) {
          clearInterval(timeUpdateInterval.current);
        }
        if (
          playerRef.current &&
          typeof playerRef.current.destroy === "function"
        ) {
          playerRef.current.destroy();
        }
      };
    }, [initializePlayer]);

    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () =>
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange,
        );
    }, []);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          qualityMenuRef.current &&
          !qualityMenuRef.current.contains(event.target as Node)
        ) {
          setShowQualityMenu(false);
        }
      };

      if (showQualityMenu) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showQualityMenu]);

    if (error) {
      return (
        <div
          className="flex items-center justify-center bg-black rounded-2xl text-white"
          style={{ width, height }}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">⚠️</div>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      );
    }

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <div
        ref={containerRef}
        className="relative bg-black rounded-2xl overflow-hidden group"
        style={{ width, height }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onContextMenu={handleContextMenu}
      >
        {/* YouTube Player */}
        <div id="youtube-player" className="w-full aspect-video" />

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#D2145A] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white text-sm">Loading video...</p>
            </div>
          </div>
        )}

        {/* Center Play/Pause Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={togglePlay}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <div className="ml-1">
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </div>
          </button>
        </div>

        {/* Controls Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4 md:p-6 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Progress Bar */}
          <div className="mb-2 sm:mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #D2145A 0%, #FF4081 ${progress}%, #4B5563 ${progress}%, #4B5563 100%)`,
              }}
              aria-label="Seek"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              {/* Skip Backward */}
              <button
                onClick={() => skipTime(-10)}
                className="text-white hover:text-[#FF4081] transition-colors p-2 rounded hover:bg-white/10"
                aria-label="Skip backward 10 seconds"
              >
                <FaStepBackward size={18} />
              </button>

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-[#FF4081] transition-colors p-2 rounded hover:bg-white/10"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>

              {/* Skip Forward */}
              <button
                onClick={() => skipTime(10)}
                className="text-white hover:text-[#FF4081] transition-colors p-2 rounded hover:bg-white/10"
                aria-label="Skip forward 10 seconds"
              >
                <FaStepForward size={18} />
              </button>

              {/* Volume Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-[#FF4081] transition-colors p-2 rounded hover:bg-white/10"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <FaVolumeMute size={18} />
                  ) : (
                    <FaVolumeUp size={18} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume * 100}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #D2145A 0%, #FF4081 ${isMuted ? 0 : volume * 100}%, #4B5563 ${isMuted ? 0 : volume * 100}%, #4B5563 100%)`,
                  }}
                  aria-label="Volume"
                />
              </div>

              {/* Time Display */}
              <div className="text-white text-xs sm:text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
              {/* Playback Speed */}
              <select
                value={playbackRate}
                onChange={handlePlaybackRateChange}
                className="bg-black/50 text-white text-xs sm:text-sm rounded px-2 py-1 border border-gray-600 outline-none hover:border-[#FF4081] transition-colors"
                aria-label="Playback speed"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>

              {/* Quality Selection */}
              <div className="relative" ref={qualityMenuRef}>
                <button
                  onClick={toggleQualityMenu}
                  className="flex items-center gap-1 text-white hover:text-[#FF4081] transition-colors p-2 rounded hover:bg-white/10"
                  aria-label="Video quality"
                >
                  <FaCog size={16} />
                  <span className="text-xs sm:text-sm">
                    {getQualityDisplayName(currentQuality)}
                  </span>
                </button>

                {/* Quality Menu */}
                {showQualityMenu && availableQualities.length > 0 && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg border border-gray-600 py-1 min-w-[120px] z-50">
                    {availableQualities.map((quality) => (
                      <button
                        key={quality}
                        onClick={() => handleQualityChange(quality)}
                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-white/10 transition-colors ${
                          currentQuality === quality
                            ? "text-[#FF4081] bg-white/5"
                            : "text-white"
                        }`}
                      >
                        {getQualityDisplayName(quality)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-[#FF4081] transition-colors p-2 rounded hover:bg-white/10"
                aria-label="Fullscreen"
              >
                <FaExpand size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CustomYouTubePlayer.displayName = "CustomYouTubePlayer";

export default CustomYouTubePlayer;
