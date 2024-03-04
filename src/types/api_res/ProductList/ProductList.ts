export interface ProductList {
    status: string;
    response: ProductItem[];
}

export interface ProductItem {
    product_cd: string;
    PRODUCT_CODE: string;
    product_nm: string;
    option_nm: string;
    supply_price: number;
    sale_price: number;
    point: number;
    review_cnt: number;
    file_nm: string;
}

