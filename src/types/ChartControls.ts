import {SelectChangeEvent} from "@mui/material/Select";

export interface RankedChartControlParams {
    paramType: string;
    onParamTypeChange: () => void;
    topCountries: string;
    onChangeTopCountries: (event: SelectChangeEvent) => void;
}

export interface ReportedChartControlParams {
    paramType: string;
    onParamTypeChange: () => void;
    countType: string;
    onCountTypeChange: () => void;
}