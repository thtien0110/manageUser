import { Button, Modal, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import "../styles/crud.scss"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Confirm = ({ title, funct, stateOpen, close }) => {
    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        setOpen(stateOpen)
    }, [ stateOpen ])

    return (
        <div>

            <Modal
                open={ open }
                onClose={ () => close() }
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ style } style={ { border: "none", borderRadius: "5px" } }>
                    <Typography
                        style={ { textAlign: "center" } }
                        id="modal-modal-title" variant="h5" component="h5">
                        { title }
                    </Typography>
                    <div className="action">
                        <Button
                            style={ { whiteSpace: "nowrap" } }
                            size='small'
                            variant="contained"
                            startIcon={ <CheckIcon /> }
                            className="btnCreate"
                            onClick={ () => {
                                funct();
                                close()
                            } }
                        >
                            Confirm
                        </Button>

                        <Button
                            style={ { whiteSpace: "nowrap" } }
                            size='small'
                            color='success'
                            variant="contained"
                            startIcon={ <CloseIcon /> }
                            className='btnCancel'
                            onClick={ () => { close() } }
                        >
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Confirm;