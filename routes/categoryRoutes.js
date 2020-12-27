exports.getCategory =  async (req, res) => {
    let query = 'SELECT id_category, name FROM `category`';
     await  db.query(query, (err, response) => {
        res.send( { 
            response
         });
    });

}

exports.addCategory = async (req,res)=>{
   
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      else {
      let name = req.body.name;
      
      let query = "INSERT INTO `category` (`name`) VALUES ('" + name + "')";
     
      await db.query(query, (err, response) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
              res.send({ result: "category added successfully!" });
            }
    }); }
    
}