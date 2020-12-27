exports.getProduct = async (req, res) => {
    let query = 'SELECT product.id_product AS id, product.name AS name, category.id_category AS id_category, category.name AS name_category  FROM `product` INNER JOIN `category` ON product.fk_category_id=category.id_category';
     await  db.query(query, (err, response) => {
        var result = [], index = {};
        if (err) {
            return res.status(500).send(err);
        }
        else {
         response.forEach( (row) => {
          if ( !(row.id in index) ) {
            index[row.id] = {
                id: row.id,
                name: row.name,
                category: {
                    id: row.id_category,
                    name: row.name_category
                }
            };
            result.push(index[row.id]);}
            });
            console.log(result);
         }
        res.send( { 
            result
         });
    });
}

exports.getProductByID = async (req,res)=>{
    let id_product = req.params.id;
    var result = [], index = {};
    let query = "SELECT product.id_product AS id, product.name AS name, category.id_category AS id_category, category.name AS name_category  FROM `product`,`category`  WHERE id_product = '" + id_product + "' AND product.fk_category_id = category.id_category ";
    await db.query(query, (err, response) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            response.forEach( (row) => {
                if ( !(row.id in index) ) {
                    index[row.id] = {
                        id: row.id,
                        name: row.name,
                        category: {
                            id: row.id_category,
                            name: row.name_category
                        }
                    };
                    result.push(index[row.id]);} 
                    console.log(result);
            });
            res.send( { 
                result
             });
        }
    });
}

exports.addProduct = async (req,res)=>{
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      else {
      let name = req.body.name;
      let id_category = req.body.categoryId;
      let query = "INSERT INTO `product` (`name`,`fk_category_id`) VALUES ('" + name + "', '" + id_category + "')";
    await db.query(query, (err, response) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
              res.send({ result: "product added successfully!" });
            }
    }); }
}