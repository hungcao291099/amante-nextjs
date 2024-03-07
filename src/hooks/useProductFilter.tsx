import { create } from 'zustand';

interface ProductFilter {
    filters: Option[];
    filter_string: string;
    setFilter: (id: string, name: string) => void;
    removeFilter: (id: string, name: string) => void;
    removeAll: () => void
}

interface Option {
    group_id: string;
    option_id: string;
    option_name: string;
}

const Filter2String = (filters: Option[]) => {
    var filter_string = ""
    let props: string[]
    const OptionsGroup: { [key: string]: Option[] } = {};

    filters.forEach(option => {
        if (!OptionsGroup[option.group_id]) {
            OptionsGroup[option.group_id] = [];
        }
        OptionsGroup[option.group_id].push(option);
    });

    Object.keys(OptionsGroup).forEach((group_id, index) => {
        const options = OptionsGroup[group_id].map(option => option.option_id).join('^');
        filter_string += `&prop[${group_id}]=${options}`;
        if (index < Object.keys(OptionsGroup).length - 1) {
            filter_string += '&';
        }
    });

    return filter_string
}
const useProductFilter = create<ProductFilter>((set) => ({
    filters: [],
    filter_string: "",
    setFilter: (id, name) => set((state) => ({
        filters: [...state.filters, { option_id: id, option_name: name, group_id: id.substring(0, id.lastIndexOf("_")) }],
        filter_string: Filter2String([...state.filters, { option_id: id, option_name: name, group_id: id.substring(0, id.lastIndexOf("_")) }])
    })),
    removeFilter: (id, name) => set(state => ({
        filters: [...state.filters].filter(x => x.option_id != id),
        filter_string: Filter2String([...state.filters].filter(x => x.option_id != id))
    })),
    removeAll: () => set({ filters: [] })
}));

export default useProductFilter;

