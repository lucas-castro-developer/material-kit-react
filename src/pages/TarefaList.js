import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import TarefaListResults from 'src/components/tarefas/TarefaListResults';
import TarefaListToolbar from 'src/components/tarefas/TarefaListToolbar';

const TarefaList = () => (
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
        <TarefaListToolbar />
        <Box sx={{ pt: 3 }}>
          <TarefaListResults tarefas="" />
        </Box>
      </Container>
    </Box>
  </>
);

export default TarefaList;
