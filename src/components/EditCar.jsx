/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Fragment, useState } from "react";


function EditCar(props) {

    //state
    const [car, setCar] = useState({ brand: '', model: '', color: '', fuel: '', year: '', price: '' });
    const [open, setOpen] = useState(false); // is dialog open

    // functions
    const handleClose = (event, reason) => {

        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    // get car data from props and set it to state
    const handleOpen = () => {
        setCar({
            brand: props.params.brand,
            model: props.params.model,
            color: props.params.color,
            fuel: props.params.fuel,
            year: props.params.year,
            price: props.params.price
        });
        setOpen(true);
    }

    // save updated car info
    const updateCar = () => {
        props.updateCar(car, props.params._links.car.href);
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    //return
    return (

        <Fragment>
            <Button style={{ margin: 10 }} variant="outlined" size="small" onClick={handleOpen}>Edit</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id='form-dialog-title'>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        label='Brand'
                        name='brand'
                        value={car.brand}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Model'
                        name='model'
                        value={car.model}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Color'
                        name='color'
                        value={car.color}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Fuel'
                        name='fuel'
                        value={car.fuel}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Year'
                        name='year'
                        value={car.year}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                    <TextField
                        margin='dense'
                        label='Price'
                        name='price'
                        value={car.price}
                        multiline
                        onChange={handleInputChange}
                        fullWidth />

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="small" color="error" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" size="small" color="success" onClick={updateCar}>Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default EditCar;