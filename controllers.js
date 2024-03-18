import connection from "./db.js";

const showfunction = async (req, res) => {
    const ans = await connection.query('SELECT * FROM product_info')
        .catch(err => { console.log(err); })
    res.send(ans[0])
}
const addfunction = async (req, res) => {

    const id = req.body.id
    const productId = req.body.productId
    const productName = req.body.productName
    const CategoryName = req.body.CategoryName
    const CategoryId = req.body.CategoryId



    const ans = await connection.query(`INSERT INTO product_info ( id, productId, productName, CategoryName, CategoryId) VALUES (?,?,?,?,?)  `, [id, productId, productName, CategoryName, CategoryId])

        .catch(err => { console.log(err); })
    // res.send(console.log(req.body) )

    // res.send(console.log('sucsses'))
}
const showbyid = async (req, res) => {

    const ans = await connection.query("SELECT id, productId, productName, CategoryName, CategoryId FROM product_info WHERE id=?", [req.params.id])
        .catch(err => { console.log(err); })
    res.send(ans[0])
}

const deletefunction = async (req, res) => {
    const id = req.params.id
    res.send(console.log(id))
    const ans = await connection.query("DELETE FROM product_info WHERE id=?", [id])
}

const updatefunction = async (req, res) => {
    // const id = req.params.id
    const productId = req.body.productId
    const productName = req.body.productName
    const CategoryName = req.body.CategoryName
    const CategoryId = req.body.CategoryId
    const querytwo = `UPDATE \`product_info\` SET \`productId\`='${productId}', \`productName\`='${productName}', \`CategoryName\`='${CategoryName}', \`CategoryId\`='${CategoryId}' WHERE id = 2`
    const query = "UPDATE product_info SET productId = ?, productName = ?, categoryName = ?, categoryId = ? WHERE id = ?"
    const ans = await connection.query(query, [productId, productName, CategoryName, CategoryId, req.params.id])
    // const ans = await connection.query(querytwo)
    // res.send(console.log(query,querytwo))


}


export { showfunction, addfunction, deletefunction, showbyid, updatefunction };