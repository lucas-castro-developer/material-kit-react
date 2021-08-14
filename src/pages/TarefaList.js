import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TarefaListResults from 'src/components/tarefas/TarefaListResults';
import TarefaListToolbar from 'src/components/tarefas/TarefaListToolbar';
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
import { esconderMensagem } from '../store/mensagensReducer';

const TarefaList = ({
  list,
  save,
  deleteTask,
  updateStatus,
  hideMessage,
  tarefasResult,
  mensagemContent,
  mensagemTrigger
}) => {
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
            open={mensagemTrigger}
            onClose={hideMessage}
          >
            <DialogTitle>Atenção</DialogTitle>
            <DialogContent>{mensagemContent}</DialogContent>
            <DialogActions>
              <Button
                onClick={hideMessage}
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
  hideMessage: PropTypes.func,
  tarefasResult: PropTypes.array,
  mensagemContent: PropTypes.string,
  mensagemTrigger: PropTypes.bool
};

const mapStateToProps = (state) => ({
  tarefasResult: state.tarefas.tarefas,
  mensagemContent: state.mensagens.mensagem,
  mensagemTrigger: state.mensagens.mostrarMensagem
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    list: listar,
    save: salvar,
    deleteTask: deletar,
    updateStatus: alterarStatus,
    hideMessage: esconderMensagem
  }, dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
