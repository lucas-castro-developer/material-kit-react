import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TarefaListResults from 'src/components/tarefas/TarefaListResults';
import TarefaListToolbar from 'src/components/tarefas/TarefaListToolbar';
import axios from 'axios';

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';
const headers = { 'x-tenant-id': 'fulano@email.com' };

const TarefaList = () => {
  const [tarefas, setTarefas] = useState([]);

  const listarTarefas = () => {
    axios
      .get(API_URL, {
        headers
      })
      .then((response) => {
        const listaDeTarefas = response.data;
        console.log(listaDeTarefas);
        setTarefas(listaDeTarefas);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const salvar = (tarefa) => {
    axios
      .post(API_URL, tarefa, {
        headers
      })
      .then(() => {
        listarTarefas();
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  useEffect(() => {
    listarTarefas();
  }, []);

  return (
    <>
      <Helmet>
        <title>tarefas | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <TarefaListToolbar salvar={salvar} />
          <Box sx={{ pt: 3 }}>
            <TarefaListResults tarefas={tarefas} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TarefaList;
