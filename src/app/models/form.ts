export interface Form {
  id: number;
  name: string;
  url: string;
  icon: string;
  parentId?: number;
  children?: Form[];
}
