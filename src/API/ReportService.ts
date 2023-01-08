import {
    BarParamType,
    getParamField,
    LineCountType,
    LineParamType,
    ReportCasesChartData,
    ReportPlain,
    ReportPrepared
} from "../types/Report";
import {Country, SelectedCountry} from "../types/Country";
import {CountryReportPrepared} from "../types/Report";
import axios from "axios";

export default class ReportService {

    static async loadReport (): Promise<ReportPlain> {
        const data = await axios.get('https://covid.ourworldindata.org/data/owid-covid-data.json')
        return data.data as ReportPlain
    }

    static prepareDataForReport(report: ReportPlain): ReportPrepared {
        const countries: Country[] = []
        const daysUnsorted = new Set()

        const reportData = Object.entries(report)
            .filter(([countryCode]) => !countryCode.includes('_'))  // removing groups of countries
            .map(([countryCode, countryReport]) => {
                countries.push({
                    label: countryReport.location
                })
                return {
                    countryName: countryReport.location,
                    countryCode: countryCode,
                    reportByDays: countryReport.data.reduce(
                        (commulativeReport, dailyReport) => {
                            daysUnsorted.add(dailyReport.date);
                            return Object.assign(
                                commulativeReport,
                                {
                                    [dailyReport.date]: {
                                        new_cases: dailyReport.new_cases || 0,
                                        new_deaths: dailyReport.new_deaths || 0,
                                        total_cases: dailyReport.total_cases || 0,
                                        total_deaths: dailyReport.total_deaths || 0,
                                    }
                                }
                            )
                        },
                        {}
                    )
                }
            })

        const days = [...daysUnsorted].sort() as string[]

        return {
            countries,
            days,
            reportData
        }
    }

    static getReportedCases(countries: CountryReportPrepared[], days: string[], paramType: LineParamType, countType: LineCountType, selectedCountry: SelectedCountry): ReportCasesChartData[] {
        const param = getParamField(paramType, countType)
        return (selectedCountry? countries.filter(country => country.countryName === selectedCountry.label) : countries).map(country => {
            return {
                key: country.countryName,
                data: days.map(day => {
                    return {
                        key: new Date(day),
                        id: day,
                        data: +((country.reportByDays[day] && country.reportByDays[day][param]) || 0)
                    }
                })
            }
        })
    }

    static getRankedCases(countries: CountryReportPrepared[], paramType: BarParamType, topCount: number) {
        const report = countries.map(country => {
            const days = Object.entries(country.reportByDays)
            const lastDayReport = days[days.length - 1] || [null, {}]
            const lastDay = lastDayReport[1]
            return {
                key: country.countryName,
                data: lastDay[paramType] || 0
            }
        })
        report.sort((c1, c2) => c2.data - c1.data)
        return report.length > topCount? report.slice(0, topCount - 1) : report
    }
}