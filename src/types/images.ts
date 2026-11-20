interface ImageSize {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  id?: number;
  title?: string;
  alt: string;
  url: string;
  uncroppable?: boolean;
  credit?: string;
  sizes: {
    thumbnail: ImageSize;
    small: ImageSize;
    medium: ImageSize;
    large: ImageSize;
    extra_large: ImageSize;
  };
}
