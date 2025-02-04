type ActivityDto = {
  date: string | Date;
  title: string;
  image?: string | null | File;
  description: string;
  location: string;
  blurhash?: string | null;
};