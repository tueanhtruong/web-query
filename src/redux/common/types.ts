export interface Content {
  id: number;
  title: string;
  completed: boolean;
  key?: string;
  name?: string;
  description?: string;
}

export type ContentStore = {
  cities: Content[];
  countries: Content[];
  states: Content[];
  departments: Content[];
  ownershipType: Content[];
};
