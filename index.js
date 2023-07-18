const express=require('express')
const cors=require('cors')
const router=require('./router')

const app=express()
app.use(express.urlencoded({extended:false}))//解析表单信息
app.use(express.json()) //解析json信息
app.use(cors()) //解决跨域问题

app.use(router)

app.listen(8806,'172.17.49.236',()=>{
    console.log('http://172.17.49.236:8806')
})