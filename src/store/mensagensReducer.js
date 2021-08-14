const INITIAL_STATE = {
  mensagem: '',
  mostrarMensagem: false
};

export const ACTIONS = {
  MOSTRAR_MENSAGEM: 'MENSAGENS_MOSTRAR',
  ESCONDER_MENSAGEM: 'MENSAGENS_ESCONDER'
};

const mensagemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.MOSTRAR_MENSAGEM:
      return { ...state, mensagem: action.mensagem, mostrarMensagem: true };
    case ACTIONS.ESCONDER_MENSAGEM:
      return { ...state, mensagem: '', mostrarMensagem: false };
    default:
      return state;
  }
};

export function mostrarMensagem(paramMensagem) {
  return {
    type: ACTIONS.MOSTRAR_MENSAGEM,
    mensagem: paramMensagem
  };
}

export function esconderMensagem() {
  return {
    type: ACTIONS.ESCONDER_MENSAGEM
  };
}

export default mensagemReducer;
