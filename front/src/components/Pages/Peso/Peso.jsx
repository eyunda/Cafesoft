import React, { useState, useEffect } from 'react'
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Container, Typography, Grid, Box, Button, Stack, Avatar, IconButton, Divider } from '@mui/material'
import ApiRequest from '../../../helpers/axiosInstances'
import { AddOutlined, EditOutlined, DeleteOutline } from '@mui/icons-material'
import Page from '../../common/Page'
import ToastAutoHide from '../../common/ToastAutoHide'
import CommonTable from '../../common/CommonTable'
import './Peso.css'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import { useRef } from 'react';
import PrintIcon from '@material-ui/icons/Print'

const Peso = () => {
	const initialState = {
		avatar: 'https://i.imgur.com/gh3fPj5.png',
		nombre: "",
		planeta: ""
	}
	const [pesoList, setPesoList] = useState([])
	const [body, setBody] = useState(initialState)
	const [openDialog, setOpenDialog] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })

	const init = async () => {
		const { data } = await ApiRequest().get('/peso')
		setPesoList(data)
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 100 },
		{ field: 'peso', headerName: 'Peso Kg', width: 200 },
		{ field: 'dia', headerName: 'Dia', width: 200 },
		{ field: 'estado', headerName: 'Opiniones', width: 500 },
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
				</Stack>
			)
		}
	]

	const onDelete = async (id) => {
		try {
			const { data } = await ApiRequest().post('/peso/eliminar', { id: id })
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
			const { data } = await ApiRequest().post('/peso/guardar', body)
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
			const { data } = await ApiRequest().post('/peso/editar', body)
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
							{isEdit ? 'Editar Peso' : 'Crear Peso'}
						</DialogTitle>
						<DialogContent>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12}>
									<TextField
										margin='normal'
										name='estado'
										value={body.estado}
										onChange={onChange}
										variant='outlined'
										size='small'
										color='primary'
										fullWidth
										label='Estado'
									/>
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<Button variant='text' color='primary' onClick={handleDialog}>cancelar</Button>
							<Button variant='contained' color='primary' onClick={isEdit ? () => onEdit() : () => onSubmit()}>guardar</Button>
						</DialogActions>
					</Dialog>
					<Page title="Cafesoft | Peso">
						<ToastAutoHide message={mensaje} />
						<Container maxWidth='lg'>
							<Box sx={{ pb: 1 }}>
								<Typography variant="h5" className="titulo">Peso</Typography>
							</Box>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={8} />
								<Grid item xs={12} sm={12}>
									<CommonTable data={pesoList} columns={columns} />
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

export default Peso
