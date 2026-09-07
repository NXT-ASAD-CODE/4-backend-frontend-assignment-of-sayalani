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
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TranslateIcon from '@mui/icons-material/Translate';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';

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
    const location = useLocation();
    const { selectedLanguage, selectLanguage, text, languages } = useLanguage();
    const { notifications, markAsRead, removeNotification } = useNotifications();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    const isMenuOpen = Boolean(anchorEl);
    const isLanguageMenuOpen = Boolean(languageAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isNotificationMenuOpen = Boolean(notificationAnchorEl);
    const isDashboardPage = location.pathname === '/dashboard';
    const unreadNotifications = notifications.filter((notification) => !notification.read);
    const sortedNotifications = [...notifications].sort(
        (first, second) => Number(first.read) - Number(second.read)
    );

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

    const handleDrawerToggle = (open) => () => {
        setIsDrawerOpen(open);
    };

    const handleDrawerNavigate = (path) => {
        navigate(path);
        setIsDrawerOpen(false);
    };

    const handleDrawerSectionNavigate = (sectionId) => {
        navigate('/');
        setIsDrawerOpen(false);
        setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleLanguageMenuOpen = (event) => {
        setLanguageAnchorEl(event.currentTarget);
    };

    const handleLanguageMenuClose = () => {
        setLanguageAnchorEl(null);
    };

    const handleLanguageSelect = (language) => {
        selectLanguage(language);
        handleLanguageMenuClose();
        handleMobileMenuClose();
    };

    const handleNotificationMenuOpen = (event) => {
        setNotificationAnchorEl(event.currentTarget);
        handleMobileMenuClose();
    };

    const handleNotificationMenuClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleNotificationClick = (notificationId) => {
        markAsRead(notificationId);
    };

    React.useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handleFullscreenToggle = async () => {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        } else {
            await document.documentElement.requestFullscreen();
        }
        handleMobileMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const languageMenuId = 'language-menu';
    const notificationMenuId = 'notification-menu';
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
            <MenuItem onClick={handleMenuClose}>{text.profile}</MenuItem>
            <MenuItem onClick={handleMenuClose}>{text.myAccount}</MenuItem>
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

    const renderNotificationMenu = (
        <Menu
            anchorEl={notificationAnchorEl}
            id={notificationMenuId}
            open={isNotificationMenuOpen}
            onClose={handleNotificationMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{ paper: { sx: { width: 320, maxWidth: 'calc(100vw - 32px)' } } }}
        >
            <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #eee' }}>
                <Typography sx={{ fontWeight: 700, color: '#111' }}>
                    {text.notifications}
                </Typography>
            </Box>
            {sortedNotifications.map((notification) => (
                <MenuItem
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    sx={{
                        alignItems: 'flex-start',
                        gap: 1,
                        whiteSpace: 'normal',
                        backgroundColor: notification.read ? 'transparent' : '#f5f7ff',
                    }}
                >
                    <IconButton
                        size="small"
                        aria-label="delete notification"
                        onClick={(event) => {
                            event.stopPropagation();
                            removeNotification(notification.id);
                        }}
                        sx={{ color: '#777', flexShrink: 0, mt: -0.5 }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    {!notification.read && (
                        <Box sx={{ width: 8, height: 8, mt: 0.8, borderRadius: '50%', backgroundColor: '#1976d2', flexShrink: 0 }} />
                    )}
                    <Box>
                        <Typography sx={{ fontSize: 14, fontWeight: notification.read ? 400 : 700, color: '#111' }}>
                            {notification.message}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: '#777' }}>
                            {notification.read ? 'Read' : 'Unread'}
                        </Typography>
                    </Box>
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
                <p>{text.category}</p>
            </MenuItem>
            <MenuItem onClick={() => {
                navigate('/dashboard');
                handleMobileMenuClose();
            }}>
                <p>{text.dashboard}</p>
            </MenuItem>
            <MenuItem onClick={() => {
                navigate('/');
                setTimeout(() => {
                    document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
                handleMobileMenuClose();
            }}>
                <p>{text.newArrivals}</p>
            </MenuItem>
            <MenuItem onClick={() => {
                navigate('/');
                setTimeout(() => {
                    document.getElementById('top-selling')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
                handleMobileMenuClose();
            }}>
                <p>{text.topSelling}</p>
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
                <p>{text.cart}</p>
            </MenuItem>
            <MenuItem aria-label={text.notifications}>
                <IconButton
                    size="large"
                    aria-label={text.notifications}
                    aria-controls={isNotificationMenuOpen ? notificationMenuId : undefined}
                    aria-haspopup="true"
                    onClick={handleNotificationMenuOpen}
                    color="inherit"
                >
                    <Badge badgeContent={unreadNotifications.length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>{text.notifications}</p>
            </MenuItem>
            <MenuItem
                onClick={handleLanguageMenuOpen}
                aria-controls={isLanguageMenuOpen ? languageMenuId : undefined}
                aria-haspopup="true"
            >
                <TranslateIcon sx={{ marginRight: 1 }} />
                <p>{selectedLanguage}</p>
            </MenuItem>
            <MenuItem onClick={handleFullscreenToggle}>
                {isFullscreen ? <FullscreenExitIcon sx={{ marginRight: 1 }} /> : <FullscreenIcon sx={{ marginRight: 1 }} />}
                <p>{isFullscreen ? text.exitFullscreen : text.fullscreen}</p>
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
                <p>{text.profile}</p>
            </MenuItem>
        </Menu>
    );

    const renderDrawer = (
        <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={handleDrawerToggle(false)}
            transitionDuration={300}
            slotProps={{
                paper: {
                    sx: {
                        width: { xs: '100vw', sm: '20vw' },
                        backgroundColor: '#111936',
                        color: '#BDC8F0',
                    },
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>SHOP.CO</Typography>
                <IconButton aria-label="close navigation" onClick={handleDrawerToggle(false)} sx={{ color: '#fff' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List component="nav" sx={{ px: 1 }}>
                {isDashboardPage ? (
                    <>
                        <Typography sx={{ px: 2, py: 1, color: '#E3F2F7', fontWeight: 200 }}>
                            Dashboard
                        </Typography>
                        {['Default', 'Analytics', 'Invoice', 'CRM', 'Blog'].map((option) => (
                            <ListItemButton
                                key={option}
                                onClick={handleDrawerToggle(false)}
                                sx={{ color: '#BDC8F0' }}
                            >
                                <ListItemText primary={option} />
                            </ListItemButton>
                        ))}
                        <hr style={{ border: 0, borderTop: '1px solid #d3d3d3', margin: '12px 16px' }} />
                        <Typography sx={{ px: 2, py: 1, color: '#E3F2F7', fontWeight: 200 }}>
                            Widget
                        </Typography>
                        {['Statistics', 'Data', 'Chart'].map((option) => (
                            <ListItemButton
                                key={option}
                                onClick={handleDrawerToggle(false)}
                                sx={{ color: '#BDC8F0' }}
                            >
                                <ListItemText primary={option} />
                            </ListItemButton>
                        ))}
                    </>
                ) : (
                    <>
                        <ListItemButton onClick={() => handleDrawerNavigate('/category')} sx={{ color: '#000' }}>
                            <ListItemText primary={text.category} />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleDrawerNavigate('/dashboard')} sx={{ color: '#000' }}>
                            <ListItemText primary={text.dashboard} />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleDrawerSectionNavigate('new-arrivals')} sx={{ color: '#000' }}>
                            <ListItemText primary={text.newArrivals} />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleDrawerSectionNavigate('top-selling')} sx={{ color: '#000' }}>
                            <ListItemText primary={text.topSelling} />
                        </ListItemButton>
                        <ListItemButton onClick={() => handleDrawerNavigate('/cart')} sx={{ color: '#000' }}>
                            <ListItemText primary={text.cart} />
                        </ListItemButton>
                    </>
                )}
            </List>
        </Drawer>
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
                        aria-expanded={isDrawerOpen}
                        onClick={handleDrawerToggle(true)}
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
                        {text.category}
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
                        {text.dashboard}
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
                        {text.newArrivals}
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
                        {text.topSelling}
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder={`${text.search}…`}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label={isFullscreen ? 'exit fullscreen' : 'enter fullscreen'}
                            onClick={handleFullscreenToggle}
                            color="inherit"
                        >
                            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label={text.notifications}
                            aria-controls={isNotificationMenuOpen ? notificationMenuId : undefined}
                            aria-haspopup="true"
                            onClick={handleNotificationMenuOpen}
                            color="inherit"
                        >
                            <Badge badgeContent={unreadNotifications.length} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
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
            {renderDrawer}
            {renderMenu}
            {renderLanguageMenu}
            {renderNotificationMenu}
        </Box>
    );
}
