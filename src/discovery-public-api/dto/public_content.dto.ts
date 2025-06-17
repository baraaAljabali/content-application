import { Exclude, Expose } from 'class-transformer';


export class PublicContent {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description?: string;

  @Expose()
  genre?: string[]

  @Expose()
  language?: string

  @Expose()
  length?: number

  @Expose()
  content_link?: string

  
  @Expose()
  source_type?: string

  @Expose()
  createdAt?: Date;
  

  @Exclude()
  updatedAt?: Date;
  
  @Exclude()
  published?: boolean
}
