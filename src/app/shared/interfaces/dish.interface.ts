export default interface Dish {
  id: number;
  name: string;
  description: string;
  image: string | null;
  categoryId: number;
  price: number;
}
