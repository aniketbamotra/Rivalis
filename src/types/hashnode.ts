export interface HashnodeArticle {
  id: string;
  title: string;
  brief: string;
  slug: string;
  content: {
    markdown: string;
    html: string;
  };
  coverImage?: {
    url: string;
  };
  publishedAt: string;
  readTimeInMinutes: number;
  tags: HashnodeTag[];
  author: {
    name: string;
    profilePicture?: string;
    bio?: string;
  };
  views: number;
}

export interface HashnodeTag {
  id: string;
  name: string;
  slug: string;
}

export interface HashnodePostsResponse {
  posts: {
    edges: Array<{
      node: HashnodeArticle;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface HashnodeSearchResponse {
  searchPostsOfPublication: {
    edges: Array<{
      node: HashnodeArticle;
    }>;
  };
}

export interface ArticleCardProps {
  article: HashnodeArticle;
  featured?: boolean;
}

export interface NewsroomItem {
  id: string;
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  type: 'press' | 'speaking' | 'award' | 'publication';
  externalLink?: string;
  location?: string;
  content: {
    markdown: string;
    html: string;
  };
}
