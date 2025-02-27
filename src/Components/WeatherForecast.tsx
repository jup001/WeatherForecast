// WeatherForecast.tsx
import React from 'react';
import { Grid, } from '@mui/material';
import DayCard from './DayCard';

interface ForecastItem {
    dt_txt: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
}

interface WeatherForecastProps {
    forecast: ForecastItem[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
    const dailyForecast = forecast.filter((entry, index) => index % 8 === 0).slice(0, 12);

    return (
        <div style={{ marginTop: '20px', marginLeft: '5%' }}>
            <Grid container gap={4} spacing={2}>
                {dailyForecast.map((day, index) => (
                    <DayCard key={index} day={day} index={index} />
                ))}
            </Grid>
        </div>
    );
};

export default WeatherForecast;
