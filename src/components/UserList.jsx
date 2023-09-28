import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import { fetchUserList, funDeleteUser } from '../redux/Action';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Table, TableBody, TableContainer, TableHead, TableFooter, TablePagination, TableRow, Paper, IconButton, Button } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LastPageIcon from '@mui/icons-material/LastPage';
import UpdateUser from './UpdateUser';
import Confirm from './Confirm';
import CreateUser from './CreateUser';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [ `&.${tableCellClasses.head}` ]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [ `&.${tableCellClasses.body}` ]: {
        fontSize: 14,
    },
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={ { flexShrink: 0, ml: 2.5 } }>
            <IconButton
                onClick={ handleFirstPageButtonClick }
                disabled={ page === 0 }
                aria-label="first page"
            >
                { theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon /> }
            </IconButton>
            <IconButton
                onClick={ handleBackButtonClick }
                disabled={ page === 0 }
                aria-label="previous page"
            >
                { theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft /> }
            </IconButton>
            <IconButton
                onClick={ handleNextButtonClick }
                disabled={ page >= Math.ceil(count / rowsPerPage) - 1 }
                aria-label="next page"
            >
                { theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight /> }
            </IconButton>
            <IconButton
                onClick={ handleLastPageButtonClick }
                disabled={ page >= Math.ceil(count / rowsPerPage) - 1 }
                aria-label="last page"
            >
                { theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon /> }
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


function UserList(props) {
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);

    const [ isShowModal, setIsShowModal ] = useState(false);
    const onClickShowModal = () => setIsShowModal(true);
    const onClickCloseModal = () => setIsShowModal(false);

    const [ userUpdate, setUserUpdate ] = useState({});
    const [ isShowUpdateUserInfo, setIsShowUpdateUserInfo ] = useState(false);
    const onClickOpenUpdateUserInfo = (user, e) => {
        e.preventDefault();
        setUserUpdate(user);
        setIsShowUpdateUserInfo(true);
    }

    const onClickCloseUpdateUserInfo = () => setIsShowUpdateUserInfo(false);

    const [ idUserDelete, setIdUserDelete ] = useState();
    const [ isShowModalDeleteUser, setIsShowModalDeleteUser ] = useState(false);
    const onClickShowModalDeleteUser = (id, e) => {
        e.stopPropagation();
        setIdUserDelete(id);
        setIsShowModalDeleteUser(true);
    };
    const onClickCloseModalDeleteUser = () => {
        setIdUserDelete(null);
        setIsShowModalDeleteUser(false);
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.user.userList.length) : 0;

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const [ reRender, setReRender ] = useState(0);
    const reloadPage = () => {
        setReRender(reRender + 1);
    };

    useEffect(() => {
        props.loadUser();
    }, [ reRender ])

    const onClickDeleteUser = (id) => {
        props.deleteUser(idUserDelete);
        reloadPage();
        toast.success('User deleted successfully!')
    }

    return (
        <>
            <div className="header_table" >
                <Button
                    className="add"
                    variant="contained"
                    startIcon={ <AddIcon /> }
                    onClick={ () => { onClickShowModal() } }
                    style={ {
                        whiteSpace: "nowrap",
                        minWidth: "100px",
                        marginBottom: "10px",
                    } }
                >
                    Add
                </Button>

                <TableContainer TableContainer component={ Paper }>
                    <Table aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell align="center">ID</StyledTableCell>
                                <StyledTableCell align="center">User&nbsp;Name</StyledTableCell>
                                <StyledTableCell align="center">Role</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { (rowsPerPage > 0
                                ? props.user.userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : props.user.userList
                            ).map((item, index) => (
                                <TableRow key={ index }>
                                    <TableCell style={ { width: 20 } } align="left">
                                        { index + 1 }
                                    </TableCell>
                                    <TableCell style={ { width: 50 } } align="center">
                                        { item.idUser }
                                    </TableCell>
                                    <TableCell style={ { width: 160 } } align="center">
                                        { item.userName }
                                    </TableCell>
                                    <TableCell style={ { width: 100 } } align="center">
                                        { item.role }
                                    </TableCell>
                                    <TableCell style={ { width: 160 } } align="center">
                                        <div>
                                            <Button
                                                sx={ { my: 1, mr: 1 } }
                                                variant="outlined"
                                                color="primary"
                                                startIcon={ <BorderColorIcon /> }
                                                onClick={ (e) => { onClickOpenUpdateUserInfo(item, e) } }
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                sx={ { my: 1 } }
                                                variant="outlined"
                                                color="warning"
                                                startIcon={ <DeleteIcon /> }
                                                onClick={ (e) => { onClickShowModalDeleteUser(item.id, e) } }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )) }
                            { emptyRows > 0 && (
                                <TableRow style={ { height: 30 * emptyRows } }>
                                    <TableCell colSpan={ 5 } />
                                </TableRow>
                            ) }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={ [ 5, 10, 25, { label: 'All', value: -1 } ] }
                                    colSpan={ 5 }
                                    count={ props.user.userList.length }
                                    rowsPerPage={ rowsPerPage }
                                    page={ page }
                                    SelectProps={ {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    } }
                                    onPageChange={ handleChangePage }
                                    onRowsPerPageChange={ handleChangeRowsPerPage }
                                    ActionsComponent={ TablePaginationActions }
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer >
            </div>

            <CreateUser
                stateProps={ isShowModal }
                close={ onClickCloseModal }
                reloadPage={ reloadPage }
            />

            <UpdateUser
                stateProps={ isShowUpdateUserInfo }
                close={ onClickCloseUpdateUserInfo }
                user={ userUpdate }
                reloadPage={ reloadPage }
            />

            <Confirm
                close={ onClickCloseModalDeleteUser }
                stateOpen={ isShowModalDeleteUser }
                title={ "Do you want to delete this user?" }
                funct={ onClickDeleteUser }
            />
        </>)
        ;
}

const mapStateProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        loadUser: () => dispatch(fetchUserList()),
        deleteUser: (id) => dispatch(funDeleteUser(id))
    }
}

export default connect(mapStateProps, mapDispatchProps)(UserList);