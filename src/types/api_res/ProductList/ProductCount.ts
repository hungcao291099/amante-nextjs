export interface ProductCount {
    status: string;
    response: Response[];
}

export interface Response {
    CNT: number;
    price_sale_max: number;
    price_sale_min: number;
}

