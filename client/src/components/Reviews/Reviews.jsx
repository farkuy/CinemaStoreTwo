import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, CardContent, List, Paper, Typography} from "@mui/material";

const Reviews = ({reviewsList, page, upPage}) => {

    const [list, setList] = useState(reviewsList);
    const paginationElement = useRef();
    const heightList = useRef()

    useEffect(() => {
        setList(reviewsList)
    }, [reviewsList])


    return (
        <div>
            <Paper style={{maxHeight: 500, overflow: 'auto', padding: '0 5% 0 5%'}}>
                <List ref={heightList}>
                    {
                        list.map((i, index) => {
                            let backGrad = '';
                            if (i.type === "NEGATIVE") {
                                backGrad = 'linear-gradient(-45deg, #e52d27, #b31217)'
                            }
                            if (i.type === "POSITIVE") {
                                backGrad = 'linear-gradient(-45deg, #1d976c, #93f9b9)'
                            }
                            if (i.type === "NEUTRAL") {
                                backGrad = 'linear-gradient(-45deg, #2c3e50, #bdc3c7)'
                            }
                            const timeCorrect = i.date.split('T').join(' ')

                            return <Card
                                style={{background: `${backGrad}`, margin: '10px'}}
                                sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {i.author}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {i.title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {timeCorrect}
                                    </Typography>
                                    <Typography variant="body2">
                                        {i.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        })
                    }
                    <Button
                        style={{marginLeft: `7px`}}
                        size="md"
                        variant="solid"
                        color="neutral"
                        onClick={() => upPage(page + 1)}
                    >
                        Показать другие рецензии...
                    </Button>
                </List>
            </Paper>
        </div>
    );
};

export default Reviews;