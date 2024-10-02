'use client'
import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, InputBase } from '@mui/material';
import { Search, PushPin } from '@mui/icons-material';
import { PropsNote } from '@/lib/propsState';

interface PropsState {
    searchItem: string;
    setSearchItem: React.Dispatch<React.SetStateAction<string>>
    notePin: PropsNote[];
    isPin: boolean
    setIsPin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<PropsState> = ({ searchItem, setSearchItem, setIsPin, isPin }) => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1e88e5', borderRadius: "4px" }}>
            <Toolbar>
                {/* Title */}
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Note App
                </Typography>

                {/* Search Bar */}
                <Box sx={{ position: 'relative', borderRadius: 1, backgroundColor: 'rgba(255, 255, 255, 0.15)', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' }, mr: 2, ml: { xs: 0, md: 3 }, width: { xs: '100%', md: 'auto' } }}>
                    <Box sx={{ padding: '0 10px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Search />
                    </Box>
                    <InputBase
                        placeholder="Search notes…"
                        inputProps={{ 'aria-label': 'search' }}
                        sx={{ color: 'inherit', pl: 5, width: { xs: '100%', md: 200 } }}
                        onChange={(e) => setSearchItem(e.target.value)}
                        value={searchItem}
                    />
                </Box>

                {/* Pin Note Icon */}
                <IconButton color="inherit" onClick={() => setIsPin(!isPin)}>
                    <PushPin />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
