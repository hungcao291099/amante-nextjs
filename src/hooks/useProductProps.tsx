import { create } from 'zustand';
interface ProductProp {
    sort: number,
    point: number,
    isViewCollection: boolean,
    isSale: boolean,
    prop_string: string,
    price_range_init: string,
    price_range: string,
    price_string: string,
    setSort: (sort_data: number) => void,
    setPoint: (point_data: number) => void,
    setViewCollection: (view_collection: boolean) => void,
    setSale: (sale: boolean) => void
    setPriceRangeInit: (price_range_init: string) => void
    setPriceRange: (price_range: string) => void
    removeAll: () => void
}
const Props2String = (sort: number, point: number, isViewCollection: boolean, isSale: boolean,) => {
    var prop_string = ""
    var sort_string = ""
    switch (sort) {
        case 0: sort_string = ""
            break;
        case 1: sort_string = ""
            break;
        case 2: sort_string = ""
            break;
        case 3: sort_string = "sort_sale_price=DESC"
            break;
        case 4: sort_string = "sort_sale_price=ASC"
            break;
        case 5: sort_string = "sort_review_cnt=DESC"
            break;
        case 6: sort_string = "sort_reg_date=DESC"
            break;
        default: sort_string = ""
            break;
    }
    if (sort_string != "") prop_string += `&${sort_string}`
    if (point != 0) prop_string += `&point=${point}&sort_point=ASC`

    console.log(prop_string);


    return prop_string
}
const useProductProps = create<ProductProp>((set) => ({
    sort: 0,
    point: 0,
    prop_string: "",
    price_range_init: "0|1000",
    price_range: "",
    price_string: "",
    isSale: false,
    isViewCollection: false,
    setSort: (sort_data) => set((state) => ({
        sort: sort_data,
        prop_string: Props2String(sort_data, state.point, state.isViewCollection, state.isSale)
    })),
    setPoint: (point_data) => set(state => ({
        point: point_data,
        prop_string: Props2String(state.sort, point_data, state.isViewCollection, state.isSale)
    })),
    setViewCollection: (view_collection) => set(state => ({
        isViewCollection: view_collection,
        prop_string: Props2String(state.sort, state.point, view_collection, state.isSale)
    })),
    setSale: (sale) => set(state => ({
        isSale: sale,
        prop_string: Props2String(state.sort, state.point, state.isViewCollection, sale)
    })),
    setPriceRangeInit: (priceRangeInit) => set({ price_range_init: priceRangeInit }),
    setPriceRange: (priceRange) => set({
        price_range: priceRange,
        price_string: `&price_min=${priceRange.split("|")[0]}&price_max=${priceRange.split("|")[1]}`
    }),
    removeAll: () => set({
        sort: 0,
        point: 0,
        prop_string: "",
        isSale: false,
        isViewCollection: false,
    })
}))
export default useProductProps