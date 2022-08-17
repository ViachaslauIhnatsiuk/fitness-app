interface IProduct {
  name: string;
  description?: string;
  img: string;
  protein: number;
  fat: number;
  carbohydrate: number;
  calory: number;
  quantity: number;
}

interface IMeal {
  meal: string;
  time: string;
  products: IProduct[];
}

export type { IProduct, IMeal };
