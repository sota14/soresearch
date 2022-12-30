import { useRef, useEffect, FC } from "react";
import { FileBlockProps } from "../../types/types";
import YouTube from "react-youtube";

const VideoRenderer: FC<FileBlockProps> = ({ block }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    videoRef.current?.play();
  }, []);
  if (block.external) {
    if (block.external.url.match("youtube.com")) {
      const youtubeId = block.external.url.match(/\?v=([^&]+)/);
      return (
        // const youtubeId = properties.source[0][0].match(/\?v=([^&]+)/)
        <div className="youtube-player max-w-100">
          <YouTube videoId={youtubeId ? youtubeId[1] : block.external.url} />
        </div>
      );
    }
    return (
      <video controls muted ref={videoRef}>
        {/* width="400px" */}
        <source src={block.external.url} />
      </video>
    );
  } else if (block.file) {
    return (
      <video>
        {/* width="400px" */}
        <source src={block.file.url} />
      </video>
    );
  }
  return <></>;
};

export default VideoRenderer;
