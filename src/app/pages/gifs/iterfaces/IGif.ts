export interface IGif {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitlyGifUrl: string;
  bitlyUrl: string;
  embedUrl: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  contentUrl: string;
  sourceTld: string;
  sourcePostUrl: string;
  isSticker: number;
  importDatetime: string;
  trendingDatetime: string;
  images: {
    original: {
      height: string;
      width: string;
      size: string;
      url: string;
      mp4Size: string;
      mp4: string;
      webpSize: string;
      webp: string;
      frames: string;
      hash: string;
    };
    downsized: {
      height: string;
      width: string;
      size: string;
      url: string;
    };
    downsizedLarge: {
      height: string;
      width: string;
      size: string;
      url: string;
    };
    // Add other image properties if needed
  };
  user: {
    avatarUrl: string;
    bannerImage: string;
    bannerUrl: string;
    profileUrl: string;
    username: string;
    displayName: string;
    description: string;
    instagramUrl: string;
    websiteUrl: string;
    isVerified: boolean;
  };
  analyticsResponsePayload: string;
  analytics: {
    onload: {
      url: string;
    };
    onclick: {
      url: string;
    };
    onsent: {
      url: string;
    };
  };
}
