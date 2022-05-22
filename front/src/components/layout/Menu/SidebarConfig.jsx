import React from 'react'
import { PersonOutlined, HomeOutlined } from '@mui/icons-material'
import BallotIcon from '@mui/icons-material/Ballot';
import ApartmentSharpIcon from '@mui/icons-material/ApartmentSharp';
import PendingActionsSharpIcon from '@mui/icons-material/PendingActionsSharp';
import PhotoCameraFrontSharpIcon from '@mui/icons-material/PhotoCameraFrontSharp';

const sidebarConfig = [
	{
		title: 'Inicio',
		path: '/app',
		icon: <HomeOutlined />
	},
	{
		title: 'Usuarios',
		path: '/app/usuarios',
		icon: <PersonOutlined />
	},
	{
		title: 'Cargos de la semana',
		path: '/app/cargos',
		icon: <BallotIcon />
	},
	{
		title: 'Cargos',
		path: '/app/cargo',
		icon: <ApartmentSharpIcon />
	},
	{
		title: 'Peso del cafe',
		path: '/app/peso',
		icon: <PendingActionsSharpIcon />
	},
	{
		title: 'Pago de Nomina',
		path: '/app/nomina',
		icon: <PhotoCameraFrontSharpIcon />
	}
]

export default sidebarConfig