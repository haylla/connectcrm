import {
    Card,
    CardContent,
    Typography,
    Box
} from '@mui/material';

function DashboardCard({

    title,
    value,
    subtitle,
    icon

}) {

    return (

        <Card
            elevation={3}
            sx={{
                borderRadius: 4,
                height: 190,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >

            <CardContent
                sx={{
                    textAlign: 'center'
                }}
            >

                <Box
                    sx={{
                        color: 'primary.main',
                        mb: 1
                    }}
                >

                    {icon}

                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >

                    {title}

                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >

                    {value}

                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >

                    {subtitle}

                </Typography>

            </CardContent>

        </Card>

    );

}

export default DashboardCard;