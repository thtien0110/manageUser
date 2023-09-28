import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { funUpdateUser } from "../redux/Action";
import { Box, Button, Modal, Typography, TextField, MenuItem } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import BorderColorIcon from '@mui/icons-material/BorderColor';
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

const UpdateUser = ({ stateProps, close, reloadPage, user }) => {

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
    const [ id, setId ] = useState('');
    const [ idUser, setIdUser ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ role, setRole ] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userobj = { id, idUser, userName, role };
        dispatch(funUpdateUser(userobj, id));
        close();
        reloadPage();
    }

    useEffect(() => {
        if (user) {
            setId(user.id);
            setIdUser(user.idUser);
            setUserName(user.userName);
            setRole(user.role);
        }
    }, [ user ])

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
                            Edit User
                        </Typography>

                        <form className="container_create">
                            <div className="info">
                                <TextField
                                    id="outlined-basic"
                                    label="ID"
                                    sx={ { m: 1, width: '30ch' } }
                                    variant="outlined"
                                    size="small"
                                    disabled
                                    defaultValue={ user.idUser }
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Name"
                                    sx={ { m: 1, width: '30ch' } }
                                    variant="outlined"
                                    size="small"
                                    onChange={ (e) => setUserName(e.target.value.trim()) }
                                    defaultValue={ user.userName }
                                />
                                <TextField
                                    id="outlined-select-currency"
                                    label="Role"
                                    sx={ { m: 1, width: '30ch' } }
                                    select
                                    size="small"
                                    defaultValue={ user.role }
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
                                startIcon={ <BorderColorIcon /> }
                                className="btnCreate"
                                type="submit"
                                onClick={ (e) => handleSubmit(e) }
                            >
                                Edit
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
    );
}

export default UpdateUser;