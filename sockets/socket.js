const { io } = require('../index');
const Dj = require('../models/dj');
const Djs = require('../models/djs');

const djs = new Djs();
djs.addDj(new Dj('Armin Van Buuren'));
djs.addDj(new Dj('Miss Monique'));
djs.addDj(new Dj('David Guetta'));
djs.addDj(new Dj('Martin Garrix'));
djs.addDj(new Dj('Korolova'));
djs.addDj(new Dj('Armina'));

// Mensajes de socket
io.on('connection', client => {
   console.log('Cliente conectado');

   client.emit('active-djs', djs.getDjs());

   client.on('disconnect', () => {
      console.log('Cliente desconectado');
   });

   client.on('mensaje', (payload) => {
      console.log('mensaje!', payload);
      io.emit('mensaje', { admin: 'Nuevo mensaje' });
   });

   client.on('message', (payload) => {
      io.emit('message', payload);
   });

   client.on('vote-dj', (payload) => {
      djs.voteDj(payload.id);
      io.emit('active-djs', djs.getDjs());
   });

   client.on('add-dj', (payload) => {
      const newDj = new Dj(payload.name);
      djs.addDj(newDj);
      io.emit('active-djs', djs.getDjs());
   });

   client.on('delete-dj', (payload) => {
      djs.deleteDj(payload.id);
      io.emit('active-djs', djs.getDjs());
   });
});