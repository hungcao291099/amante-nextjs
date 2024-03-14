export interface CartList {
    success: boolean;
    message: string;
    errorCode: number;
    data: Data;
}

export interface Data {
    total_count: number;
    single_fee: number;
    free_delivery: boolean;
    cart: Cart[];
    group_products: Group_products[];
    mem_info: Mem_info;
    const_trans_info: Const_trans_info;
    code_trans_msg_info: Code_trans_msg_info[];
}

export interface Cart {
    product_cd: string;
    cart_seq: string;
    cust_seq: number;
    path_gb: string;
    reg_date: string;
    product_nm: string;
    supply_price: number;
    sale_price: number;
    free_trans_yn: number;
    reserve_rate: number;
    brand_nm: string;
    product_main_img: string;
    tmp_order_yn: string;
    qty: number;
    combine_qty: string;
    c_options: C_options[] | [];
    i_options: [] | I_options[];
    s_options: [] | S_options[];
    total_price: number;
}

export interface C_options {
    opt_gb: string;
    cart_seq: number;
    product_cd: string;
    opt_cd: string;
    opt_nm: string;
    value_cd: string;
    value_nm: string;
    sale_price: number;
    opt_price: number;
    qty: number;
    w_opt: string;
    cart_opt_seq: string;
}

export interface I_options {
    opt_cd: string;
    opt_gb: string;
    opt_nm: string;
    product_cd: string;
    value_cd: string;
    value_nm: string;
    opt_price: number;
    cart_seq: number;
    qty: number;
    w_opt: string;
    cart_opt_seq: number;
}

export interface S_options {
    opt_cd: string;
    opt_gb: string;
    opt_nm: string;
    product_cd: string;
    value_cd: string;
    value_nm: string;
    opt_price: number;
    cart_seq: number;
    qty: number;
    w_opt: string;
    cart_opt_seq: number;
}

export interface Group_products {
    group_nm: string;
    group_cd: number;
    product_list: Product_list[];
}

export interface Product_list {
    display_sale_price: null | number;
    group_nm: string;
    group_product_seq: number;
    group_cd: number;
    gubun_cd: number;
    product_cd: string;
    product_nm: string;
    category1_cd: string;
    category2_cd: string;
    category3_cd: null | string;
    member_grp_cd: null;
    display_date: null;
    display_s_date: null;
    display_e_date: null;
    sale_limit: null;
    code_cd: null;
    file_nm1: null;
    outside_url: null;
    today_price: null;
    fee_rate: number;
    sale_price: number;
    supply_price: number;
    discount_price: null | number;
    apply_discount_id: null;
    apply_discount_yn: string;
    apply_discount_date: null;
    s_hour: null;
    s_min: null;
    e_hour: null;
    e_min: null;
    sale_state: string;
    od: number;
    use_yn: string;
    reg_date: string;
    point: number;
    main_img: string;
    opt_cnt: number;
    wish_click_on: string;
    review_cnt: number;
}

export interface Mem_info {
    cust_seq: null;
    join_gb: string;
    member_grp_cd: number;
    user_id: string;
    passwd: string;
    pass_change_date: null;
    user_nm: string;
    mb_reserve: number;
    mb_deposit: number;
    gender: string;
    birthday: string;
    phone: string;
    email: string;
    home_zip: null;
    home_addr1: null;
    home_addr2: null;
    reg_date: null;
    mod_date: null;
    mailing_yn: string;
    sms_yn: string;
    out_yn: string;
    out_date: null;
    last_login_date: null;
    join_path: string;
    join_path_text: null;
    reference_id: null;
    reference_code: null;
    ip: string;
    dormant_yn: string;
    callback_date: null;
    pass_err_cnt: number;
    pass_err_date: null;
    tendecy: null;
    admin_memo: null;
    auth_yn: string;
    membership_cd: null;
    privacy_date: null;
    join_path_keyword: null;
    next_use_otype_cd: string;
    sms_yn_date: null;
    mailing_yn_date: null;
    app_push_yn: string;
    mem_addr_seq: null;
    addr_nm: null;
    cust_nm: null;
    tel: null;
    hp: null;
    order_msg: null;
    delivery_msg: null;
    default_yn: null;
    addr_gb: null;
    member_gb: null;
    member_grp_nm: string;
    age: number;
    phone1: string;
    phone2: string;
    phone3: string;
    email_id: string;
    email_addr: string;
}

export interface Const_trans_info {
    const_trans_cd: string;
    const_trans_limit: number;
    const_trans_price: number;
    const_foreign_trans_limit: number;
    const_foreign_trans_price: number;
    const_back_price: number;
}

export interface Code_trans_msg_info {
    code_cd2: string;
    code_nm2: string;
    bigo: string;
    bigo2: string;
    od: number;
    use_yn: string;
    code_cd1: string;
}

