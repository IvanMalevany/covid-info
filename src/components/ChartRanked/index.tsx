import React, {useCallback, useEffect, useMemo, useState, FC} from 'react';
import {BarParamType, ChartDataPropsWithCounties} from "../../types/Report";
import {BarChart, BarSeries} from "reaviz";
import ReportService from "../../API/ReportService";
import { SelectChangeEvent } from '@mui/material/Select';
import Loader from "../UI/Loader";
import Controls from "./Controls";
import ChartControlsTitle from "../ChartControlsTitle";
import ChartCover from "../ChartCover";

const Index: FC<ChartDataPropsWithCounties> = ({chartData, selectedCountry}) => {

    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [chartReport, setChartReport] = useState<null | any>(null)
    const [paramType, setParamType] = useState<BarParamType>('total_cases')
    const [topCountries, setTopCountries] = useState<string>('10')

    const onChangeTopCountries = useCallback((event: SelectChangeEvent) => {
        setTopCountries(event.target.value as string)
    }, [])
    const onParamTypeChange = useCallback(() => {
        setParamType(paramType === 'total_cases'? 'total_deaths' : 'total_cases')
    }, [paramType])

    useEffect(() => {
        setIsUpdate(true)
        const report = ReportService.getRankedCases(chartData.reportData, paramType, +topCountries)
        setChartReport(report)
        setTimeout(() => setIsUpdate(false))
    }, [chartData, paramType, topCountries, selectedCountry])

    const ChartReportElement = useMemo(() => {
        if (chartReport && !isUpdate) {
            return (
                <BarChart
                    height={300}
                    data={chartReport}
                    series={
                        <BarSeries
                            colorScheme={(_data) => {
                                return selectedCountry && selectedCountry.label === _data.key? '#ACB7C9' : '#418AD7'
                            }}
                        />
                    }
                />
            )
        }
        return <Loader height="300px"/>
    }, [chartReport, isUpdate, selectedCountry])

    const controlsProps = {paramType, onParamTypeChange, topCountries, onChangeTopCountries}

    return (
        <ChartCover>
            {ChartReportElement}
            <ChartControlsTitle />
            <Controls {...controlsProps}/>
        </ChartCover>
    );
};

export default Index;