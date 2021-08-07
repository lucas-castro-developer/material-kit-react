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

const tarefaListResults = ({ tarefas, ...rest }) => (
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
            </TableRow>
          </TableHead>
          <TableBody>
            {tarefas.map((tarefa) => (
              <TableRow>
                <TableCell>{tarefa.id}</TableCell>
                <TableCell>{tarefa.descricao}</TableCell>
                <TableCell>{tarefa.categoria}</TableCell>
                <TableCell>{tarefa.done ? 'Feito' : 'Pendente'}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    {tarefa.done ? <DoneAllIcon /> : <TimerIcon />}
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
  tarefas: PropTypes.array.isRequired
};

export default tarefaListResults;
