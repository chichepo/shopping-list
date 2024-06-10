import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Box } from '@mui/material';
import Row from './Row';
import { createData } from './utils';
import './styles.css';

export default function CollapsibleTable({ categories, onSave, onCancel }) {
  const [categoryData, setCategoryData] = useState(categories.map(category => createData(category.name, category.products)));
  const [originalData, setOriginalData] = useState(JSON.parse(JSON.stringify(categoryData)));
  const [isModified, setIsModified] = useState(false);

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
    <Container maxWidth="md" className="margin-top">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ backgroundColor: '#ffe6f0' }}>
                      <img src={require('../../assets/shopping-list.png').default} alt="Shopping List" style={{ width: '50px', height: '50px' }} />
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
