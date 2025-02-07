type FormCard = {
  customIdEn: string;
  customIdAr: string;
  images: (File | string)[];
};

type Card = {
  _id: string;
  customIdEn: string;
  customIdAr: string;
  images: string[];
  createdAt: string;
};

type PriceCard = {
  guest: number;
  price: number;
};

export type { FormCard, Card, PriceCard };
