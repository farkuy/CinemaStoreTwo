import React, {useEffect, useMemo, useState} from 'react';
import {
    Divider,
    List, Typography,
} from "@mui/material";
import {miscellaneousInformation} from "../../http/kinopoiskApi";
import {months} from "../../utils/constsForApi";
import PremierBox from "./PremierBox";
import './PremierListStyle.css'

const PremiereList = () => {
    const [premierList, setPremierList] = useState([]);
    const [month, setMonth] = useState(`${new Date().getMonth()}`);
    const [year, setYear] = useState(`${new Date().getFullYear()}`);
    const [releasesList, setReleasesList] = useState([]);


    useMemo( () => {
        const assyncGet = async () => {
            const convertToNameMonth = months[`${month}`].toUpperCase()
            const allPremier = await miscellaneousInformation.getPremiereList(year, convertToNameMonth);
            setPremierList(allPremier.items)
            const releases = await miscellaneousInformation.getReleases(year, convertToNameMonth, 1)
            setReleasesList(releases.releases)
        }
        assyncGet()
    }, [])


    return (
        <div className={'flexCenter'}>
            <Typography className={'flex'} component="div" variant="h4">
                Премьеры
            </Typography>
            <div className={'flex'}>
                <div className={'flexCenter'}>
                    <List className={'flexCenter'} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <Typography className={'flex'} component="div" variant="h6">
                            Премеры месяца
                        </Typography>
                        {
                            premierList.length > 0 && [...premierList].slice(0, 5).map((prem, index) => {
                                return <PremierBox key={prem.filmId} info={prem}/>
                            })
                        }
                    </List>
                </div>
                <div className={'flexCenter'}>
                    <List className={'flexCenter'} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <Typography className={'flex'} component="div" variant="h6">
                            Цифровые релизы месяца
                        </Typography>
                        {
                            releasesList.length > 0 && [...releasesList].slice(0, 5).map((prem, index) => {
                                return <PremierBox key={prem.filmId} info={prem}/>
                            })
                        }
                    </List>
                </div>
            </div>
        </div>
    );
};

export default PremiereList;