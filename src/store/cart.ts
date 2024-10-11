import { atom } from "recoil";
import { IProduct } from "./products";

export const cartState = atom<IProduct[]>({
  key: "cartState",
  default: [],
});
