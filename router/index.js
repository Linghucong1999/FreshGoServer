// 路由逻辑处理

const express = require('express');
const goodAction = require('./action/goods');
const userAction = require('./action/user');
const router = express.Router();

//获取首页数据
router.get('/index', (req, res) => {
    const p1 = goodAction.goodLists(req, 1, 5, { discountPrice: 'asc' });    //折扣商品

    const p2 = goodAction.goodLists(req, 1, 5, { newComerPrice: 'asc' });   //新人商品

    const p3 = goodAction.goodLists(req, 1, 6, { id: 'asc' }, 1); //水果分类商品

    const p4 = goodAction.goodLists(req, 1, 6, { id: 'asc' }, 2); //蔬菜分类商品

    const p5 = goodAction.goodLists(req, 1, 6, { id: 'asc' }, 4);    //生鲜分类商品

    //后续需要的数据再继续添加进来，例如还有肉质食品，饮料还没有上传

    const p6 = goodAction.goodLists(req, 1, 6, { id: 'asc' }, 3) //肉质分类食品

    const p7 = goodAction.goodLists(req, 1, 6, { id: 'asc' }, 5) //饮料分类食品

    const p8 = goodAction.goodLists(req, 1, 6, { id: 'asc' }, 6) //糕点分类食品


    Promise.all([p1, p2, p3, p4, p5]).then(pres => {
        res.send({
            code: '1',
            data: {
                discountList: pres[0],    //折扣商品数据查询结果给discountList
                newComerList: pres[1],   //新人折扣数据查询结果给newcomerList
                fruitList: pres[2],  //水果数据查询结果返回给fruitList
                vegetableList: pres[3],  //蔬菜数据放到这里
                seafoodList: pres[4],    //生鲜数据放到这里
            }
        });
    });
});

//查询所有商品数据
router.get('/good/lists',(req,res)=>{
    goodAction.goodLists(req).then(results=>{
        res.send({
            code:'1',
            data:results
        })
    })
});

//单个商品详情
router.get('/good/detail',(req,res)=>{
    goodAction.goodDetail(req).then(result=>{
        res.send({
            code:'1',
            data:result
        })
    })
});

module.exports = router;