var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req,res) => { 

  let form = new formidable.IncomingForm({

    uploadDir: './upload', // Define o diretorio ao qual sera feito o upload
    keepExtensions: true    // Obriga a manter as extensões dos arquivos
     
  });

  form.parse(req, (err, fields, files) => { 

    res.json({
      files: files
    });

  });

});

module.exports = router;
