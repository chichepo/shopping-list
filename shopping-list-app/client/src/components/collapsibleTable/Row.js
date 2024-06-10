import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
  const { row, onQuantityChange } = props;
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(row.products);

  const handleQuantityChange = (productName, change) => {
    const updatedProducts = products.map(product =>
      product.name === productName
        ? { ...product, quantity: Math.max(product.quantity + change, 0) }
        : product
    );
    setProducts(updatedProducts);
    onQuantityChange(row.name, updatedProducts);
  };

  useEffect(() => {
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

export default Row;
