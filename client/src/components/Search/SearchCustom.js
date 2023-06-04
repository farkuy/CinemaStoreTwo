import React, {useEffect, useMemo, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
const SearchCustom  = () => {

    const [search, setSearch] = useState(``);

    const searchContent = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    return (
        <Box sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
            <SearchIcon sx={{ marginRight: '10px' }} />
            <Input
                value={search}
                placeholder={'search...'}
                onChange={searchContent}
                sx={{width: `100%`,  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' ,color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.1rem'}}
                disableUnderline
            />
        </Box>
    )
}

export default SearchCustom;

