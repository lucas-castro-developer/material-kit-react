import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@material-ui/core';

import TimerIcon from '@material-ui/icons/Timer';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DeleteIcon from '@material-ui/icons/Delete';

const tarefaListResults = ({
  tarefas,
  alterarStatus,
  deleteAction,
  ...rest
}) => (
  <Card {...rest}>
    <CardContent>
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tarefas.map((tarefa) => (
              <TableRow key={tarefa.key}>
                <TableCell>{tarefa.id}</TableCell>
                <TableCell>{tarefa.descricao}</TableCell>
                <TableCell>{tarefa.categoria}</TableCell>
                <TableCell>{tarefa.done ? 'Feito' : 'Pendente'}</TableCell>
                <TableCell>
                  <IconButton
                    // eslint-disable-next-line no-unused-vars
                    onClick={(e) => {
                      alterarStatus(tarefa.id);
                    }}
                    color="primary"
                  >
                    {tarefa.done ? <DoneAllIcon /> : <TimerIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    // eslint-disable-next-line no-unused-vars
                    onClick={(e) => {
                      deleteAction(tarefa.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PerfectScrollbar>
    </CardContent>
  </Card>
);

tarefaListResults.propTypes = {
  tarefas: PropTypes.array.isRequired,
  deleteAction: PropTypes.func.isRequired,
  alterarStatus: PropTypes.func.isRequired
};

export default tarefaListResults;
