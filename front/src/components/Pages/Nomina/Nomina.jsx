import React, { useState, useEffect } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'
import './Nomina.css'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';
import PrintIcon from '@material-ui/icons/Print'

const Nomina = () => {
	const initialState = {
		avatar: 'https://i.imgur.com/gh3fPj5.png',
		nombre: "",
		planeta: ""
	}
	const [nominaList, setNominaList] = useState([])
	const [body, setBody] = useState(initialState)
	const [openDialog, setOpenDialog] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

	const init = async () => {
		const { data } = await ApiRequest().get('/nomina')
		setNominaList(data)
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 100 },
		{ field: 'nomina', headerName: 'Nomina', width: 150 },
		{ field: 'nombre', headerName: 'Nombre', width: 200 },
		{ field: 'apellido', headerName: 'Apellido', width: 200 },
		{ field: 'estado', headerName: 'Estado', width: 200 },
		{ field: 'fecha', headerName: 'Fecha de Consignacion', width: 200 },
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
			const { data } = await ApiRequest().post('/nomina/eliminar', { id: id })
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
			const { data } = await ApiRequest().post('/nomina/guardar', body)
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
			const { data } = await ApiRequest().post('/nomina/editar', body)
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
							{isEdit ? 'Editar Nomina' : 'Crear Nomina'}
						</DialogTitle>
						<DialogContent>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='nomina'
										value={body.nomina}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Nomina'
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='id_usuario'
										value={body.id_usuario}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Usuario'
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='id_estado'
										value={body.id_estado}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Estado'
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='fecha'
										value={body.fecha}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Fecha'
									/>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
							<Button variant='contained' color='primary' onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
						</DialogActions>
					</Dialog>
					<Page title="Cafesoft | Nomina">
						<ToastAutoHide message={mensaje} />
						<Container maxWidth='lg'>
							<Box sx={{ pb: 1 }}>
								<Typography variant="h5" className="titulo">Nomina</Typography>
							</Box>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={4}>
									<Button onClick={handleDialog} startIcon={<AddOutlined />} variant='contained' color='secondary'>Nuevo</Button>
								</Grid>
								<Grid item xs={12} sm={8} />
								<Grid item xs={12} sm={12}>
									<CommonTable data={nominaList} columns={columns} />
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

export default Nomina

