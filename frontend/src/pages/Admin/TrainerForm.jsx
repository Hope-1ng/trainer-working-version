import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem
} from "@mui/material";

const AddCapacityDialog = ({ open, onClose, onSubmit, userId }) => {
  const initialState = {
    experience: "",
    rating: "",
    availability: "available",
  
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!open) setFormData(initialState);
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      userId,
      experience: Number(formData.experience),
      rating: Number(formData.rating),
      availability: formData.availability,
    });


    onClose();
  };

  const isInvalidLoad =
    Number(formData.currentLoad) > Number(formData.maxLoad);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Trainer Capacity</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Experience (Years)"
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Rating"
              name="rating"
              type="number"
              inputProps={{ step: 0.1, min: 0, max: 5 }}
              value={formData.rating}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="unavailable">Unavailable</MenuItem>
            </TextField>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isInvalidLoad || !formData.experience}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCapacityDialog;
