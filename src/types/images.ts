interface ImageSize {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  title: string;
  alt: string;
  url: string;
  sizes: {
    thumbnail: ImageSize;
    small: ImageSize;
    medium: ImageSize;
    large: ImageSize;
    extra_large: ImageSize;
  };
}
