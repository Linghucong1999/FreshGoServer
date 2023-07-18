const db = require('../../db')

//商品列表
function goodLists(req, page = 1, limit = 10, order = {}, category) {
    const pages = parseInt(req.query.page) || page;  //可Number可String

    const limits = parseInt(req.query.limit) || limit;

    //如果有第三个参数并且不分类，即排序
    let orderBy = '';
    if (Object.keys(req.query).length >= 3 && Object.keys(req.query)[2] !== 'category') {
        const orderKey = Object.keys(req.query)[2];
        const orderValue = Object.values(req.query)[2];
        orderBy = `ORDER BY ${orderKey} ${orderValue}`;
    } else if (JSON.stringify(order) !== '{}') {
        const orderKey = Object.keys(order)[0];
        const orderValue = Object.values(order)[0];
        orderBy = `ORDER BY ${orderKey} ${orderValue}`;
    }

    let where = '';
    if (req.query.category || category) {
        const categoryValue = category || Object.values(req.query.category);
        where = `WHERE category=${categoryValue}`;
    }

    const offset = (pages - 1) * limits;
    const sql = `SELECT * FROM vegetable_goods ${where} ${orderBy} LIMIT ${offset},${limits}`;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    });
}

//商品详情
function goodDetail(req) {
    const key = Object.keys(req.query)[0];
    const value = Object.values(req.query)[0];
    const sql = `SELECT * FROM vegetable_goods WHERE ${key}=${value}`;
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) reject(err);
            else resolve(results[0]);
        })
    });
}

module.exports = {
    goodLists,
    goodDetail
}
