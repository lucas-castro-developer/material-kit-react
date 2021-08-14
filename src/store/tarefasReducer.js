import axios from 'axios';
import { mostrarMensagem } from './mensagensReducer';

const http = axios.create({
  baseURL: 'https://minhastarefas-api.herokuapp.com'
});

const ACTIONS = {
  LISTAR: 'TAREFAS_LISTAR',
  ADD: 'TAREFAS_ADD',
  REMOVER: 'TAREFAS_REMOVE',
  UPDATE_STATUS: 'TAREFAS_UPDATE_STATUS'
};

const INITIAL_STATE = {
  tarefas: [],
  quantidade: 0
};

const tarefaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LISTAR: {
      return {
        ...state,
        tarefas: action.tarefas,
        quantidade: action.tarefas.length
      };
    }
    case ACTIONS.ADD: {
      const lista = [...state.tarefas, action.tarefa];
      return { ...state, tarefas: lista, quantidade: lista.length };
    }
    case ACTIONS.REMOVER: {
      const { id } = action.id;
      const lista = state.tarefas.filter((tarefa) => tarefa.id !== id);
      return { ...state, tarefas: lista, quantidade: lista.length };
    }
    case ACTIONS.UPDATE_STATUS: {
      const lista = [...state.tarefas];
      lista.forEach((tarefa) => {
        if (tarefa.id === action.id) {
          tarefa.done = true;
        }
      });
      return { ...state, tarefas: lista };
    }
    default: {
      return state;
    }
  }
};

export function listar() {
  return (dispatch) => {
    http
      .get('/tarefas', {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then((response) => {
        dispatch({
          type: ACTIONS.LISTAR,
          tarefas: response.data
        });
      });
  };
}

export function salvar(tarefa) {
  return (dispatch) => {
    http
      .post('/tarefas', tarefa, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then((response) => {
        dispatch([
          {
            type: ACTIONS.ADD,
            tarefa: response.data
          },
          mostrarMensagem('Tarefa salva com sucesso!')
        ]);
      });
  };
}

export function deletar(paramId) {
  return (dispatch) => {
    http
      .delete(`/tarefas/${paramId}`, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(
        // eslint-disable-next-line no-unused-vars
        (response) => {
          dispatch([
            {
              type: ACTIONS.REMOVER,
              id: paramId
            },
            mostrarMensagem('Tarefa deletada com sucesso!')
          ]);
        }
      );
  };
}

export function alterarStatus(paramId) {
  return (dispatch) => {
    http
      .patch(`tarefas/${paramId}`, null, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(
        // eslint-disable-next-line no-unused-vars
        (response) => {
          dispatch([
            {
              type: ACTIONS.UPDATE_STATUS,
              id: paramId
            },
            mostrarMensagem('Tarefa atualizada com sucesso!')
          ]);
        }
      );
  };
}

export default tarefaReducer;
