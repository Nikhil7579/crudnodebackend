const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { user ,product} = require('./model/userModel');
const sha1 = require('sha1');
const cors = require('cors')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.get('/get', (req, res) => {
    console.log('tesss');
    res.json('Hello');
});


app.post('/signup', async (req, res) => {
    try {
        let password = req.body.password;
        password = sha1(password);
        const { firstname, email } = req.body;
        const data = { firstname, email };
        data.password = password
        const createData = await user.create(data);
        if (createData) {
            res.status(201).json(createData)
        }
    } catch (error) {
        console.log(error);
    }
});



app.post('/login', async (req, res) => {
    try {
        let password = req.body.password;
        password = sha1(password);
        const email = req.body.email;
        const get = await user.findOne({ where: { email: email } });
        if (get) {
            if(get.password == password){
                console.log('success');
                res.status(200).json({'status':'true', "message":'success'})
            }
            else{
                console.log('email not found')
                res.status(404).json({'status':'false', "message":'not fund'})
            }
        }
    } catch (error) {
        console.log(error);
    }
})




app.post('/createproduct', async (req, res) => {
    try {
        const { category , price , model, company } = req.body;
        const data = {category , price , model, company  };
        const createData = await product.create(data);
        if (createData) {
            res.status(201).json({'status':'true',createData})
        }
    } catch (error) {
        console.log(error);
    }
});







app.get('/getproduct', async (req, res) => {
    try {
        const getproduct = await product.findAll();
        if (getproduct) {
            res.status(200).json({'status':'true',getproduct})
        }
    } catch (error) {
        console.log(error);
    }
});


app.get('/getproduct/:id', async (req, res) => {
    try {
        const productid = req.params.id
        const getproduct = await product.findOne({where:{id:productid}});
        if (getproduct) {
            res.status(200).json({'status':'true',getproduct})
        }
        else{
            res.status(400).json({'status':'true','message':'Product not found'})

        }
    } catch (error) {
        console.log(error);
    }
});


app.delete('/getproduct/:id', async (req, res) => {
    try {
        const productid = req.params.id
        if(productid){
            const getproduct = await product.destroy({where:{id:productid}});
            if (getproduct) {
                res.status(200).json({'status':'true',getproduct})
            }
            else{
                res.status(400).json({'status':'true','message':'Product not found'})
    
            }
        }
        else{
            res.status(400).json({'status':'false','message':'Id is require'})

        }
        
    } catch (error) {
        console.log(error);
    }
});


app.put('/updateproduct/:id', async (req, res) => {
    try {
        const productid = req.params.id
        const { category , price , model, company } = req.body;
        const data = {category , price , model, company};
        if(productid){
            const updateproduct = await product.update(data,{where:{id:productid}});
            if (updateproduct) {
                res.status(200).json({'status':'true',updateproduct})
            }
        }
        else{
            res.status(400).json({'status':'false','message':'Id is require'})

        }
        
    } catch (error) {
        console.log(error);
    }
});
const port = 3000;

app.listen(port, (req, res) => {
    console.log('Server lisning at', port)
});