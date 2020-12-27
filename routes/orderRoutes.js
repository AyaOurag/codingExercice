exports.getOrders = async (req, res) => {
    let query = ' SELECT po.id_product AS id, po.selling_unit_price AS price , po.quantity AS quantity, category.id_category AS id_category, category.name AS name_category\
    FROM `product_order` po \
    INNER JOIN product ON product.id_product = po.id_product \
    INNER JOIN category ON category.id_category = product.fk_category_id';
     await  db.query(query, (err, response) => {
         var result = [], index = {};
         if (err) {
             return res.status(500).send(err);
         }
         else {
             console.log(response);
             response.forEach( (row) => {
              if ( !(row.id in index) ) {
                  index[row.id] = {
                      id: row.id,
                      price: row.price,
                      name: row.name,
                      quantity: row.quantity,
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
 };

 exports.getOrderByID = async (req,res)=>{
    let id_order = req.params.id;
    var result = [], index = {};
     let query = "SELECT product_order.id_product AS id, product_order.selling_unit_price AS price, product.name AS name, product_order.quantity AS quantity, category.id_category AS id_category, category.name AS name_category \
     FROM `product_order` \
     INNER JOIN product ON product.id_product=product_order.id_product \
     INNER JOIN category ON category.id_category=product.fk_category_id \
     WHERE (product_order.id_order = '" + id_order + "')"
    await db.query(query, (err, response) => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
           console.log(response);
           response.forEach( (row) => {
            if ( !(row.id in index) ) {
                index[row.id] = {
                    id: row.id,
                    price: row.price,
                    name: row.name,
                    quantity: row.quantity,
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

