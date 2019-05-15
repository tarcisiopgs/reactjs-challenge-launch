import React, {Fragment, useEffect, useState} from 'react';

import Header from "../components/Header";
import { Form, Scope } from "@rocketseat/unform";
import CustomTextField from "../components/CustomTextField";
import { Grid, Button, Typography } from '@material-ui/core';
import api from '../services/api';

const button = {
    link: '/',
    label: 'VOLTAR',
};
const title = 'Adicionar cliente';

export default function Client({history, match}) {
    const [data, setData] = useState({});

    async function handleSubmit(data) {
        await api.postOrPut('/clients', match.params.id, data);

        history.push('/');
    }

    useEffect(() => {
       async function loadData() {
           const {id} = match.params;
           const response = await api.get(`/clients/${id}`);

           setData(response.data);
       }

       if(match.params.id) {
           loadData();
       }
    }, [match.params, match.params.id]);

    return (
        <Fragment>
            <Header title={title} button={button}/>
            <Form style={{maxWidth: 1000, margin: '0 auto', marginTop: 50}} onSubmit={handleSubmit} initialData={data} >
            <Grid container justify="center" spacing={16}>
                <Grid item xs={12}>
                    <Typography color="textSecondary" variant="caption">
                        Autenticação
                    </Typography>
                </Grid>
                    <Scope path="authentication">
                        <Grid item xs={12}>
                            <CustomTextField required label="E-mail" name="email" type="email" />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField required label="Senha" name="password" type="password" />
                        </Grid>
                    </Scope>
                <Grid item xs={12}>
                    <Typography color="textSecondary" variant="caption">
                        Titularidade
                    </Typography>
                </Grid>
                    <Scope path="ownership">
                        <Grid item xs={6}>
                            <CustomTextField required label="Nome" name="name" />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField label="Apelido" name="nickname" />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField required label="Data de nascimento" name="birthdate" />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField label="Gênero" name="genre"/>
                        </Grid>
                    </Scope>
                <Grid item xs={12}>
                    <Typography color="textSecondary" variant="caption">
                        Endereço
                    </Typography>
                </Grid>
                    <Scope path="address">
                        <Grid item xs={4}>
                            <CustomTextField required label="CEP" name="zipcode" />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField required label="Estado" name="state" />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField required label="Cidade" name="city" />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField required label="Número" name="number" />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField required label="Logradouro" name="street" />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTextField required label="Bairro" name="neighborhood" />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField label="complemento" name="complement" />
                        </Grid>
                    </Scope>
                    <Grid item>
                        <Button variant="contained" color="primary" type="submit">Salvar</Button>
                    </Grid>
            </Grid>
            </Form>
        </Fragment>
    );
}
