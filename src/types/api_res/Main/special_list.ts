export interface SpecialList {
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
    theme_seq: number;
    theme_nm: string;
    site_gb: null;
    theme_type: string;
    theme_state: number;
    theme_con: string;
    s_date: string;
    e_date: string;
    content: string;
    link_url: string;
    use_yn: string;
    del_yn: string;
    od: number;
    file_nm1: string;
    content_mobile: string;
    theme_gb: null;
    reg_date: string;
    file_nm2: string;
    main_yn: string;
    shopping_yn: string;
    gubun_yn: string;
    theme_gubun_name: string;
    theme_gubun_background_color: string;
    relationList: RelationList[];
}

export interface RelationList {
    theme_seq: string;
    product_cd: string;
    product_code: null;
    product_type: string;
    product_state: string;
    product_nm: string;
    model_name: null;
    product_stock: null;
    supply_price: number;
    sale_price: number;
    fee_rate: number;
    reserve_rate: number;
    icon: string;
    main_img: null;
    sub_img1: null;
    sub_img2: null;
    sub_img3: null;
    sub_img4: null;
    file_nm: string;
    file_gb: string;
    wish_click_on: string;
}

