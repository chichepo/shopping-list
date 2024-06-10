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
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
  const { row, onQuantityChange } = props;
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState(row.products);

  const handleQuantityChange = (productName, change) => {
    const updatedProducts = products.map(product =>
      product.name === productName
        ? { ...product, quantity: Math.max(product.quantity + change, 0) }
        : product
    );
    setProducts(updatedProducts);
    onQuantityChange(row.name, updatedProducts);
  };

  React.useEffect(() => {
    setProducts(row.products);
  }, [row.products]);

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
            Sub total products: {products.reduce((acc, product) => acc + product.quantity, 0)}
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
                    <TableCell align="center" style={{ backgroundColor: '#e6f7ff' }}>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={product.name} style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#f0f8ff' }}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center" justifyContent="center">
                          <IconButton
                            aria-label="decrease"
                            size="small"
                            onClick={() => handleQuantityChange(product.name, -1)}
                          >
                            <IndeterminateCheckBoxIcon />
                          </IconButton>
                          <TextField
                            value={product.quantity}
                            inputProps={{ readOnly: true, style: { fontSize: '14px' } }} // Reduced font size
                            size="small"
                            style={{ width: '50px', textAlign: 'center', margin: '0 10px' }}
                          />
                          <IconButton
                            aria-label="increase"
                            size="small"
                            onClick={() => handleQuantityChange(product.name, 1)}
                          >
                            <AddBoxIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
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
  onQuantityChange: PropTypes.func.isRequired,
};

export default function CollapsibleTable({ categories, onSave }) {
  const [categoryData, setCategoryData] = React.useState(categories.map(category => createData(category.name, category.products)));
  const [originalData, setOriginalData] = React.useState(JSON.parse(JSON.stringify(categoryData)));
  const [isModified, setIsModified] = React.useState(false);

  const handleQuantityChange = (categoryName, updatedProducts) => {
    setCategoryData(categoryData.map(category =>
      category.name === categoryName
        ? { ...category, products: updatedProducts, subtotal: updatedProducts.reduce((acc, product) => acc + product.quantity, 0) }
        : category
    ));
    setIsModified(true);
  };

  const handleSave = () => {
    onSave(categoryData);
    setIsModified(false);
    setOriginalData(JSON.parse(JSON.stringify(categoryData)));
  };

  const handleCancel = () => {
    setCategoryData(JSON.parse(JSON.stringify(originalData)));
    setIsModified(false);
  };

  const totalQuantity = categoryData.reduce((acc, category) => acc + category.subtotal, 0);

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
                    <TableCell colSpan={2} style={{ backgroundColor: '#ffe6f0', textAlign: 'center' }}>
                      <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                        My shopping list
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoryData.map((category) => (
                    <Row key={category.name} row={category} onQuantityChange={handleQuantityChange} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
              <Button variant="contained" color="error" disabled={!isModified} onClick={handleCancel} style={{ marginRight: '10px' }}>
                Cancel
              </Button>
              <Button variant="contained" disabled={!isModified} onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

CollapsibleTable.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
