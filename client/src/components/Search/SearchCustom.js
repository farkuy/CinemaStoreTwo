import React, {useEffect, useMemo, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import './SerachStyle.css'
const SearchCustom  = () => {

    const [search, setSearch] = useState(``);

    const searchContent = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    return (
        <Box sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
            <div className={'search'}>
                <SearchIcon sx={{ marginRight: '10px', color: 'rgba(255, 255, 255, 1)' }} />
                <Input
                    value={search}
                    placeholder={'search...'}
                    onChange={searchContent}
                    sx={{width: `100%`,color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.1rem'}}
                    disableUnderline
                />
            </div>

        </Box>
    )
}

export default SearchCustom;

