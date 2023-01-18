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
        // sample for better performance during development
        // if (process.env.NODE_ENV === 'development') {
        //     return {
        //         AUT: {
        //             location:"Austria",
        //             data: [
        //                 {
        //                     "date": "2020-03-31",
        //                     "total_cases": 9264,
        //                     "new_cases": 547,
        //                     "total_deaths": 134,
        //                     "new_deaths": 14,
        //                 },
        //                 {
        //                     "date": "2021-08-05",
        //                     "total_cases": 656550,
        //                     "new_cases": 595,
        //                     "total_deaths": 13150,
        //                     "new_deaths": 3
        //                 },
        //                 {
        //                     "date": "2022-09-06",
        //                     "total_cases": 4980628,
        //                     "new_cases": 2791,
        //                     "total_deaths": 20671,
        //                     "new_deaths": 3,
        //                 }
        //             ]
        //         },
        //         BEL: {
        //             location:"Belgium",
        //             data: [
        //                 {
        //                     "date": "2020-08-27",
        //                     "total_cases": 83500,
        //                     "new_cases": 470,
        //                     "total_deaths": 9884,
        //                     "new_deaths": 5,
        //                 },
        //                 {
        //                     "date": "2021-10-05",
        //                     "total_cases": 1253587,
        //                     "new_cases": 1730,
        //                     "total_deaths": 25640,
        //                     "new_deaths": 8
        //                 },
        //                 {
        //                     "date": "2022-08-17",
        //                     "total_cases": 4460582,
        //                     "new_cases": 0,
        //                     "total_deaths": 32410,
        //                     "new_deaths": 0
        //                 }
        //             ]
        //         }
        //     }
        // }
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

    static getRankedCases(countries: CountryReportPrepared[], paramType: BarParamType, topCount: number, selectedCountry: SelectedCountry) {
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
        if (report.length > topCount) {
            let r = report.slice(0, topCount)
            if (selectedCountry) {
                const isFind = report.find(c => c.key === selectedCountry.label)
                if (isFind) r.push(isFind)
            }
            return r
        }
        return report
    }
}