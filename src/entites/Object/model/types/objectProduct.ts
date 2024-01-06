export interface ObjectProduct {
  meta: Meta;
  result: Result;
}

export interface Result {
  total: number;
  updated_at: string;
  items: Item[];
  list_info: Listinfo;
  dicts: Dicts;
  categories: Categories;
  bss: Empty;
}

interface Categories {
  id: string;
  label: string;
  count: number;
  children: Child[];
}

interface Child {
  id: string;
  label: string;
  count: number;
}

interface Dicts {
  sources: Source3[];
}
interface Source3 {
  code: string;
  copyright: Copyright;
}
interface Listinfo {
  view: View;

  source: Source2;
}
interface Source2 {
  copyright: Copyright;
}
interface Copyright {
  html: string;
}
interface View {
  type: string;
  show_fields: string;
  is_show_pinned_widget_in_prices_tab: boolean;
}
interface Item {
  product: Product;
  offer: Offer;
}
interface Offer {
  price?: number;
  currency?: string;
  price_value: Pricevalue;
  button_name?: string;
  url?: string;
  buttons?: Buttons;
}
interface Buttons {
  mini_card: Minicard;
  card: Minicard;
}
interface Minicard {
  button_name: string;
  url: string;
}
interface Pricevalue {
  empty: Empty;
}
interface Empty {}
interface Product {
  id: string;
  name: string;
  description: string;
  blocking_attributes: Blockingattribute[];
  images: string[];
  categories: Category[];
  source: Source;
  type: string;
  is_advertised: boolean;
  is_promoted: boolean;
}
interface Source {
  code: string;
}
interface Category {
  id: string;
  label: string;
}
interface Blockingattribute {
  caption: string;
}
export interface Meta {
  code: number;
  api_version: string;
}
