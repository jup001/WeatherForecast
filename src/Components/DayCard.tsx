import { Grid, Card, CardContent, Typography, Divider } from '@mui/material';
import { Cloud, WbSunny, Thunderstorm } from '@mui/icons-material';
import Rain from '@mui/icons-material/AcUnitRounded';
import Snow from '@mui/icons-material/ThunderstormRounded';


const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
        case 'clear sky':
            return <WbSunny sx={{ fontSize: 48, color: '#FFD700' }} />;
        case 'few clouds':
        case 'scattered clouds':
        case 'broken clouds':
            return <Cloud sx={{ fontSize: 48, color: '#B0C4DE' }} />;
        case 'thunderstorm':
            return <Thunderstorm sx={{ fontSize: 48, color: '#800080' }} />;
        case 'rain':
            return <Rain sx={{ fontSize: 48, color: '#1E90FF' }} />;
        case 'snow':
            return <Snow sx={{ fontSize: 48, color: '#00FFFF' }} />;
        default:
            return <Cloud sx={{ fontSize: 48, color: '#A9A9A9' }} />;
    }
};


const getWeatherColor = (description: string) => {
    switch (description.toLowerCase()) {
        case 'clear sky':
            return '#FFEB3B';
        case 'few clouds':
        case 'scattered clouds':
        case 'broken clouds':
            return '#B3E5FC';
        case 'thunderstorm':
            return '#D32F2F';
        case 'rain':
            return '#81C784';
        case 'snow':
            return '#BBDEFB';
        default:
            return '#E0E0E0';
    }
};


const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const dayOfMonth = date.getDate();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    const dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date);
    return `${dayOfMonth} ${dayOfWeek}`;
};

function DayCard({ index, day }: any) {
    const weatherDescription = day.weather[0].description;
    const weatherColor = getWeatherColor(weatherDescription);

    return (
        <Grid item md={2} key={index}>
            <Card
                variant="outlined"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '90%',
                    width: '90%',
                    backgroundColor: weatherColor,
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 2,
                        padding: 2,
                    }}
                >
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        {formatDate(day.dt)}
                    </Typography>
                    <Divider sx={{ marginBottom: 2, width: '100%' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {getWeatherIcon(weatherDescription)}
                        <Typography variant="body1" sx={{ marginTop: 1 }}>
                            Temp: {day.main.temp}°C
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                            {weatherDescription}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default DayCard;
