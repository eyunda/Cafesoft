import React from 'react'
import { Box, Container, Typography, Grid, Button } from '@mui/material'
import Page from '../../common/Page'
import bgImage from './video.mp4'
import './Dashboard.css'
import Facebook from './facebook.jpg'
import Instagram from './instagram.png'
import Whasap from './whasap.png'
// ----------------------------------------------------------------------


const Dashboard = () => {

	return (
		<Page title="Cafesoft | Inicio">
			<Container maxWidth="xl">
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Typography sx={{ mt: 2, fontWeight: 'bold' }} className='tituloo'>Bienvenido a</Typography>
					<Typography sx={{ mt: 2, fontWeight: 'bold' }} className='titulo'>Cafesoft</Typography>
				</Box>
				<Grid container spacing={4}>
					<Grid item xs={5} sm={5}>
						<video autoPlay loop muted className='video'>
							<source src={bgImage} type="video/mp4" />
						</video>
					</Grid>
					<Grid item xs={7} sm={7}>
							<Button className='face'><img src={Facebook} /></Button>
							<Button><img src={Instagram} className='insta'/></Button>
							<Button><img src={Whasap} className='wha'/></Button>
					</Grid>
				</Grid>
			</Container>
		</Page>
	)
}

export default Dashboard