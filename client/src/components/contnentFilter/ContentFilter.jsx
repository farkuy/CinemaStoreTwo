import React, {useEffect, useMemo, useState} from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Slider, Stack, TextField
} from '@mui/material';
import { maineInfoAboutContent } from '../../http/kinopoiskApi';
import Box from '@mui/material/Box';
import {useSelector} from "react-redux";
import './ContentFilterStyle.css'

const ContentFilter = ({infoAboutContentList, filterContent}) => {
    const [minAge, setMinAge] = useState(1885);
    const [maxAge, setMaxAge] = useState(new Date().getFullYear() + 10);
    const [genre, setGenre] = useState('');
    const [country, setCountry] = useState('');

    const [allGenre, setAllGenre] = useState([]);
    const [allCountry, setAllCountry] = useState([]);

    useEffect(() => {
        maineInfoAboutContent.getAllGenresAndCountry().then(data => {
            setAllCountry(data.countries);
            setAllGenre(data.genres);
        });
    }, []);

    const handleChangGenre = event => {
        setGenre(event.target.value);
    };

    const handleChangCountru = event => {
        setCountry(event.target.value);
    };

    const handleChangAge = (event, newValue) => {
        setMinAge(newValue[0]);
        setMaxAge(newValue[1]);
    };
    const maxChange = (e) => {
        const { value } = e.target;
        let newValue = value.replace(/[^\d]/g, '');
        newValue = Number(newValue)
        if(newValue > new Date().getFullYear() + 10) {
            setMaxAge(new Date().getFullYear() + 10);
            return
        }
        if(newValue < minAge) {
            setMaxAge(minAge);
            return;
        }
        setMaxAge(newValue);
    }

    const minChange = (e) => {
        const { value } = e.target;
        let newValue = value.replace(/[^\d]/g, '');
        newValue = Number(newValue)
        if(newValue > maxAge) {
            setMinAge(maxAge);
            return
        }
        setMinAge(newValue);
    }

    useMemo(() => {
        let filterArr = JSON.parse(JSON.stringify(infoAboutContentList));
        let filetEnd = [];

        if (country) {
            filetEnd = filterArr.filter((content) => {
                for (let i of content.countries) {
                    if (i.country === country) {
                        return true
                    }
                }
            })
            if(filetEnd.length === 0) {
                filterContent([]);
                return
            }
        };

        if (genre) {
            if (filetEnd.length === 0) {
                filetEnd = filterArr.filter((content) => {
                    for (let i of content.genres) {
                        if (i.genre === genre) {
                            return true
                        }
                    }
                })
                if(filetEnd.length === 0) {
                    filterContent([]);
                    return
                }
            } else {
                filetEnd = filetEnd.filter((content) => {
                    for (let i of content.genres) {
                        if (i.genre === genre) {
                            return true
                        }
                    }
                })
                if(filetEnd.length === 0) {
                    filterContent([]);
                    return
                }
            }
        };

        if(filetEnd.length === 0) {
            filetEnd = filterArr.filter((content) => {
                if (Number(content.year) <= maxAge && Number(content.year) >= minAge) {
                    return true
                }
            })
            if(filetEnd.length === 0) {
                filterContent([]);
                return
            }
        } else {
            filetEnd = filetEnd.filter((content) => {
                if (Number(content.year) <= maxAge && Number(content.year) >= minAge) {
                    return true
                }
            })
            if(filetEnd.length === 0) {
                filterContent([]);
                return
            }
        };

        filterContent(filetEnd)
    }, [infoAboutContentList])

    const filter = (e) => {
        e.preventDefault();

        let filterArr = JSON.parse(JSON.stringify(infoAboutContentList));
        let filetEnd = [];

        if (country) {
            filetEnd = filterArr.filter((content) => {
                for (let i of content.countries) {
                    if (i.country === country) {
                        return true
                    }
                }
            })
            if(filetEnd.length === 0) {
                filterContent([]);
                return
            }
        };

        if (genre) {
            if (filetEnd.length === 0) {
                filetEnd = filterArr.filter((content) => {
                    for (let i of content.genres) {
                        if (i.genre === genre) {
                            return true
                        }
                    }
                })
                if(filetEnd.length === 0) {
                    filterContent([]);
                    return
                }
            } else {
                filetEnd = filetEnd.filter((content) => {
                    for (let i of content.genres) {
                        if (i.genre === genre) {
                            return true
                        }
                    }
                })
                if(filetEnd.length === 0) {
                    filterContent([]);
                    return
                }
            }
        };

        if(filetEnd.length === 0) {
            filetEnd = filterArr.filter((content) => {
                if (Number(content.year) <= maxAge && Number(content.year) >= minAge) {
                    return true
                }
            })
            if(filetEnd.length === 0) {
                filterContent([]);
                return
            }
        } else {
            filetEnd = filetEnd.filter((content) => {
                if (Number(content.year) <= maxAge && Number(content.year) >= minAge) {
                    return true
                }
            })
            if(filetEnd.length === 0) {
                filterContent([]);
                return
            }
        };

        filterContent(filetEnd)
    }

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <div className={`center`}>
                    <div
                        style={{width: '70%'}}
                    >
                        <Slider
                            min={1885}
                            max={new Date().getFullYear() + 10}
                            getAriaLabel={() => 'Temperature range'}
                            value={[minAge, maxAge]}
                            onChange={handleChangAge}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <div>
                        <TextField style={{margin: `3px`}} id="standard-basic" label="Начало периода" value={minAge} onInput={minChange}/>
                        <TextField style={{margin: `3px`}} id="standard-basic" label="Конец периода" value={maxAge} onInput={maxChange}/>
                    </div>
                </div>
            </Box>
            <div className={'center'}>
                <div>
                    <FormControl variant="standard" style={{margin: `15px`, minWidth: 120}}>
                        <InputLabel id="demo-simple-select-standard-label">Genre</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={genre}
                            onChange={handleChangGenre}
                            label="Genre"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {allGenre.map(g => (
                                <MenuItem value={g.genre} key={g.id}>
                                    {g.genre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="standard" style={{margin: `15px`, minWidth: 120}}>
                        <InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={country}
                            onChange={handleChangCountru}
                            label="Country"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {allCountry.map(g => (
                                <MenuItem value={g.country} key={g.id}>
                                    {g.country}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl variant="standard" sx={{minWidth: 120 }}>
                        <Button
                            onClick={filter}
                            variant="contained"
                            color="primary"
                        >
                            Поиск
                        </Button>
                    </FormControl>
                </div>

            </div>

        </div>
    );
};

export default ContentFilter;