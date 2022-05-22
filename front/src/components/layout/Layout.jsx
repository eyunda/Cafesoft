import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Header from './Header'
import MenuApp from './Menu'
import Footer from './Footer'
import './Header/Header.css'

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 64
const DRAWER_WIDTH = 280

const RootStyle = styled('div')({
	display: 'flex',
	minHeight: '100%',
	overflow: 'hidden'
})

const MainStyle = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		overflow: 'hidden',
		minHeight: '100%',
		paddingTop: APP_BAR_MOBILE + 24,
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.up('lg')]: {
			paddingTop: APP_BAR_DESKTOP + 24,
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2)
		},
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: `-${DRAWER_WIDTH}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginLeft: 0
		})
	})
)

// ----------------------------------------------------------------------

const Layout = ({ children }) => {
	const [openMobile, setOpenMobile] = useState(false)
	const [openDesktop, setOpenDesktop] = useState(false)

	return (
		<RootStyle>
			<Header onOpenSidebar={() => setOpenMobile(true)} isOpenSidebarDesktop={openDesktop} onSidebarDesktop={() => setOpenDesktop(prev => !prev)} className='header'/>
			<MenuApp isOpenSidebar={openMobile} onCloseSidebar={() => setOpenMobile(false)} isOpenSidebarDesktop={openDesktop} className='header'/>
			<MainStyle open={openDesktop} >
				{children}
			</MainStyle>
			<Footer onOpenSidebar={() => setOpenMobile(true)} isOpenSidebarDesktop={openDesktop} onSidebarDesktop={() => setOpenDesktop(prev => !prev)} />
		</RootStyle>
	)
}

export default Layout