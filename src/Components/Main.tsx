import { useState } from 'react';
import { useGetWeatherQuery, useGetForecastQuery } from '../Services/weatherApi';
import WeatherForecast from './WeatherForecast';
import { TextField, Alert, Skeleton, Box, InputAdornment } from '@mui/material';
import parisImage from '../images/paris.jpg';
import { Search } from '@mui/icons-material';


const Main = () => {
    const [city, setCity] = useState<string>('');
    const { data: weatherData, error: weatherError, isFetching: weatherLoading } = useGetWeatherQuery(city, { skip: !city });
    const { data: forecastData, error: forecastError, isFetching: forecastLoading } = useGetForecastQuery(city, { skip: !city });

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const inputElement = document.querySelector('input');
            if (inputElement) setCity(inputElement.value);
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
        }}>
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
                        onKeyDown={handleKeyPress}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            const inputElement = document.querySelector('input');
                                            if (inputElement) setCity(inputElement.value);
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                {(weatherError || forecastError) && <Alert severity="error" style={{ marginTop: '20px' }}>City not found. Please try again.</Alert>}
                {(weatherLoading || forecastLoading) && !forecastData?.list?.length && (
                    <Box sx={{ display: 'flex', gap: 6, ml: '1%', width: '100%' }}>
                        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="16%" height={180} />
                        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="16%" height={180} />
                        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="16%" height={180} />
                        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="16%" height={180} />
                        <Skeleton sx={{ borderRadius: 2 }} variant="rectangular" width="16%" height={180} />
                    </Box>
                )}
                {forecastData && forecastData.list && forecastData.list.length > 0 && (
                    <WeatherForecast forecast={forecastData.list} />
                )}
            </Box>
        </div>
    );
};

export default Main;
