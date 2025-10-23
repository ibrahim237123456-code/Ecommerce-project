export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  brand?: string;
  images?: string[];
  features?: string[];
  specifications?: { [key: string]: string };
  discount?: number;
  isFeatured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
}