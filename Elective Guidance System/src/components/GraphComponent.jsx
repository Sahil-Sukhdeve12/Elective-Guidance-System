import { Bar, Pie, Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    Filler,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    Filler,
    ArcElement
);

const GraphComponent = ({ statistics }) => {
    const semesterData = {
        labels: Object.keys(statistics.semesterCounts || {}),
        datasets: [{
            label: 'Users by Semester',
            data: Object.values(statistics.semesterCounts || {}),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    const degreeData = {
        labels: Object.keys(statistics.degreeCounts || {}),
        datasets: [{
            label: 'Users by Degree',
            data: Object.values(statistics.degreeCounts || {}),
            fill: true,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        }],
    };

    const departmentData = {
        labels: Object.keys(statistics.departmentCounts || {}),
        datasets: [{
            label: 'Users by Department',
            data: Object.values(statistics.departmentCounts || {}),
            backgroundColor: [
                'rgba(255, 159, 64, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
            ],
        }],
    };

    const collegeData = {
        labels: Object.keys(statistics.collegeCounts || {}),
        datasets: [{
            label: 'Users by College',
            data: Object.values(statistics.collegeCounts || {}),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Categories',
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 0,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Users',
                },
                beginAtZero: true,
            },
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },
        },
        options: {
            devicePixelRatio: window.devicePixelRatio || 1
        }
    };

    return (
        <div className="graph-dashboard">
            <div className="graph-card">
                <h3>Users by Semester (Bar)</h3>
                <Bar data={semesterData} options={chartOptions} />
            </div>
            <div className="graph-card">
                <h3>Users by Degree (Line)</h3>
                <Line data={degreeData} options={chartOptions} />
            </div>
            <div className="graph-card">
                <h3>Users by Department (Pie)</h3>
                <Pie data={departmentData} options={{ responsive: true }} />
            </div>
            <div className="graph-card">
                <h3>Users by College (Bar)</h3>
                <Bar data={collegeData} options={chartOptions} />
            </div>
        </div>
    );
};

// GraphComponent.propTypes = {
//     statistics: PropTypes.object.isRequired,
//     collegeData: PropTypes.object.isRequired,
//     chartOptions: PropTypes.object.isRequired,
// };

GraphComponent.propTypes = {
    statistics: PropTypes.shape({
        semesterCounts: PropTypes.object,
        departmentCounts: PropTypes.object,
        collegeCounts: PropTypes.object
    }).isRequired
};

export default GraphComponent;
