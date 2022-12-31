

//ติดต่อกับฐานข้อมูล / ดำเนินการกับฐานข้อมูล
const slugify = require("slugify");
const Blogs = require("../models/blogs")
const {v4 : uuidv4} = require('uuid')

//ติดต่อกับฐานข้อมูล

exports.create=(req,res)=>{
    const {title,content,author} = req.body;
    let slug = slugify(title)

    if(!slug)slug=uuidv4();

    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อบทความ"})
            break;
        
    }
    //บันทึกข้อมูล
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:err})
        }
        res.json(blog)
    })
    

}

//ดึงข้อมูลมาแสดงทั้งหมด

exports.getallblogs=(req,res)=>{
    Blogs.find({}).exec((err,blog)=>{
        res.json(blog)
    })
}

//เรียกดูบทความอันเดียวอันเดียว
exports.singleblog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:"ลบบทความเรียบร้อย"
        })
    })
}

exports.updated=(req,res)=>{
    const {slug} = req.params
    const {title,content,author} = req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
}