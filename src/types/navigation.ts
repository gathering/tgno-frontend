export interface MinimalNavItem {
  title: string;
  path?: string;
}
export interface NavItem extends MinimalNavItem {
  items?: MinimalNavItem[];
}
