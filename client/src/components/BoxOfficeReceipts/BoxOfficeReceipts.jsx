import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import ReplayIcon from '@mui/icons-material/Replay';
import React, {useEffect, useMemo, useState} from "react";
import {getTop100PopularFilms, miscellaneousInformation} from "../../http/kinopoiskApi";
import './BoxOfficeReceiptsStyle.css'
import {CardActionArea, CardMedia, IconButton, Typography} from "@mui/material";

const BoxOfficeReceipts = () => {
    const [rows, setRows] = useState([]);
    const [filterRows, setFilterRows] = useState([])
    const [load, setLoad] = useState(false);
    const [budget, setBudget] = useState('normal');
    const [cashRus, setCashRus] = useState('normal');
    const [cashWorld, setCashWorld] = useState('normal');

    async function getCash(id) {
        const cash = await miscellaneousInformation.getCashFilm(id);
        if (cash.items) return cash.items
    }
    async function getTop() {
        const info = await getTop100PopularFilms.getMostAnticipatedMovies(1);
        const arr = info.films.slice(0, 10);
        const ff = []
        for (const film of arr) {
            const money = await getCash(film.filmId);
            const objCash = {
                'BUDGET': '—',
                'RUS': '—',
                'WORLD': '—',
            };
            money.forEach((flm) => {
                if (flm.type === 'BUDGET') {
                    objCash['BUDGET'] = flm.amount;
                }
                if (flm.type === 'RUS') {
                    objCash['RUS'] = flm.amount;
                }
                if (flm.type === 'WORLD') {
                    objCash['WORLD'] = flm.amount;
                }
            })
            objCash.name = film.nameRu;
            objCash.url = film.posterUrlPreview;
            objCash.year = film.year;
            ff.push(objCash)
        }
        return ff
    }

    useMemo(() => {
        try {
            getTop()
                .then(data => {
                    setRows(data);
                    setFilterRows(data)
                    setLoad(true)
                })
        }
        catch (e) {
            console.log(`Ошибка при получении данных`)
        }
    }, [])

    const sortMoneyLow = (setFunc, str, nameSort) => {
        const arr = [...filterRows].sort((a, b) => {
            if (a[nameSort] === '—') {
                return 0 - b[nameSort]
            }
            if (b[nameSort] === '—') {
                return a[nameSort] - 0
            }
            return a[nameSort] - b[nameSort]
        })
        setFilterRows(arr)
        setFunc(str);
    }


    const sortMoneyUp= (setFunc, str, nameSort) => {
        const arr = [...filterRows].sort((a, b) => {
            if (a[nameSort] === '—') {
                return b[nameSort] - 0
            }
            if (b[nameSort] === '—') {
                return 0 - a[nameSort]
            }
            return b[nameSort] - a[nameSort]
        })
        setFilterRows(arr)
        setFunc(str);
    }

    const reload = (setFunc, str) => {
        setFunc(str);
        setFilterRows(rows);
    }

    return (
        <div className={'table'}>
            <Typography style={{margin: '10px'}} variant="h4">Кассовые сборы</Typography>
            <Table className={'center'} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Название</TableCell>
                        <TableCell align="right">Постер</TableCell>
                        <TableCell align="right">
                            $ Бюджет
                            {
                                budget === 'normal' && load
                                    ? <IconButton style={{zIndex: 999}}
                                                  onClick={(e) => sortMoneyUp(setBudget, 'up', 'BUDGET')}
                                    >
                                        <NorthIcon/>
                                    </IconButton>
                                    : budget === 'up' && load
                                        ? <IconButton style={{zIndex: 999}}
                                                      onClick={(e) => sortMoneyLow(setBudget, 'low', 'BUDGET')}
                                        >
                                            <SouthIcon/>
                                        </IconButton>
                                        :  <IconButton style={{zIndex: 999}}
                                                       onClick={(e) => reload(setBudget, 'normal')}
                                        >
                                            <ReplayIcon/>
                                        </IconButton>
                            }
                        </TableCell>
                        <TableCell align="right">
                            $ Сборы в РФ
                            {
                                cashRus === 'normal' && load
                                    ? <IconButton style={{zIndex: 999}}
                                                  onClick={(e) => sortMoneyUp(setCashRus, 'up', 'RUS')}
                                    >
                                        <NorthIcon/>
                                    </IconButton>
                                    : cashRus === 'up' && load
                                        ? <IconButton style={{zIndex: 999}}
                                                      onClick={(e) => sortMoneyLow(setCashRus, 'low', 'RUS')}
                                        >
                                            <SouthIcon/>
                                        </IconButton>
                                        :  <IconButton style={{zIndex: 999}}
                                                       onClick={(e) => reload(setCashRus, 'normal')}
                                        >
                                            <ReplayIcon/>
                                        </IconButton>
                            }
                        </TableCell>
                        <TableCell align="right">
                            $ Мировые сборы
                            {
                                cashWorld === 'normal' && load
                                    ? <IconButton style={{zIndex: 999}}
                                                  onClick={(e) => sortMoneyUp(setCashWorld, 'up', 'WORLD')}
                                    >
                                        <NorthIcon/>
                                    </IconButton>
                                    : cashWorld === 'up' && load
                                        ? <IconButton style={{zIndex: 999}}
                                                      onClick={(e) => sortMoneyLow(setCashWorld, 'low', 'WORLD')}
                                        >
                                            <SouthIcon/>
                                        </IconButton>
                                        :  <IconButton style={{zIndex: 999}}
                                                       onClick={(e) => reload(setCashWorld, 'normal')}
                                        >
                                            <ReplayIcon/>
                                        </IconButton>
                            }
                        </TableCell>
                        <TableCell align="right">Дата выхода</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {load && filterRows.map((row, index) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">
                                <CardActionArea>
                                    <CardMedia
                                        style={{width: 50, height: 50}}
                                        component="img"
                                        image={`${row.url}`}
                                        alt="green iguana"
                                    />
                                </CardActionArea>
                            </TableCell>
                            <TableCell align="center">
                                {`${row['BUDGET']}`}
                            </TableCell>
                            <TableCell align="center">
                                {`${row['RUS']}`}
                            </TableCell>
                            <TableCell align="center">
                                {`${row['WORLD']}`}
                            </TableCell>
                            <TableCell align="center">{row.year}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default BoxOfficeReceipts;