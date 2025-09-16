export class CreateBlogPostDto {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  featured_image?: string;
  published?: boolean;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  published_at?: Date;
}

export class UpdateBlogPostDto {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  featured_image?: string;
  published?: boolean;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  published_at?: Date;
}