import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../responsive.css'; // Import the CSS file

function createData(name, products) {
  const subtotal = products.reduce((acc, product) => acc + product.quantity, 0);
  return {
    name,
    products,
    subtotal,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, backgroundColor: open ? '#f0f8ff' : '#ffffff' }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
          {row.name}
        </TableCell>
        <TableCell align="right" className="hide-on-mobile">
          <Typography variant="body1" component="div" style={{ fontWeight: 'bold' }}>
            Sub total products: {row.subtotal}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, backgroundColor: '#f9f9f9' }}>
              <Table size="small" aria-label="products">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ backgroundColor: '#e6f7ff' }}>Product Name</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#e6f7ff' }}>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product, index) => (
                    <TableRow key={product.name} style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#f0f8ff' }}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    subtotal: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData('Cleaning Products', [
    { name: 'Soap', quantity: 2 },
    { name: 'Detergent', quantity: 3 },
  ]),
  createData('Dairy', [
    { name: 'Milk', quantity: 5 },
    { name: 'Cheese', quantity: 1 },
  ]),
  createData('Fruits and Vegetables', [
    { name: 'Apple', quantity: 10 },
    { name: 'Banana', quantity: 7 },
  ]),
  createData('Meat and Fish', [
    { name: 'Chicken', quantity: 3 },
    { name: 'Fish', quantity: 4 },
  ]),
  createData('Bakery', [
    { name: 'Bread', quantity: 8 },
    { name: 'Croissant', quantity: 2 },
  ]),
];

const totalQuantity = rows.reduce((acc, row) => acc + row.subtotal, 0);

export default function CollapsibleTable() {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ backgroundColor: '#ffe6f0' }}>
                    <img src={require('../assets/shopping-list.png').default} alt="Shopping List" style={{ width: '50px', height: '50px' }} />

                    </TableCell>
                    <TableCell style={{ backgroundColor: '#ffe6f0' }}>
                      <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                        Categories
                      </Typography>
                    </TableCell>
                    <TableCell align="right" className="hide-on-mobile" style={{ backgroundColor: '#ffe6f0' }}>
                      <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                        Total products: {totalQuantity}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
