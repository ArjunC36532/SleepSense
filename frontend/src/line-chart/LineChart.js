import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './LineChart.css';
import Loading from '../components/loading/LoadingAnimation';


function LoadingSpinner() {
    return (
        <Loading />
    );
}

function LineChart({ timeFilter = 'week', dataKey = 'sleepHours'}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true at the start of each fetch
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                    console.error('No email found in localStorage');
                    return;
                }

                // First get the user_id
                const userResponse = await axios.post(`https://tplinux.taile388eb.ts.net/get-userid?email=${email}`);
                const user_id = userResponse.data.user_id;

                // Set time period parameters based on timeFilter
                const this_week = timeFilter === 'week';
                const last_week = timeFilter === 'last_week';
                const this_month = timeFilter === 'month';

                // Then get the sleep data using query parameters
                const response = await axios.post(
                    `https://tplinux.taile388eb.ts.net/get-sleep-data?user_id=${user_id}&this_week=${this_week}&last_week=${last_week}&this_month=${this_month}`
                );
                setData(response.data);
            } catch (error) {
                console.error('Error fetching sleep data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [timeFilter]); // Add timeFilter to dependency array

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                />
                <YAxis domain={[0, 12]} />
                <Tooltip />
                <Area 
                    type="monotone" 
                    dataKey={dataKey}
                    stroke="#4a90e2" 
                    fill="#4a90e2" 
                    fillOpacity={0.3}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default LineChart;