import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { funAddUser } from "../redux/Action";
import { Box, Button, Modal, Typography, TextField, MenuItem } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from "@mui/icons-material/Add";
import '../styles/crud.scss';

const roles = [
    {
        value: 'Admin',
        label: 'Admin'
    },
    {
        value: 'Customer',
        label: 'Customer'
    },
    {
        value: 'Manager',
        label: 'Manager'
    }
];

const CreateUser = ({ stateProps, close, reloadPage }) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
        textAlign: 'center',
    };

    const [ isShow, setIsShow ] = useState(false);
    const [ idUser, setIdUser ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ role, setRole ] = useState('Customer');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userobj = { idUser, userName, role };
        dispatch(funAddUser(userobj));
        close();
        reloadPage();
    }

    useEffect(() => {
        setIsShow(stateProps);
    }, [ stateProps, reloadPage ])

    return (
        <> {
            isShow ?
                <Modal
                    open={ isShow }
                    onClose={ () => close() }
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={ style } style={ { color: "black" } }>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={ { textAlign: "center" } }>
                            Create User
                        </Typography>

                        <form className="container_create">

                            <div className="info">

                                <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    sx={ { m: 1, width: '30ch' } }
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    inputProps={ {
                                        min: 3,
                                        maxLength: 6,
                                        inputMode: "numeric",
                                        pattern: "[0-9]*"
                                    } }
                                    onChange={ (e) => setIdUser(e.target.value.trim()) }
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Name"
                                    sx={ { m: 1, width: '30ch' } }
                                    variant="outlined"
                                    size="small"
                                    onChange={ (e) => setUserName(e.target.value.trim()) }
                                />
                                <TextField
                                    id="outlined-select-currency"
                                    label="Role"
                                    sx={ { m: 1, width: '30ch' } }
                                    select
                                    size="small"
                                    defaultValue={ "Customer" }
                                    onChange={ (e) => setRole(e.target.value) }
                                >
                                    { roles.map((option) => (
                                        <MenuItem key={ option.value } value={ option.value }>
                                            { option.label }
                                        </MenuItem>
                                    )) }
                                </TextField>
                            </div>
                        </form>

                        <div className="action">

                            <Button
                                size='small'
                                variant="contained"
                                startIcon={ <AddIcon /> }
                                className="btnCreate"
                                type="submit"
                                onClick={ (e) => handleSubmit(e) }
                            >
                                Create
                            </Button>
                            <Button
                                size='small'
                                color='success'
                                variant="contained"
                                startIcon={ <CloseIcon /> }
                                className='btnCancel'
                                onClick={ () => close() }
                            >
                                Cancel
                            </Button>
                        </div>

                    </Box>
                </Modal> : <></>
        }
        </>
    )
}

export default CreateUser;
