// request ID + url
router.get('/sfa/:idsfa', (req, res) => {
            
  db.collection("productsmanutan").findOne({"ClassificationReference.attribut.ClassificationID" : req.params.idsfa}, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
    