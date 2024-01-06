export interface ObjectPhoto {
  albums: Album[];
  items: Item[];
  next_page_token: string;
}

export interface Item {
  id: string;
  url: string;
  real_object_type: string;
  height: number;
  width: number;
  preview_urls: Previewurls;
  copyright: Copyright;
  owner: Owner;
  creation_time: string;
  modification_time: string;
  is_pinned: boolean;
}

interface Owner {
  id: string;
  public_id: string;
  name: string;
  avatar: string;
}

interface Copyright {
  type: string;
  value: string;
  url: string | null;
  provider_icon: string;
  code: string;
  icon: string;
  title: string;
}
interface Previewurls {
  "116x116": string;
  "176x176": string;
  "232x232": string;
  "328x170": string;
  "656x340": string;
  "88x88": string;
}
export interface Album {
  id: string;
  name: string;
  count: number;
}


