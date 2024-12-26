type FormPackage = {
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  itemsEn: string[];
  itemsAr: string[];
  video: string | FileList;
};

type Package = {
  _id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  itemsEn: string[];
  itemsAr: string[];
  video: string;
  createdAt: string;
};

export type { FormPackage, Package };
