import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {LineChart, LineSeries, Line} from 'reaviz'

import ReportService from "../../API/ReportService";
import {ChartDataPropsWithCounties, LineCountType, LineParamType} from "../../types/Report";
import Controls from "./Controls";
import Loader from "../UI/Loader";
import ChartControlsTitle from "../ChartControlsTitle";
import ChartCover from "../ChartCover";

const Index = ({chartData, selectedCountry}: ChartDataPropsWithCounties) => {
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [chartReport, setChartReport] = useState<null | any>(null)
    const [paramType, setParamType] = useState<LineParamType>('cases')
    const [countType, setCountType] = useState<LineCountType>('new')

    const onParamTypeChange = useCallback(() => {
        setParamType(paramType === 'cases'? 'deaths' : 'cases')
    }, [paramType])
    const onCountTypeChange = useCallback(() => {
        setCountType(countType === 'new'? 'total' : 'new')
    }, [countType])

    useEffect(() => {
        setIsUpdate(true)
        const report = ReportService.getReportedCases(chartData.reportData, chartData.days, paramType, countType, selectedCountry)
        setChartReport(report)
        setTimeout(() => setIsUpdate(false))
    }, [chartData, paramType, countType, selectedCountry])

    const ChartReportElement = useMemo(() => {
        if(chartReport && !isUpdate) {
            return (
                <LineChart
                    height={300}
                    data={chartReport}
                    series={<LineSeries type="grouped" line={<Line strokeWidth={1} />} />}
                />
            )
        }
        return <Loader height="300px"/>
    }, [chartReport, isUpdate])

    const controlsProps = {paramType, onParamTypeChange, countType, onCountTypeChange}

    return (
        <ChartCover>
            {ChartReportElement}
            <ChartControlsTitle />
            <Controls {...controlsProps} />
        </ChartCover>
    );
};

export default Index;