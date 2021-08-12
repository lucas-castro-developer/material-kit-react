const ACTIONS = {
  LISTAR: 'TAREFAS_LISTAR',
  ADD: 'TAREFAS_ADD',
  REMOVER: 'TAREFAS_REMOVE'
};

const INITIAL_STATE = {
  tarefas: []
};

const tarefaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LISTAR:
      return { ...state, tarefas: action.tarefas };
    default:
      return state;
  }
};

export default tarefaReducer;
