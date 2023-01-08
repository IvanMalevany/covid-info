export interface CountryType {
    label: string;
}

export type SelectedCountry = CountryType | null

export interface CountriesProps {
    countriesList: CountryType[];
    selectedCountry: SelectedCountry;
    setSelectedCountry: (country: SelectedCountry) => void
}

export interface Country {
    label: string
}