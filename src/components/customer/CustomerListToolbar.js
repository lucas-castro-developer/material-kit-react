import {
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
  Button
} from '@material-ui/core';

const CustomerListToolbar = (props) => (
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
          <Box sx={{ maxWidth: 500 }}>
            <Grid container>
              <Grid item md={4}>
                <TextField
                  fullWidth
                  label="Descrição:"
                  placeholder="Descrição da tarefa"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  fullWidth
                  label="Descrição:"
                  placeholder="Descrição da tarefa"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={2}>
                <Button variant="contained" color="secondary">
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

export default CustomerListToolbar;
