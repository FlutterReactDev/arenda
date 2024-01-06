export interface ObjectPhotosResponse {
  meta: Meta;
  result: Result;
}

interface Result {
  items: Record<string, Photo[]>;
}

export interface Photo {
  id: string;
  preview_urls: Previewurls;
  is_pinned: boolean;
  pinned_position: number | null;
}

interface Previewurls {
  "116x116": string;
  "176x176": string;
  "232x232": string;
  "328x170": string;
  "656x340": string;
  "88x88": string;
}
interface Meta {
  code: number;
}
