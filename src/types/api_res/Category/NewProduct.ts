export interface NewProduct {
    success: boolean;
    message: string;
    errorCode: number;
    data: Data[];
    page: number;
    total: number;
    pageCnt: number;
    totalPage: number;
}

export interface Data {
    group_cd: number;
    product_cd: string;
    product_nm: string;
    category1_cd: string;
    category2_cd: string;
    category3_cd: string;
    apply_discount_yn: string;
    apply_discount_date: string;
    sale_state: string;
    product_code: null;
    product_type: string;
    product_state: string;
    brand_cd: string;
    group_yn: string;
    supply_price: number;
    sale_price: number;
    fee_rate: number;
    reserve_rate: number;
    icon: string;
    point: number;
    discount_gb: string;
    product_main_img: string;
    review_cnt: number;
    wish_click_on: string;
    product_main_list: Product_main_list[];
}

export interface Product_main_list {
    file_nm: string;
}

