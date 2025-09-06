import { EnumMovementType } from "../utils/types";
import { Product } from "./Product";

export class StockMovement {
  id?: number;
  productId?: string; 
  product?: Product;
  movementType!: EnumMovementType;
  quantity: number = 0;
  balance: number = 0;
  createdAt?: string;

  constructor(init?: Partial<StockMovement>) {
    Object.assign(this, init);
  }

  isEntry(): boolean {
    return this.movementType === EnumMovementType.IN;
  }

  isOut(): boolean {
    return this.movementType === EnumMovementType.OUT;
  }
}
