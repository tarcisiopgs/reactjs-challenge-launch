import React, {Component} from 'react';

import { withStyles, Table, MenuItem, TableBody, IconButton, Menu, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link} from "react-router-dom";
import api from '../services/api';

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

class Data extends Component {

    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    removeItem = async (id) => {
        this.handleClose();
        await api.delete(`clients/${id}`);
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
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
                        {this.props.items.map(row => (
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
        );
    }
}

export default withStyles(styles)(Data);
