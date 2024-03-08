export interface PRODUCT_DETAIL_API_RES {
    success: boolean;
    message: string;
    errorCode: number;
    data: Data;
}

export interface Data {
    product_cd: string;
    product_state: string;
    group_yn: string;
    group_cd: string;
    product_nm: string;
    product_etc_nm: string;
    product_deal_nm: string;
    product_nm_eng: null;
    product_stock: null;
    coupon_use_yn: string;
    reserve_use_yn: string;
    reserve_give_yn: string;
    supply_price: number;
    sale_price: number;
    fee_rate: number;
    reserve_rate: number;
    keywd: string;
    product_content: null;
    icon: string;
    free_trans_yn: number;
    discount_gb: string;
    product_relation_yn: null;
    best_product_display: string;
    best_review_display: string;
    write_use_yn: string;
    write_title: string;
    order_limit_cnt: number;
    order_mini_quantiry: string;
    shipping_yn: null;
    shipping_gudie: string;
    return_yn: null;
    return_guide: string;
    exchange_yn: null;
    exchange_guide: string;
    vw_cnt: number;
    hits: number;
    review_cnt: number;
    order_cnt: number;
    del_yn: string;
    reg_date: string;
    point: number;
    review_pt_yn: string;
    hidden_yn: string;
    wish_click_on: string;
    order_qty: string;
    additionList: unknown[];
    categoryList: CategoryList[];
    productCon: ProductCon;
    productDetail: ProductDetail;
    file: File[];
    relationList: unknown[];
    optionBases: OptionBases[];
    OPTION_C: OPTION_MODEL[];
    OPTION_S: OPTION_MODEL[];
    OPTION_I: OPTION_MODEL[];
    useReview: UseReview[];
    qna: unknown[];
    recommend: Recommend[];
}

export interface CategoryList {
    category1_cd: string;
    category2_cd: string;
    category3_cd: string;
    category1_nm: string;
    category2_nm: string;
    category3_nm: string;
}

export interface ProductCon {
    content2: string;
    content3: null;
    content4: null;
}

export interface ProductDetail {
    product_cd: string;
    product_info_title: null;
    product_info: string;
    product_info_content: null;
    product_color: string;
    product_use_age: string;
    product_make_country: string;
    product_make_company: string;
    product_import: string;
    product_launch_year: string;
    product_material: string;
    product_nc_cert: string;
    product_as_inquire: string;
    product_guaranty: string;
    product_laundry: string;
    product_npncode: string;
    kfda_check: null;
    ingredient: null;
    content: string;
    content_eng: string;
    content_mb: null;
    product_component_editor: string;
    product_component_yn: string;
    product_content_yn: string;
    reg_date: null;
    product_component_view_yn: null;
}

export interface File {
    product_file_seq: number;
    opt_cd2: string;
    file_gb: string;
    file_nm: string;
    od: number;
}

export interface OptionBases {
    product_cd: string;
    opt_gb: string;
    opt_gbnm: string;
    opt_cd1: string;
    opt_nm1: string;
    mandatory_yn: string;
    color_yn: string;
    product_base_name: string;
    product_base_price: number;
    use_yn: string;
    opt_od: number;
}

export interface OPTION_MODEL {
    opt_cd2: string;
    opt_nm2: string;
    opt_cd1: string;
    product_cd: string;
    opt_price: number;
    opt_price_bak: null;
    opt_color: string;
    use_yn: string;
    del_yn: string;
    od: number;
    soldout_yn: null;
    eos_yn: null;
    stock: string;
    limit_cnt: number;
    restock_date: null;
    stock_seq: null;
    opt_nm1: string;
    opt_gb: string;
}

export interface UseReview {
    use_review_seq: number;
    cust_seq: null | number;
    user_id: string;
    user_nm: string;
    reg_date: string;
    title: string;
    content: string;
    review_gb: string;
    point: number;
    file_nm1: null | string;
    file_nm2: null | string;
    file_nm3: null | string;
    file_nm4: null | string;
    file_nm5: null | string;
    photo_review_url: null | string;
    photo_review_url2: null | string;
    photo_review_url3: null | string;
    photo_review_url4: null | string;
    photo_review_url5: null | string;
    photo_review_url6: null | string;
    reserved_yn: string;
    comment_cnt: number;
    like_cnt: number;
    like_yn: number;
    comment_data: Comment_data[];
}

export interface Comment_data {
    comment_seq: number;
    use_review_seq: number;
    user_id: string;
    user_nm: string;
    comment: string;
    reg_date: string;
}

export interface Recommend {
    product_cd: string;
    product_nm: string;
    supply_price: number;
    sale_price: number;
    icon: string;
    fee_rate: number;
    point: number;
    review_cnt: number;
    product_main_img: string;
    wish_click_on: string;
}

