import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';

const CustomerListToolbar = (props) => {
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const tarefa = { descricao, categoria };
    props.salvar(tarefa);
    setDescricao('');
    setCategoria('');
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <div>{}</div>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box>
              <Grid container>
                <Grid item md={4}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label="Descrição:"
                      placeholder="Descrição da tarefa"
                      variant="outlined"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="label">Categoria: </InputLabel>
                    <Select
                      labelId="label"
                      id="select"
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    >
                      <MenuItem value="">Selecione...</MenuItem>
                      <MenuItem value="TRABALHO">Trabalho</MenuItem>
                      <MenuItem value="ESTUDOS">Estudos</MenuItem>
                      <MenuItem value="OUTROS">Outros</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={2}>
                  <Button onClick={submit} variant="contained" color="primary">
                    Adicionar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

CustomerListToolbar.propTypes = {
  salvar: PropTypes.func
};

export default CustomerListToolbar;
