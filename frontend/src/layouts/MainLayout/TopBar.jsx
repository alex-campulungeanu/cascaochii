import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link as RouterLink } from 'react-router-dom'

import Logo from '../../components/Logo'

const TopBar = () => {
  return (
    <AppBar position="static">
          <Toolbar>
            <RouterLink to="/games">
                <Box sx={{marginRight: '20px'}}>
                  <Logo />
                </Box>
            </RouterLink>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
              Casca ochii !
            </Typography>
          </Toolbar>
    </AppBar>
    // <AppBar elevation={0} >
    //   <Toolbar>
    //     {/* <RouterLink to="/">
    //       <Logo />
    //     </RouterLink> */}
    //     <Box flexGrow={1} />
    //     <Hidden mdDown>
    //       {/* <IconButton color="inherit">
    //         <Badge badgeContent={notifications.length} color="primary" variant="dot" >
    //           <NotificationsIcon />
    //         </Badge>
    //       </IconButton> */}
    //       <IconButton color="inherit" onClick = {() => setConfirmOpen(true)}>
    //         <InputIcon />
    //       </IconButton>
    //     </Hidden>
    //     <Hidden lgUp>
    //       <IconButton color="inherit" onClick={onMobileNavOpen} >
    //         <MenuIcon />
    //       </IconButton>
    //     </Hidden>
    //   </Toolbar>
    //   <ConfirmModal 
    //     content='Are you sure you want to leeeave us ?'
    //     open={confirmOpen}
    //     setOpen={setConfirmOpen}
    //     onConfirm={handleLogout}
    //   />
    // </AppBar>
  )
}

export default TopBar
