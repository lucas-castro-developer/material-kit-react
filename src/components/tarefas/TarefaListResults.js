import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

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
            </TableRow>
          </TableHead>
          <TableBody>
            {tarefas.map((tarefa) => {
              return (
                <TableRow>
                  <TableCell>{tarefa.id}</TableCell>
                  <TableCell>{tarefa.descricao}</TableCell>
                  <TableCell>{tarefa.categoria}</TableCell>
                  <TableCell>{tarefa.done ? 'Feito' : 'Pendente'}</TableCell>
                </TableRow>
              );
            })}
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
