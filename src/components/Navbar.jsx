import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TranslateIcon from '@mui/icons-material/Translate';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "30px",
    backgroundColor: "#f1f3f5",

    "&:hover": {
        backgroundColor: "#e9ecef",
    },

    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",

    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar({ cartCount = 0 }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [selectedLanguage, setSelectedLanguage] = React.useState('English');

    const isMenuOpen = Boolean(anchorEl);
    const isLanguageMenuOpen = Boolean(languageAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLanguageMenuOpen = (event) => {
        setLanguageAnchorEl(event.currentTarget);
    };

    const handleLanguageMenuClose = () => {
        setLanguageAnchorEl(null);
    };

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        handleLanguageMenuClose();
        handleMobileMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const languageMenuId = 'language-menu';
    const languages = ['English', 'French', 'Romanian', 'Chinese'];
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const renderLanguageMenu = (
        <Menu
            anchorEl={languageAnchorEl}
            id={languageMenuId}
            open={isLanguageMenuOpen}
            onClose={handleLanguageMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            {languages.map((language) => (
                <MenuItem key={language} onClick={() => handleLanguageSelect(language)}>
                    {language}
                </MenuItem>
            ))}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => navigate('/category')}>
                <p>Category</p>
            </MenuItem>
            <MenuItem onClick={() => {
                navigate('/dashboard');
                handleMobileMenuClose();
            }}>
                <p>Dashboard</p>
            </MenuItem>
            <MenuItem onClick={() => {
                navigate('/');
                setTimeout(() => {
                    document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
                handleMobileMenuClose();
            }}>
                <p>New Arrivals</p>
            </MenuItem>
            <MenuItem onClick={() => {
                navigate('/');
                setTimeout(() => {
                    document.getElementById('top-selling')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
                handleMobileMenuClose();
            }}>
                <p>Top Selling</p>
            </MenuItem>
            <MenuItem onClick={() => navigate('/cart')}>
                <IconButton
                    size="large"
                    aria-label="go to cart"
                    color="inherit"
                >
                    <Badge badgeContent={cartCount} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem
                onClick={handleLanguageMenuOpen}
                aria-controls={isLanguageMenuOpen ? languageMenuId : undefined}
                aria-haspopup="true"
            >
                <TranslateIcon sx={{ marginRight: 1 }} />
                <p>{selectedLanguage}</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    color: "black",
                }}>
                <Toolbar
                    sx={{
                        minHeight: {
                            xs: "60px",
                            sm: "70px",
                            md: "80px",
                        },
                    }}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        component="button"
                        onClick={() => navigate('/')}
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            fontWeight: "900",
                            background: 'transparent',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            color: 'black',
                            fontFamily: 'inherit',
                            textAlign: 'left'
                        }}
                    >
                        SHOP.CO
                    </Typography>
                    <Typography
                        variant="body1"
                        onClick={() => navigate('/category')}
                        sx={{
                            marginLeft: 2,
                            fontWeight: 700,
                            cursor: 'pointer',
                            color: '#111',
                            display: { xs: 'none', md: 'block' },
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Category
                    </Typography>
                    <Typography
                        variant="body1"
                        onClick={() => navigate('/dashboard')}
                        sx={{
                            marginLeft: 2,
                            fontWeight: 700,
                            cursor: 'pointer',
                            color: '#111',
                            display: { xs: 'none', md: 'block' },
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Dashboard
                    </Typography>
                    <Typography
                        variant="body1"
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => {
                                document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                        }}
                        sx={{
                            marginLeft: 2,
                            fontWeight: 700,
                            cursor: 'pointer',
                            color: '#111',
                            display: { xs: 'none', md: 'block' },
                            whiteSpace: 'nowrap'
                        }}
                    >
                        New Arrivals
                    </Typography>
                    <Typography
                        variant="body1"
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => {
                                document.getElementById('top-selling')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                        }}
                        sx={{
                            marginLeft: 2,
                            fontWeight: 700,
                            cursor: 'pointer',
                            color: '#111',
                            display: { xs: 'none', md: 'block' },
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Top Selling
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label={`select language, current language ${selectedLanguage}`}
                            aria-controls={isLanguageMenuOpen ? languageMenuId : undefined}
                            aria-haspopup="true"
                            onClick={handleLanguageMenuOpen}
                            color="inherit"
                        >
                            <TranslateIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="go to cart"
                            color="inherit"
                            onClick={() => navigate('/cart')}
                        >
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {renderLanguageMenu}
        </Box>
    );
}
