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
import {
  listar,
  salvar,
  deletar,
  alterarStatus
} from '../store/tarefasReducer';

const TarefaList = ({
  list,
  save,
  deleteTask,
  updateStatus,
  tarefasResult
}) => {
  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagem, setMensagem] = useState('');

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
          <TarefaListToolbar salvar={save} />
          <Box sx={{ pt: 3 }}>
            <TarefaListResults
              deleteAction={deleteTask}
              alterarStatus={updateStatus}
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
  save: PropTypes.func,
  deleteTask: PropTypes.func,
  updateStatus: PropTypes.func,
  tarefasResult: PropTypes.array
};

const mapStateToProps = (state) => ({
  tarefasResult: state.tarefas.tarefas
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    list: listar,
    save: salvar,
    deleteTask: deletar,
    updateStatus: alterarStatus
  }, dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
