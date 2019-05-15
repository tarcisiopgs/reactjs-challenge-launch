import React, { Fragment, useEffect, useState } from 'react';

import Header from '../components/Header';
import { Form, Input, Scope } from '@rocketseat/unform';
import { Grid, Button, Typography } from '@material-ui/core';
import api from '../services/api';

const button = {
  link: '/',
  label: 'VOLTAR'
};
let title = 'Adicionar cliente';

export default function Client({ history, match }) {
  const [data, setData] = useState({});

  async function handleSubmit(data) {
    await api.postOrPut('/clients', match.params.id, data);

    history.push('/');
  }

  useEffect(() => {
    async function loadData() {
      const { id } = match.params;
      const response = await api.get(`/clients/${id}`);

      setData(response.data);
    }

    if (match.params.id) {
      title = 'Editar cliente';
      loadData();
    }
  }, [match.params, match.params.id]);

  return (
    <Fragment>
      <Header title={title} button={button} />
      <Form
        style={{ maxWidth: 1000, margin: '0 auto', marginTop: 50 }}
        onSubmit={handleSubmit}
        initialData={data}
      >
        <Grid container justify="center" spacing={16}>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="caption">
              Autenticação
            </Typography>
          </Grid>
          <Scope path="authentication">
            <Grid item xs={12}>
              <div className="form-group">
                <Input
                  required
                  className="form-control"
                  label="E-mail"
                  name="email"
                  type="email"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-group">
                <Input required label="Senha" className="form-control" name="password" type="password" />
              </div>
            </Grid>
          </Scope>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="caption">
              Titularidade
            </Typography>
          </Grid>
          <Scope path="ownership">
            <Grid item xs={6}>
              <div className="form-group">
                <Input required label="Nome" name="name" className="form-control" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <Input label="Apelido" name="nickname" className="form-control" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <Input required label="Data de nascimento" name="birthdate" className="form-control" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <Input label="Gênero" name="genre" className="form-control" />
              </div>
            </Grid>
          </Scope>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="caption">
              Endereço
            </Typography>
          </Grid>
          <Scope path="address">
            <Grid item xs={4}>
              <div className="form-group">
                <Input required label="CEP" name="zipcode" className="form-control" />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="form-group">
                <Input required label="Estado" name="state" className="form-control" />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="form-group">
                <Input required label="Cidade" name="city" className="form-control" />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="form-group">
                <Input required label="Número" name="number" className="form-control" />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="form-group">
                <Input required label="Logradouro" name="street" className="form-control" />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="form-group">
                <Input required label="Bairro" name="neighborhood" className="form-control" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="form-group">
                <Input label="complemento" name="complement" className="form-control" />
              </div>
            </Grid>
          </Scope>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Fragment>
  );
}
