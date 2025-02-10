export interface InstitutionalDto {
  id?: string;
  name: string;
  description: string;
  logo?: File | string;
  blurhash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}