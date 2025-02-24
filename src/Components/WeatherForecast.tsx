// WeatherForecast.tsx
import React from 'react';
import { Card, CardContent, Grid, Typography, Divider } from '@mui/material';
import DayCard from './DayCard';

interface WeatherForecastProps {
    forecast: any[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
    const dailyForecast = forecast.filter((entry: any, index: number) => index % 8 === 0).slice(0, 12);
    return (
        <div style={{ marginTop: '20px', marginLeft: '5%' }}>


            <Grid container gap={4} spacing={2}>
                {dailyForecast.map((day, index) => (
                    <DayCard day={day} index={index} />

                ))}
            </Grid>

        </div>
    );
};

export default WeatherForecast;
