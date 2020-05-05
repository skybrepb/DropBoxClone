var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs'); // api para sistema de arquivos

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/file', (req,res) => {

  let path = './' + req.query.path;

  if (fs.existsSync(path)) {

    fs.readFile(path, (err, data) => {

      if (err) {

        console.error(err);
        res.status(400).json({error: err});

      } else {

        res.status(200).end(data);
      };
    });

  } else {

    res.status(404).json({ error: 'file not found'});

  };

});

router.delete('/file', (req,res) => {

  let form = new formidable.IncomingForm({

    uploadDir: './upload', // Define o diretorio ao qual sera feito o upload
    keepExtensions: true    // Obriga a manter as extensões dos arquivos
     
  });

  form.parse(req, (err, fields, files) => { 

    let path = './' + fields.path;

    if (fs.existsSync(path)) { // Verifica se o arquivo existe 

      fs.unlink(path, err => {

        if (err) {
          console.log('Erro Exclusão', err)
          res.status(400).json({err});

        } else {

          res.json({
            fields
          });
      
          
        };
      });
    } else {

      console.log('Arquivo não encontrado', path);
      
    };


  })

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
