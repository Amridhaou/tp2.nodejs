const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let voitures = [
  { id: 1, name: "clio" },
  { id: 2, name: "megane" },
  { id: 3, name: "range" }
];

// API pour ajouter une voiture
app.post('/voitures', (req, res) => {
  const nouvelleVoiture = req.body;
  voitures.push(nouvelleVoiture);
  res.json({ message: 'Voiture ajoutée avec succès', voiture: nouvelleVoiture });
});

// API pour lister toutes les voitures
app.get('/voitures', (req, res) => {
  res.json(voitures);
});

// API pour lister une voiture par ID
app.get('/voitures/:id', (req, res) => {
  const voitureId = parseInt(req.params.id);
  const voiture = voitures.find(v => v.id === voitureId);

  if (voiture) {
    res.json(voiture);
  } else {
    res.status(404).json({ message: 'Voiture non trouvée' });
  }
});

// API pour modifier une voiture par ID
app.put('/voitures/:id', (req, res) => {
  const voitureId = parseInt(req.params.id);
  const index = voitures.findIndex(v => v.id === voitureId);

  if (index !== -1) {
    voitures[index] = req.body;
    res.json({ message: 'Voiture modifiée avec succès', voiture: voitures[index] });
  } else {
    res.status(404).json({ message: 'Voiture non trouvée' });
  }
});

// API pour supprimer une voiture par ID
app.delete('/voitures/:id', (req, res) => {
  const voitureId = parseInt(req.params.id);
  const index = voitures.findIndex(v => v.id === voitureId);

  if (index !== -1) {
    const voitureSupprimee = voitures.splice(index, 1)[0];
    res.json({ message: 'Voiture supprimée avec succès', voiture: voitureSupprimee });
  } else {
    res.status(404).json({ message: 'Voiture non trouvée' });
  }
});

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
