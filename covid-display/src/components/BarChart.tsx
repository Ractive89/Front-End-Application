import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import styled from '@emotion/styled';
import { Country } from '../types';

interface Props {
    countries: Country[];
}

static defaultProps = {profileStore:{}}

const options: ChartOptions<any> = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const ChartWrapper = styled.div`
    max-width: 700px;
    margin: 0 auto;
`;

const BarChart: React.FunctionComponent<Props> = ({ countries }) => {
    const generateChartData = () => {
        const data: number[] = [];
        const labels: string[] = [];

        countries.forEach(country => {
            data.push(country.NewConfirmed);
            labels.push(country.Country);
        });

        return {
            labels,
            datasets: [
                {
                    label: 'New Confirmed',
                    data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
    }

    return <ChartWrapper><Bar data={generateChartData()} options={options} /></ChartWrapper>;
};

export default BarChart;