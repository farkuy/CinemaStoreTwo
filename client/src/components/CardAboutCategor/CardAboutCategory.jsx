import React from 'react';
import Box from "@mui/material/Box";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
const CardAboutCategory = ({info}) => {
    return (
        <Card
            style={{background: `linear-gradient(-45deg, #faf0cd, #fab397`}}
            sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {info.name}
                </Typography>
                <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CardAboutCategory;