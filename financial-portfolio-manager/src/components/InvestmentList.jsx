// InvestmentList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeInvestment } from '../store/portfolioSlice';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Chip,
  IconButton,
  Divider,
  // Add Dialog components for confirmation
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

function InvestmentList() {
  const dispatch = useDispatch();
  const investments = useSelector((state) => state.portfolio.investments);
  // State for delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = React.useState({
    open: false,
    investmentId: null
  });

  // Open delete confirmation dialog
  const handleDeleteClick = (investmentId) => {
    setDeleteDialog({
      open: true,
      investmentId
    });
  };

  // Close delete confirmation dialog
  const handleCloseDialog = () => {
    setDeleteDialog({
      open: false,
      investmentId: null
    });
  };

  // Confirm and execute delete
  const handleConfirmDelete = () => {
    if (deleteDialog.investmentId) {
      dispatch(removeInvestment(deleteDialog.investmentId));
    }
    handleCloseDialog();
  };

  return (
    <Box>
      {investments.length === 0 ? (
        <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
          No investments added yet.
        </Typography>
      ) : (
        <>
          <List sx={{ width: '100%' }}>
            {investments.map((investment, index) => (
              <React.Fragment key={investment.id}>
                <ListItem
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    mb: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleDeleteClick(investment.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" component="span">
                          {investment.name}
                        </Typography>
                        <Chip
                          label={investment.type}
                          size="small"
                          color={investment.type === 'Stock' ? 'primary' : 'secondary'}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                          Quantity: {investment.quantity} units
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Price: ${investment.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Total Value: ${(investment.quantity * investment.price).toFixed(2)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < investments.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialog.open}
            onClose={handleCloseDialog}
            aria-labelledby="delete-dialog-title"
          >
            <DialogTitle id="delete-dialog-title">
              Confirm Delete
            </DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this investment?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}

export default InvestmentList;