import React, { useState } from 'react';
import axios from 'axios';
import WeatherForecast from './WeatherForecast';
import { TextField, Alert, Skeleton, Box, InputAdornment } from '@mui/material';
import parisImage from '../images/paris.jpg';
import { Search } from '@mui/icons-material';

const API_KEY = 'c547b7dff8d9c3208a4c104903a75d61';

const Main = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [forecastData, setForecastData] = useState<any | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        if (!city) return;
        setLoading(true);
        setError('');

        try {
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(weatherResponse.data);

            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );
            setForecastData(forecastResponse.data);
        } catch (error) {
            setError("City not found. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            fetchWeather();
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundImage: `url(${parisImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
        }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', justifyContent: 'center' }}>

                <Box sx={{ marginBottom: '4%', width: '60%', ml: '19.5%', display: 'flex' }}>
                    <TextField
                        sx={{
                            borderRadius: 5,
                            bgcolor: 'white',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 5,
                                border: 'none',
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                            '& .MuiInputBase-root': {
                                border: 'none',
                            },
                        }}
                        placeholder='Search city'
                        variant="outlined"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleKeyPress}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search
                                        sx={{ cursor: 'pointer' }}
                                        onClick={fetchWeather}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {error && <Alert severity="error" style={{ marginTop: '20px' }}>{error}</Alert>}

                {loading && !forecastData?.list?.length && (
                    <Box sx={{ display: 'flex', gap: 6, ml: '1%', width: '100%' }}>
                        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="16%" height={180} />
                        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="16%" height={180} />
                        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="16%" height={180} />
                        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="16%" height={180} />
                        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="16%" height={180} />

                    </Box>
                )}

                {forecastData?.list?.length > 0 && <WeatherForecast forecast={forecastData.list} />}
            </Box>

        </div>
    );
};

export default Main;
