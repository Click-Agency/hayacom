type Price = {
  guests: number;
  price: number;
};

type FormPackage = {
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  itemsEn: string[];
  itemsAr: string[];
  video: string | FileList;
  prices: Price[];
};

type Package = FormPackage & {
  _id: string;
  video: string;
  createdAt: string;
};

export type { FormPackage, Package };
