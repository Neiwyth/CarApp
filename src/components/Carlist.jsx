import { Fragment, useEffect, useState } from "react"
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";


function Carlist() {

    // state variables
    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    // columns for cars ag-grid
    const columns = [
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'year' },
        { field: 'price' },
        {
            cellRenderer: params => <EditCar updateCar={updateCar} params={params.data} />,
            width: 120
        },
        {
            cellRenderer: params =>
                <Button variant="outlined" size='small' color='error' onClick={() => deleteCar(params)}>
                    Delete
                </Button>,
            width: 120
        }
    ];

    // call getCars() function when rendering the component very first time
    useEffect(() => getCars(), []);
    const REST_URL = 'https://carrestapi.herokuapp.com/cars/';

    const getCars = () => {
        fetch(REST_URL)
            .then(res => res.json())
            .then(resData => {
                setCars(resData._embedded.cars)
            })
            .catch(e => console.error(e));
    }

    // delete car
    const deleteCar = (params) => {
        if (window.confirm('Are you sure')) {
            fetch(params.data._links.car.href, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) {
                        setMsg('Car deleted successfully');
                        setOpen(true);
                        getCars();  // fetch the cars from database again with all users made changes
                    } else
                        alert('Something went wrong in deletion: ' + res.status);
                })
                .catch(err => console.error(err)); // console.log/console.error/console.warning
        }
    }

    // add car
    const addCar = (car) => {
        fetch(REST_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(res => {
                if (res.ok) {
                    setMsg('Car added successfully');
                    setOpen(true);
                    getCars();
                } else {
                    alert('Something went wrong while adding new car: ' + res.status);
                }
            })
            .catch(e => console.error(e));
    }

    // update car
    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(res => {
                if (res.ok) {
                    setMsg('Car updated successfully');
                    setOpen(true);
                    getCars();
                } else {
                    alert('Something went wrong while updating car: ' + res.status);
                }

            })
            .catch(e => console.error(e));
    }

    // return ag-grid
    return (

        <Fragment>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material"
                style={{ height: '750px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    paginationAutoPageSize={true}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}>
                </Snackbar>
            </div>
        </Fragment>
    )
}

export default Carlist