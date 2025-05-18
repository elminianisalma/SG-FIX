import React, { useState } from 'react';
import { Button, TextField, Typography, Select, MenuItem, Box, Paper } from '@mui/material';

const IncidentUpdate = () => {
  const [status, setStatus] = useState<string>('Ouvert');
  const [documentation, setDocumentation] = useState<string>('');

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  const handleDocumentationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentation(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Statut:', status);
    console.log('Documentation:', documentation);
    alert('Incident mis à jour avec succès');
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '500px' }}>
      <Typography variant="h5" gutterBottom>
        Mise à Jour de l'Incident
      </Typography>

      <Box mb={2}>
        <Typography variant="subtitle1">Changer le Statut :</Typography>
        <Select
          value={status}
          onChange={handleStatusChange}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="Ouvert">Ouvert</MenuItem>
          <MenuItem value="En cours">En cours</MenuItem>
          <MenuItem value="Résolu">Résolu</MenuItem>
        </Select>
      </Box>

      <Box mb={2}>
        <Typography variant="subtitle1">Ajouter une Documentation :</Typography>
        <TextField
          label="Commentaires techniques"
          value={documentation}
          onChange={handleDocumentationChange}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
      >
        Mettre à jour l'incident
      </Button>
    </Paper>
  );
};

export default IncidentUpdate;
