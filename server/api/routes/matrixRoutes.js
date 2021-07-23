'use strict';
module.exports = function(app) {
  const matrixCont = require('../controllers/matrixPollingController');

  const cors = require('cors');
  const corsOptions = {
      origin: 'http://localhost:4200',
      methods: "GET",
      //allowedHeaders: 'Access-Control-Allow-Origin,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    }
  app.use(cors(corsOptions));

  //polling
  app.route('/matrixData')
    .get(matrixCont.get_data)

  app.route('/checkForMatrixUpdates')
  .get(matrixCont.get_update)


};
