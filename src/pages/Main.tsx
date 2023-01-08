import React, {useState, useCallback, useEffect} from 'react';
import Container from '@mui/material/Container';

import Countries from "../components/Countries";
import Tabs from "../components/Tabs";
import {SelectedCountry} from "../types/Country";
import {Tab} from "../types/Tabs";
import useFetch from "../hooks/useFetch";
import ReportService from "../API/ReportService";
import ChartReported from "../components/ChartReported";
import ChartRanked from "../components/ChartRanked";
import ThemeToggle from "../components/UI/ThemeToggle";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";
import MainFrame from "../components/MainFrame";
import FormHeader from "../components/FormHeader";
import {ReportPrepared} from "../types/Report";

const Main = () => {
    const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>(null);
    const [activeTab, setActiveTab] = useState<Tab>('reported_cases');
    const [chartData, setChartData] = useState<null | ReportPrepared>(null)

    const onTabChange = useCallback((newTab: Tab) => {
        setActiveTab(newTab || activeTab)
    }, [activeTab])

    const [loadReport, isReportLoading, loadReportError] = useFetch(async () => {
        const report = await ReportService.loadReport()
        const preparedData = ReportService.prepareDataForReport(report)
        setChartData(preparedData)
    })

    useEffect(() => {
        loadReport()
    }, [])

    const pageContent = chartData && (
        <>
            <Countries
                countriesList={chartData.countries}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
            />
            <Tabs
                active={activeTab}
                setActive={onTabChange}
            />
            {activeTab === 'reported_cases'
                ? <ChartReported chartData={chartData} selectedCountry={selectedCountry}/>
                : <ChartRanked chartData={chartData} selectedCountry={selectedCountry}/>
            }
        </>
    )

    return (
        <Container
            maxWidth="md"
            sx={{ py: '30px' }}
        >
            <ThemeToggle />
            <MainFrame>
                <FormHeader>COVID statistics</FormHeader>
                {isReportLoading && <Loader />}
                {loadReportError && <Error message={loadReportError} />}
                {pageContent}
            </MainFrame>
        </Container>
    );
};

export default Main;