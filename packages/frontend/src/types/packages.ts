type FormPackage = {
  titleEn: string;
  titleAr: string;
  itemsEn: string[];
  itemsAr: string[];
};

type Package = {
  _id: string;
  titleEn: string;
  titleAr: string;
  itemsEn: string[];
  itemsAr: string[];
  createdAt: string;
};

export type { FormPackage, Package };
