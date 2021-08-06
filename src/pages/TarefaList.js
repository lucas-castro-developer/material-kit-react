import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TarefaListResults from 'src/components/tarefas/TarefaListResults';
import TarefaListToolbar from 'src/components/tarefas/TarefaListToolbar';
import axios from 'axios';

const TarefaList = () => {
  const salvar = (tarefa) => {
    axios
      .post('https://minhastarefas-api.herokuapp.com/tarefas', tarefa, {
        headers: { 'x-tenant-id': 'fulano@email.com' }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

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
            <TarefaListResults tarefas="" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TarefaList;
