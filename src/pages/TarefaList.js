import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import { listar } from '../store/tarefasReducer';

const API_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';

const TarefaList = ({ tarefasResult, list }) => {
  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const salvar = (tarefa) => {
    axios
      .post(API_URL, tarefa, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
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
      .patch(`${API_URL}/${id}`, null, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
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
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
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
    list();
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
              tarefas={tarefasResult}
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

TarefaList.propTypes = {
  list: PropTypes.func,
  tarefasResult: PropTypes.array
};

const mapStateToProps = (state) => ({
  tarefasResult: state.tarefas.tarefas
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ list: listar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
