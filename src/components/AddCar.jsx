/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Fragment, useState } from "react";


function AddCar(props) {

    //state
    const [car, setCar] = useState({ brand: '', model: '', color: '', fuel: '', year: '', price: '' });
    const [open, setOpen] = useState(false); // is dialog open

    // functions
    const handleClose = (event, reason) => {

        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    // save new car
    const handleSave = () => {
        props.addCar(car);
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    //return
    return (

        <Fragment>
            <Button style={{ margin: 10 }} variant="contained" size="small" onClick={() => setOpen(true)}>New Car</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>New Car</DialogTitle>
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
                    <Button variant="contained" size="small" color="success" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default AddCar;