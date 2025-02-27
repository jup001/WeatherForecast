import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'c547b7dff8d9c3208a4c104903a75d61';

export interface WeatherData {
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    name: string;
}

export interface ForecastData {
    list: {
        dt_txt: string;
        main: {
            temp: number;
        };
        weather: {
            description: string;
            icon: string;
        }[];
    }[];
}

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
    endpoints: (builder) => ({
        getWeather: builder.query<WeatherData, string>({
            query: (city: string) => `weather?q=${city}&appid=${API_KEY}&units=metric`,
        }),
        getForecast: builder.query<ForecastData, string>({
            query: (city: string) => `forecast?q=${city}&appid=${API_KEY}&units=metric`,
        }),
    }),
});

export const { useGetWeatherQuery, useGetForecastQuery } = weatherApi;
