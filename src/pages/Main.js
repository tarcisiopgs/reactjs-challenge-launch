import React, {Component} from 'react';

import Header from '../components/Header';
import api from '../services/api';
import {
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    withStyles
} from "@material-ui/core";
import {Link} from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const button = {
    link: '/clients/create',
    label: 'ADICIONAR',
};
const title = 'Clientes';
const styles = () => ({
    root: {
        maxWidth: '100%',
        margin: 20,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class Main extends Component {
    state = {
      clients: [],
        anchorEl: null,
    };

    async loadClients() {
        const response = await api.get('/clients');

        this.setState({clients: response.data});
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    removeItem = async (id) => {
        this.handleClose();
        await api.delete(`clients/${id}`);
        this.loadClients();
    };

    componentDidMount() {
        this.loadClients();
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <>
                <Header title={title} button={button}/>
                <Paper className={this.props.classes.root}>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Apelido</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.clients.map(row => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {row.ownership.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.ownership.nickname}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.authentication.email}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <IconButton
                                                aria-label="More"
                                                aria-owns={open ? 'long-menu' : undefined}
                                                aria-haspopup="true"
                                                onClick={event => {
                                                    event.preventDefault();
                                                    this.handleClick(event);
                                                }}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="long-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={event => {
                                                    event.preventDefault();
                                                    this.handleClose();
                                                }}
                                            >
                                                <MenuItem component={Link} to={`/clients/${row._id}/edit`}>
                                                    Editar
                                                </MenuItem>
                                                <MenuItem onClick={event => {
                                                    event.preventDefault();
                                                    this.removeItem(row._id);
                                                }}>
                                                    Deletar
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(Main);