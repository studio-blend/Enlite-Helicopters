/**
 * Simple video utility to handle different video sources
 */
export const getVideoSource = (url: string) => {
  if (!url) return null;

  // YouTube
  const ytRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const ytMatch = url.match(ytRegex);
  if (ytMatch && ytMatch[2].length === 11) {
    return {
      type: "youtube",
      id: ytMatch[2],
      embedUrl: `https://www.youtube.com/embed/${ytMatch[2]}?autoplay=1`,
    };
  }

  // Vimeo
  const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: "vimeo",
      id: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  // Direct file (mp4, webm, etc)
  return {
    type: "direct",
    url: url,
  };
};
