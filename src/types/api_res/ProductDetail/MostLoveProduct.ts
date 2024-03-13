export interface MostLoveProduct {
    success: boolean;
    data: Data[];
}

export interface Data {
    product_cd: string;
    product_nm: string;
    fee_rate: number;
    sale_price: number;
    supply_price: number;
    file_nm: string;
    PRODUCT_CODE: string;
}

