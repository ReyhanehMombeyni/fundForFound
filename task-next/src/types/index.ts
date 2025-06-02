export interface itemMenuNavbar {
  text: string;
  href: string;
}

export interface closeModals {
  closeModals: () => void;
}

export interface isLoggedIn {
  isLoggedIn: boolean;
}

export interface Tag {
  id: number;
  name: string;
  documentId: string;
}

export interface Countries {
  id: number;
  name: string;
  documentId: string;
}

export interface Categories {
  id: number;
  name: string;
  documentId: string;
}

export interface SubCategories {
  id: number;
  name: string;
  documentId: string;
  category: Categories | null;
}

export interface dataForm {
  name: string;
  country: string;
  category: string;
  subCategory: string;
}

export interface socialMedia {
  name: string;
  baseUrl: string;
  documentId: string;
}

export interface socialSelected {
  name: string;
  baseUrl: string;
  documentId: string;
  customUrl: string;
}

