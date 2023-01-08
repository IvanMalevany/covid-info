import {Country, SelectedCountry} from "./Country";

export type LineParamType = 'cases' | 'deaths'
export type LineCountType = 'new' | 'total'

export type LineParamFullType = 'new_cases' | 'new_deaths' | 'total_cases' | 'total_deaths'
type getParamFieldType = (paramType: LineParamType, countType: LineCountType) => LineParamFullType
export const getParamField: getParamFieldType = (paramType, countType) => [countType, paramType].join('_') as LineParamFullType

export type BarParamType = 'total_cases' | 'total_deaths'

interface DailyReportPrepared{
    new_cases: number
    new_deaths: number
    total_cases: number
    total_deaths: number
}
interface DailyReportPlain extends DailyReportPrepared{
    date: string;
}

interface CountryPlain {
    location: string;
    data: DailyReportPlain[];
}

export type ReportPlain = {
    [country: string]: CountryPlain
}

export interface ReportByDaysPrepared {
    [date: string]: DailyReportPrepared
}

export interface CountryReportPrepared {
    countryCode: string;
    countryName: string;
    reportByDays: ReportByDaysPrepared;
}

export interface ReportPrepared {
    countries: Country[];
    days: string[];
    reportData: CountryReportPrepared[];
}

export interface ChartDataProps {
    chartData: ReportPrepared
}

export interface ChartDataPropsWithCounties extends ChartDataProps{
    selectedCountry: SelectedCountry
}

export interface ReportCasesDayData {
    key: Date;
    id: string;
    data: number;
}

export interface ReportCasesChartData {
    key: string;
    data: ReportCasesDayData[];
}