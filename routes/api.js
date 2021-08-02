const express = require('express'),
  parseJson = require('parse-json'),
  BrCode = require('./lib/br_code.js'),
  QRCode = require('qrcode');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  let data = JSON.stringify(req.query),
  obj = JSON.parse(data),
  QR_CODE_SIZE = 400;
  console.log(obj);
  
  // https://Pix-QRCODE.sardinhacn.repl.co/api?key=sar.anime.mania@gmail.com&amount=R$ 1,00&name=Ygor de Souza Zanotti&key_type=email&city=Andradina-SP&reference=

  if (obj.key) {
    const brCode = new BrCode(obj.key, obj.amount, obj.name, obj.reference, obj.key_type, obj.city);
    let code = brCode.generate_qrcp();
    QRCode.toDataURL(code, { width: 400, height: 400 })
    .then(qrcode => {
      res.status(304);
      res.json({
        qrcode_base64: qrcode,
        code: code,
        key_type: brCode.key_type,
        key: brCode.key,
        amount: brCode.amount,
        name: brCode.name,
        city: brCode.city,
        reference: brCode.reference,
        formated_amount: brCode.formated_amount()
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        message: "Teu erro no QRCode",
        error: err
      });
    });
  } else {
    res.status(422);
    res.json({ error: "Campo Key não presente" });
  }
});

// router.post('/', function(req, res, next) {
//  let data = JSON.stringify({
//     key: req.body.key,
//     amount: req.body.amount,
//     name: req.body.name,
//     reference: req.body.reference,
//     key_type: req.body.key_type,
//     city: req.body.city
//   }),
//   obj = JSON.parse(data),
//   QR_CODE_SIZE = 400;

//   console.log({
//     key: req.body.key,
//     amount: req.body.amount,
//     name: req.body.name,
//     reference: req.body.reference,
//     key_type: req.body.key_type,
//     city: req.body.city
//   })

//   if (obj.key) {
//     const brCode = new BrCode(obj.key, obj.amount, obj.name, obj.reference, obj.key_type, obj.city);
//     let code = brCode.generate_qrcp();
//     QRCode.toDataURL(code, { width: 400, height: 400 })
//     .then(qrcode => {
//       res.status(304);
//       res.json({
//         qrcode_base64: qrcode,
//         code: code,
//         key_type: brCode.key_type,
//         key: brCode.key,
//         amount: brCode.amount,
//         name: brCode.name,
//         city: brCode.city,
//         reference: brCode.reference,
//         formated_amount: brCode.formated_amount()
//       });
//     })
//     .catch(err => {
//       console.error(err);
//     });
//   } else {
//     res.status(422);
//     res.json({ error: "Campo Key não presente" });
//   }
// });

//router.put('/', function(req, res, next) {
// 
//});

//router.delete('/', function(req, res, next) {
// 
//});


module.exports = router;