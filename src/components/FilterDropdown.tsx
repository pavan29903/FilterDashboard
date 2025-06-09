import Select from 'react-select';

type OptionType = {
    label: string;
    value: string;
};

type FilterDropdownProps = {
    options: OptionType[];
    selected: OptionType[];
    onChange: (selected: OptionType[]) => void;
    label: string;
};

export default function FilterDropdown({ options, selected, onChange, label }: FilterDropdownProps) {
    return (
        <div>
            <label className="block mb-1 font-medium">{label}</label>
            <Select
                isMulti
                options={options}
                value={selected}
                onChange={(selectedOptions) => onChange(selectedOptions as OptionType[])}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>
    );
}
