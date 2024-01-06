export interface ReviewResponse {
  meta: ReviewMeta;
  reviews: Review[];
}

export interface ReviewMeta {
  branch_rating: number;
  branch_reviews_count: number;
  code: number;
  next_link: string;
  providers: Provider[];
  total_count: number;
}

interface Provider {
  tag: string;
  is_reviewable: boolean;
}
export interface Review {
  id: string;
  region_id: number;
  text: string;
  rating: number;
  provider: string;
  source: null | string;
  is_hidden: boolean;
  url: string;
  likes_count: number;
  comments_count: number;
  date_created: string;
  date_edited: null | string;
  object: ObjectInfo;
  user: User;
  official_answer: Officialanswer | null;
  photos: Photo[];
  on_moderation: boolean;
  is_rated: boolean;
  is_verified: boolean;
}

interface ObjectInfo {
  id: string;
  type: string;
}

export interface Officialanswer {
  id: string;
  org_name: string;
  text: string;
  date_created: string;
}

interface User {
  id: string;
  reviews_count: number;
  first_name: string;
  last_name: null | string;
  name: string;
  provider: string;
  photo_preview_urls: Photopreviewurls;
  url: string;
  additional_data: Additionaldata;
  public_id: string;
}
interface Additionaldata {
  email: null | string;
}

export interface Photo {
  id: string;
  date_created: string;
  preview_urls: Photopreviewurls;
  visibility_status: string;
}

interface Photopreviewurls {
  "1920x": string;
  "320x": string;
  "640x": string;
  "64x64": string;
  url: string;
}
