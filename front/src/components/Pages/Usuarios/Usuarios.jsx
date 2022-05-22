import React, { useState, useEffect } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'
import './usuarios.css'
import PrintIcon from '@material-ui/icons/Print'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';

const Usuarios = () => {
	const initialState = {
		avatar: 'https://i.imgur.com/gh3fPj5.png',
		nombre: "",
		planeta: ""
	}
	const [usuariosList, setUsuariosList] = useState([])
	const [body, setBody] = useState(initialState)
	const [openDialog, setOpenDialog] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

	const init = async () => {
		const { data } = await ApiRequest().get('/usuarios')
		setUsuariosList(data)
	}

	const columns = [
		{
			field: 'avatar',
			headerName: 'Avatar',
			width: 100,
			renderCell: (params) => (
				<Avatar src={params.value} />
			)
		},
		{ field: 'nombre', headerName: 'Nombre', width: 100 },
		{ field: 'apellido', headerName: 'Apellido', width: 100 },
		{ field: 'edad', headerName: 'Edad', width: 100 },
		{ field: 'documento', headerName: 'Documento Identidad', width: 120 },
		{ field: 'telefono', headerName: 'Telefono', width: 120 },
		{ field: 'email', headerName: 'Correo', width: 180 },
		{ field: 'username', headerName: 'Username', width: 100 },
		{ field: 'password', headerName: 'Password', width: 100 },
		{
			field: '',
			headerName: 'Acciones',
			width: 200,
			renderCell: (params) => (
				<Stack direction='row' divider={<Divider orientation="vertical" flexItem />} justifyContent="center" alignItems="center" spacing={2}>
					<IconButton size='small' onClick={() => {
						setIsEdit(true)
						setBody(params.row)
						handleDialog()
					}}>
						<EditOutlined />
					</IconButton>
					<IconButton size='small' onClick={() => onDelete(params.id)}>
						<DeleteOutline />
					</IconButton>
				</Stack>
			)
		}
	]

	const onDelete = async (id) => {
		try {
			const { data } = await ApiRequest().post('/eliminar', { id: id })
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	const handleDialog = () => {
		setOpenDialog(prev => !prev)
	}

	const onChange = ({ target }) => {
		const { name, value } = target
		setBody({
			...body,
			[name]: value
		})
	}

	const onSubmit = async () => {
		try {
			const { data } = await ApiRequest().post('/guardar', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
			setIsEdit(false)
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	const onEdit = async () => {
		try {
			const { data } = await ApiRequest().post('/editar', body)
			handleDialog()
			setBody(initialState)
			setMensaje({
				ident: new Date().getTime(),
				message: data.message,
				type: 'success'
			})
			init()
		} catch ({ response }) {
			setMensaje({
				ident: new Date().getTime(),
				message: response.data.sqlMessage,
				type: 'error'
			})
		}
	}

	useEffect(init, [])

	const pdfExportComponent = useRef(null);
	const contentArea = useRef(null);
	    
	const handleExportWithComponent = (event) => {
		pdfExportComponent.current.save();
	}

	return (
		<>
			<PDFExport ref={pdfExportComponent} paperSize="A2">
				<div ref={contentArea}>	
					<Dialog maxWidth='xs' open={openDialog} onClose={handleDialog}>
						<DialogTitle>
							{isEdit ? 'Editar Usuario' : 'Crear Usuario'}
						</DialogTitle>
						<DialogContent>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='avatar'
										value={body.avatar}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Avatar'
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='nombre'
										value={body.nombre}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Nombre'
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='apellido'
										value={body.apellido}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Apellido'
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='edad'
										value={body.edad}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Edad'
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='documento'
										value={body.documento}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Documento de Identidad'
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='telefono'
										value={body.telefono}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Telefono'
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='email'
										value={body.email}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Correo'
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='username'
										value={body.username}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Username'
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='password'
										value={body.password}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Password'
									/>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
							<Button variant='contained' color='primary' onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
						</DialogActions>
					</Dialog>
					<Page title="Cafesoft | Usuarios">
						<ToastAutoHide message={mensaje} />
						<Container maxWidth='lg'>
							<Box sx={{ pb: 1 }}>
								<Typography variant="h5" className="titulo">Lista de usuarios</Typography>
							</Box>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={4}>
									<Button onClick={handleDialog} startIcon={<AddOutlined />} variant='contained' color='secondary'>Nuevo</Button>
								</Grid>
								<Grid item xs={12} sm={8} />
								<Grid item xs={12} sm={12}>
									<CommonTable data={usuariosList} columns={columns} />
								</Grid>
							</Grid>
						</Container>
					</Page>
					<Button primary={true} onClick={handleExportWithComponent} startIcon={<PrintIcon />}>Descargar</Button>
				</div>
			</PDFExport>
		</>
	)
}

export default Usuarios