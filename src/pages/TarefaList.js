import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import TarefaListResults from 'src/components/tarefas/TarefaListResults';
import TarefaListToolbar from 'src/components/tarefas/TarefaListToolbar';
import axios from 'axios';
import {
  Box,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';
const headers = { 'x-tenant-id': 'fulano@email.com' };

const TarefaList = () => {
  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const listarTarefas = () => {
    axios
      .get(API_URL, {
        headers
      })
      .then((response) => {
        const listaDeTarefas = response.data;
        setTarefas(listaDeTarefas);
      })
      .catch((erro) => {
        setMensagem('Ocorreu um erro!', erro);
        setOpenDialog(true);
      });
  };

  const salvar = (tarefa) => {
    axios
      .post(API_URL, tarefa, {
        headers
      })
      .then((response) => {
        const novaTarefa = response.data;
        setTarefas([...tarefas, novaTarefa]);
        setMensagem('Item adicionado com sucesso!');
        setOpenDialog(true);
      })
      .catch((erro) => {
        setMensagem('Ocorreu um erro!', erro);
        setOpenDialog(true);
      });
  };

  const alterarStatus = (id) => {
    axios
      .patch(`${API_URL}/${id}`, null, { headers })
      .then(() => {
        /* eslint-disable no-param-reassign */
        const lista = [...tarefas];
        lista.forEach((tarefa) => {
          if (tarefa.id === id) {
            tarefa.done = true;
          }
        });
        setTarefas(lista);
        setMensagem('Item atualizado com sucesso!');
        setOpenDialog(true);
      })
      .catch((erro) => {
        setMensagem('Ocorreu um erro!', erro);
        setOpenDialog(true);
      });
  };

  const deletar = (id) => {
    axios
      .delete(`${API_URL}/${id}`, {
        headers
      })
      .then(() => {
        const lista = tarefas.filter((tarefa) => tarefa.id !== id);
        setTarefas(lista);
        setMensagem('Item removido com sucesso!');
        setOpenDialog(true);
      })
      .catch((erro) => {
        setMensagem('Ocorreu um erro!', erro);
        setOpenDialog(true);
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
            <TarefaListResults
              deleteAction={deletar}
              alterarStatus={alterarStatus}
              tarefas={tarefas}
            />
          </Box>
          <Dialog
            open={openDialog}
            onClose={
              // eslint-disable-next-line no-unused-vars
              (e) => setOpenDialog(false)
            }
          >
            <DialogTitle>Atenção</DialogTitle>
            <DialogContent>{mensagem}</DialogContent>
            <DialogActions>
              <Button
                onClick={
                  // eslint-disable-next-line no-unused-vars
                  (e) => setOpenDialog(false)
                }
              >
                Fechar
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
};

export default TarefaList;
