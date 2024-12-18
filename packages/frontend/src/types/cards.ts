type FormCard = {
  customIdEn: string;
  customIdAr: string;
  titleEn: string;
  titleAr: string;
  image: FileList;
};

type Card = {
  _id: string;
  customIdEn: string;
  customIdAr: string;
  titleEn: string;
  titleAr: string;
  image: string;
  createdAt: string;
};

export type { FormCard, Card };
