import React, { useState, useEffect } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'
import './Cargos.css'

const Cargos = () => {
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
		const { data } = await ApiRequest().get('/cargos')
		setUsuariosList(data)
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 80 },
		{ field: 'nombre', headerName: 'Nombre', width: 200 },
		{ field: 'apellido', headerName: 'Apellido', width: 200 },
		{ field: 'cargo', headerName: 'Cargo', width: 200 },
		{ field: 'dia', headerName: 'Dia', width: 100 },
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
			const { data } = await ApiRequest().post('/cargos/eliminar', { id: id })
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
			const { data } = await ApiRequest().post('/cargos/guardar', body)
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
			const { data } = await ApiRequest().post('/cargos/editar', body)
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

	return (
		<>
			<Dialog maxWidth='xs' open={openDialog} onClose={handleDialog}>
				<DialogTitle>
					{isEdit ? 'Editar Usuario' : 'Crear Usuario'}
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
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
								name='id_cargo'
								value={body.id_cargo}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Cargo'
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TextField
								margin='normal'
								name='dia'
								value={body.dia}
								onChange={onChange}
								variant='outlined'
								size='small'
								color='primary'
								fullWidth
								label='Dia'
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
					<Button variant='contained' color='primary' onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
				</DialogActions>
			</Dialog>
			<Page title="Cafesoft | Cargos">
				<ToastAutoHide message={mensaje} />
				<Container maxWidth='lg'>
					<Box sx={{ pb: 1 }}>
						<Typography variant="h5" className="titulo">Lista de los Cargos</Typography>
					</Box>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={8} />
						<Grid item xs={12} sm={12}>
							<CommonTable data={usuariosList} columns={columns} />
						</Grid>
					</Grid>
				</Container>
			</Page>
		</>
	)
}

export default Cargos

