export interface ObjectDetail {
  meta: Meta;
  result: Result;
}
export enum ContactTypes {
  TELEGRAM = "telegram",
  INSTAGRAM = "instagram",
  WEBSITE = "website",
  WHATSAPP = "whatsapp",
  EMAIL = "email",
  PHONE = "phone",
}
interface Result {
  ad: Ad;
  items: Item3[];
  total: number;
}
export interface Item3 {
  address: Address;
  address_name: string;
  adm_div: Admdiv[];
  building_name: string;
  city_alias: string;
  context: Context;
  external_content: Externalcontent[];
  flags: Flags2;
  floors: Floors;
  full_name: string;
  geometry: Geometry;
  has_apartments_info: boolean;
  has_realty: boolean;
  id: string;
  links: Links;
  locale: string;
  name: string;
  point: Point;
  purpose_code: number;
  purpose_name: string;
  region_id: string;
  reviews: Reviews;
  segment_id: string;
  stat: Stat;
  structure_info: Structureinfo;
  type: string;
  contact_groups: { contacts: Contact[] }[];
  name_ex: NameEx;
}
interface NameEx {
  extension: string;
  primary: string;
}
interface Contact {
  type: string;
  text: string;
  print_text?: string;
  value: string;
  url?: string;
}
interface Structureinfo {
  material: string;
  year_of_construction: number;
}
interface Stat {
  adst: number;
}
export interface Reviews {
  general_rating: number;
  general_review_count: number;
  general_review_count_with_stars: number;
  items: Item2[];
}
interface Item2 {
  is_reviewable: boolean;
  tag: string;
}
interface Point {
  lat: number;
  lon: number;
}
interface Links {
  branches: Branches;
  database_entrances: Databaseentrance[];
  landmarks: Landmark[];
  nearest_parking: Nearestparking[];
  nearest_stations: Neareststation[];
  parking: Parking[];
  providers: Branches;
  servicing: Servicing;
}
interface Servicing {
  count: number;
  items: Item[];
}
interface Item {
  additional_info: string;
  contacts: Contact[];
  id: string;
  name: string;
  org_id: string;
}
interface Contact {
  text: string;
  type: string;
  value: string;
}
interface Parking {
  capacity: string;
  id: string;
  is_paid: boolean;
  name: string;
  purpose: string;
}
interface Neareststation {
  distance: number;
  id: string;
  name: string;
  route_types: string[];
}
interface Nearestparking {
  id: string;
}
interface Landmark {
  azimuth?: number;
  distance: number;
  id: string;
  name: string;
  type: string;
  subtype?: string;
}
interface Databaseentrance {
  geometry: Geometry2;
  id: string;
  is_primary: boolean;
  entity_name?: string;
  entity_number?: string;
  has_poi?: boolean;
  is_visible_in_ui?: boolean;
  is_visible_on_map?: boolean;
  name?: string;
}
interface Geometry2 {
  normals: string[];
  points: string[];
  vectors: string[];
}
interface Branches {
  count: number;
}
interface Geometry {
  centroid: string;
  selection: string;
}
interface Floors {
  ground_count: number;
}
interface Flags2 {
  photos: boolean;
}
interface Externalcontent {
  count: number;
  main_photo_url: string;
  subtype: string;
  type: string;
}
interface Context {
  stop_factors?: StopFactors[];
}

interface StopFactors {
  name: string;
}
interface Admdiv {
  id: string;
  name: string;
  type: string;
  city_alias?: string;
  flags?: Flags;
  is_default?: boolean;
}
interface Flags {
  is_default: boolean;
  is_region_center: boolean;
}
interface Address {
  building_id: string;
  components: Component[];
  postcode: string;
}
interface Component {
  number: string;
  street: string;
  street_id: string;
  type: string;
}
interface Ad {
  gta: Gta;
}
interface Gta {
  banners: Banner[];
}
interface Banner {
  name_ex: Nameex;
  segment_id: string;
  region_id: string;
  hash: string;
  ad_attributes: Adattributes;
  main_rubric_id: number;
  org: Org;
}
interface Org {
  branch_count: number;
  id: string;
  name: string;
}
interface Adattributes {
  algorithm_id: number;
  auction_id: string;
  branch_id: string;
  content: Content;
  is_ads: boolean;
  project_id: number;
  rubric_id: number;
}
interface Content {
  options: Options;
  text: string;
  text_warning: string;
}
interface Options {
  actions: Action[];
  color: string;
  images: Image[];
  logo: Logo;
}
interface Logo {
  img_url: string;
}
interface Image {
  url: string;
}
interface Action {
  caption: string;
  name: string;
  platforms: string[];
  type: string;
  value: string;
}
interface Nameex {
  extension: string;
  primary: string;
}
interface Meta {
  api_version: string;
  code: number;
  issue_date: string;
}
