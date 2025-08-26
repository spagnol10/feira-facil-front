import { EnumMeasurementType, EnumMeasurementUnit, EnumProductCategory } from "../utils/types";

export class Product {
    id?: string;
    name: string = "";
    code: string = "";
    imageUrl: string = "";
    costPrice: number = 0;
    sellingPrice: number = 0;
    measurementType?: EnumMeasurementType;
    measurementUnit?: EnumMeasurementUnit;
    category?: EnumProductCategory;
    stock: number = 0;
    description: string = "";
    active?: boolean;

    constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }

    getProfit(): number {
        return this.sellingPrice - this.costPrice;
    }

}