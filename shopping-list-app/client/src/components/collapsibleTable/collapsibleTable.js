import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Row from './Row';
import { createData } from './utils';
import '../../styles.css';

export default function CollapsibleTable({ categories, onSave, onCancel, onDelete }) {
  const [categoryData, setCategoryData] = useState(categories.map(category => createData(category.name, category.products)));
  const [originalData, setOriginalData] = useState(JSON.parse(JSON.stringify(categoryData)));
  const [isModified, setIsModified] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newItem, setNewItem] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemInfo, setDeleteItemInfo] = useState({ categoryName: '', itemName: '', itemQuantity: 0 });

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories]);

  const handleQuantityChange = (categoryName, updatedProducts) => {
    setCategoryData(categoryData.map(category =>
      category.name === categoryName
        ? { ...category, products: updatedProducts, subtotal: updatedProducts.reduce((acc, product) => acc + product.quantity, 0) }
        : category
    ));
    setIsModified(true);
  };

  const handleSave = async () => {
    if (newItem) {
      const category = categoryData.find(category => category.name === selectedCategory);
      if (category.products.some(product => product.name === newItem)) {
        setDialogOpen(true);
        return;
      }

      const updatedCategoryData = categoryData.map(category => {
        if (category.name === selectedCategory) {
          category.products.push({ name: newItem, quantity: 1 });
          category.subtotal += 1;
        }
        return category;
      });
      setCategoryData(updatedCategoryData);
      setSuccessMessage(`The item "${newItem}" has been successfully added to the category "${selectedCategory}".`);
      setSuccessDialogOpen(true);
    }
    try {
      await onSave(categoryData);
      setOriginalData(JSON.parse(JSON.stringify(categoryData)));
      setIsModified(false);
      setNewItem(''); // Clear the text field
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleCancel = () => {
    setCategoryData(JSON.parse(JSON.stringify(originalData)));
    setIsModified(false);
    setNewItem(''); // Clear the text field
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNewItemChange = (event) => {
    setNewItem(event.target.value);
    setIsModified(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const confirmDeleteItem = (categoryName, itemName, itemQuantity) => {
    setDeleteItemInfo({ categoryName, itemName, itemQuantity });
    setDeleteDialogOpen(true);
  };

  const handleDeleteItem = async () => {
    const { categoryName, itemName, itemQuantity } = deleteItemInfo;
    try {
      await onDelete(categoryName, itemName);
      setCategoryData(prevCategoryData => 
        prevCategoryData.map(category => 
          category.name === categoryName ? 
            { ...category, products: category.products.filter(product => product.name !== itemName), subtotal: category.subtotal - itemQuantity } : 
            category
        )
      );
      setDeleteDialogOpen(false);
      setSuccessMessage(`The item "${itemName}" has been deleted from the category "${categoryName}".`);
      setSuccessDialogOpen(true);
      setIsModified(true);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const totalQuantity = categoryData.reduce((acc, category) => acc + category.subtotal, 0);

  return (
    <Container maxWidth="md" className="table-container">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} className="table-header">
                      <Box className="top-row">
                        <Box display="flex" alignItems="center" className="title-section">
                          <img src={require('../../assets/shopping-list.png').default} alt="Shopping List" className="responsive-img" />
                          <Typography variant="h6" component="div" className="header-text">
                            My shopping list
                          </Typography>
                        </Box>
                        <Typography variant="h6" component="div" className="header-text total-items">
                          Total Items: {totalQuantity}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoryData.map((category) => (
                    <Row key={category.name} row={category} onQuantityChange={handleQuantityChange} onDeleteItem={confirmDeleteItem} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="New Item"
                  variant="outlined"
                  value={newItem}
                  onChange={handleNewItemChange}
                  style={{ marginRight: '10px' }}
                />
                <FormControl variant="outlined" style={{ minWidth: 200 }}>
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.name} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Button variant="contained" disabled={!isModified} onClick={handleSave} color="primary">
                  Update
                </Button>
                <Button variant="outlined" disabled={!isModified} onClick={handleCancel} color="error" style={{ marginLeft: '10px' }}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>{"Item Already Exists"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sorry! This item already exists in the selected category.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={successDialogOpen}
        onClose={handleSuccessDialogClose}
      >
        <DialogTitle>{"Operation Successful"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {successMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteItem} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
  onDelete: PropTypes.func.isRequired,
};
