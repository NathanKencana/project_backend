var mysql = require("mysql");
var express = require('express');
var app = express();

var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));
var sess;

const crypto = require('crypto');
const secret = 'abcdefg';

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`)

var bodyParser = require('body-parser')
var url = bodyParser.urlencoded({ extended: false })

var connection = mysql.createConnection
(
    {
        host: "localhost",
        port: 3307,
        database: "ecommerce",
        user: "root",
        password: "usbw",
    }
);

app.get('/encrypt', function(req, res)
{
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
    .update('test')
    .digest('hex');
    console.log(hash);
    res.end();
})

app.get('/register', function(req, res)
{
    res.render('formregister', 
    {

    });
})

app.post('/register', url, function(req, res)
{
    //console.log(req.body);
    
    var sql = 'SELECT * FROM user WHERE username = ?';
    connection.query(sql, [req.body.username], function (err, rows) {

        if (rows.length > 0)
        {
            res.render('formlogin', 
            {
                notif:'Username sudah terdaftar !'
            });
        }
        else
        {
            const password = crypto.createHmac('sha256', secret)
            .update(req.body.password)
            .digest('hex');

            //console.log(password);

            connection.query("insert into user set ? ",
            {
                username : req.body.username,
                password : password,
            });

            res.redirect('/login');
        }
    });
})

app.get('/login', function(req, res)
{
	res.render('formlogin', 
    {
        notif:''
    });
})
app.post('/login', url, function(req, res)
{
    const password = crypto.createHmac('sha256', secret)
    .update(req.body.password)
    .digest('hex');

    var sql = 'SELECT * FROM user WHERE username = ? and password = ?';
    connection.query(sql, [req.body.username, password], function (err, rows) {
    //if (err) throw err;
    //console.log(rows[0].userid);

        if (rows.length > 0)
        {
            sess=req.session;
            sess.username = rows[0].username;
            sess.user_id = rows[0].id;

            res.redirect('/home');
        }
        else
        {
            res.render('formlogin', 
            {
                notif:'Username atau Password salah !'
            });
        }
    });
})

app.get('/adminlogin', function(req, res)
{
	res.render('adminlogin', 
    {
        notif:''
    });
})
app.post('/adminlogin', url, function(req, res)
{
    const password = crypto.createHmac('sha256', secret)
    .update(req.body.password)
    .digest('hex');

    var sql = 'SELECT * FROM admin WHERE username = ? and password = ?';
    connection.query(sql, [req.body.username, password], function (err, rows) {
    //if (err) throw err;
    //console.log(rows[0].userid);

        if (rows.length > 0)
        {
            sess=req.session;
            sess.admin = rows[0].username;

            res.redirect('/admin');
        }
        else
        {
            res.render('formlogin', 
            {
                notif:'Username atau Password salah !'
            });
        }
    });
})


//=============== Tampilan ================//
app.get('/tes', function(req, res){
    connection.query("select * from season ", function (err, rows, field){
        connection.query("select kategori.id, season.nama_season, kategori.nama_kategori from kategori join season on kategori.season_id = season.id", function(err, kategori){
            connection.query(`select nama_season, nama_kategori, nama_product, harga, description from product join kategori on product.kategori_id = kategori.id join season on season.id = kategori.season_id`, function(err, product){
                if(err) throw err;
                res.render('tes',{data : rows, kategori : kategori, product : product})
                res.end();
            })   
        })       
    })
})
//========================================================================================
app.get('/admin', function(req, res){
    sess = req.session;
    if (sess.admin==null){
        res.redirect('/adminlogin');
    }
    else{
        connection.query("select * from season ",function(err, season){
            res.render('admin', {season : season})
            // res.json(season)
            res.end();
        })
    } 
})
var tempIDkat = '';
app.get('/adminkategori/:id', function(req, res){
    sess = req.session;
    if (sess.admin==null){
        res.redirect('/adminlogin');
    }
    else{
        connection.query("select kategori.id, season.nama_season, kategori.nama_kategori from season left join kategori on kategori.season_id = season.id where season.id = ?", [req.params.id] ,function(err, kategori){
            tempIDkat = req.params.id
            res.render('adminkategori', {
                kategori : kategori, 
                seasonid : req.params.id, 
                back : tempIDkat
            })
            // res.json(kategori)
            res.end();
        })
    }
})
var tempIDprod = '';
app.get('/adminproduct/:id', function(req, res){
    sess = req.session;
    if (sess.admin==null){
        res.redirect('/adminlogin');
    }
    else{
        connection.query(`select *
        from kategori
        left join product on product.kategori_id = kategori.id  
        where kategori.id = ?`, [req.params.id],  
        function(err, product){

            connection.query(`select * from season where id = ?`, [product[0].season_id],  
            function(err2, season){
                tempIDprod = req.params.id;
                res.render('adminproduct', 
                {
                    product : product, 
                    id : req.params.id,
                    namaseason : season[0].nama_season,
                    kategoriid : req.params.id,
                    back : tempIDprod
                });
            })
        })
    }
})
var tempIDwarna = '';
app.get('/adminwarna/:id', function(req, res){
    sess = req.session;
    if (sess.admin==null){
        res.redirect('/adminlogin');
    }
    else{
        connection.query(`select warna.id, nama_warna, size, stock 
        from warna
        left join product on product.id = warna.product_id
        left join size on warna.id = size.warna_id
        where product_id = ?`, [req.params.id], function(err, warna){
            tempIDwarna = req.params.id;
            res.render('adminwarna',
            {
                warna : warna,
                productid : req.params.id,
                back : tempIDwarna
            })
        })
    }
})
var tempIDsize = '';
app.get('/adminsize/:id', function(req, res){
    sess = req.session;
    if (sess.admin==null){
        res.redirect('/adminlogin');
    }
    else{
        connection.query(`select size.id,stock,size 
        from size
        left join warna on warna.id = size.warna_id 
        where warna_id = ?`, [req.params.id], function(err,size){        
            tempIDsize = req.params.id;
            res.render('adminsize',{
                size : size,
                warnaid : req.params.id,
                back : tempIDsize
            })
        })
    }
})

//=============== Season ================//
app.get('/deleteseason/:id', function(req,res){
    connection.query("delete from season where ? ",{
        id : req.params.id
    });
    res.redirect('/admin');
});
app.post('/insertseason',url, function(req,res) {
    connection.query("insert into season set ?",{
        nama_season: req.body.season,
    });
    res.redirect(`/admin`) 
})

app.get('/editseason/:id',function(req,res){
    connection.query("select * from season where ? ", [req.params.id], function(err, season){        
        res.render('editseason', {id : req.params.id, season: season})
        // res.json({id: req.params.id, season})
    })
})
app.post('/updateseason/:id',url, function(req,res) {
    connection.query("update season set ? where ?",
    [
        {
            nama_season: req.body.season,
        },
        {
            id : req.params.id
        }
    ]);  
     res.redirect('/admin')
})

//=============== Kategori ================//
app.get('/deletekategori/:id', function(req,res){
    connection.query("delete from kategori where ? ",{
        id : req.params.id
    }, () => res.redirect(`/adminkategori/${tempIDkat}`));
});

app.post('/insertkategori/:id',url, function(req,res) {
    connection.query("insert into kategori set ?",{
        season_id: req.params.id,
        nama_kategori: req.body.kategori,
    });
    res.redirect(`/adminkategori/${tempIDkat}`) 
})
//============== Edit Kategori ===========================
app.get('/editkategori/:id', function(req,res){
    connection.query("select season.id, nama_kategori from kategori join season on season.id = kategori.season_id where kategori.id = ? ", [req.params.id] ,function(err, kategori) {
        res.render('editkategori', {id : req.params.id, kategori : kategori})
    })
})

app.post('/updatekategori/:id',url, function(req,res) {
    connection.query('update kategori set ? where ? ', 
    [
        {
            nama_kategori : req.body.update
        },
        {
            id : req.params.id
        }
    ])
    res.redirect(`/adminkategori/${tempIDkat}`);    
})

// =============== Product ================//
app.get('/deleteproduct/:id', function(req,res){
    connection.query("delete from product where ? ",{
        id : req.params.id
    });
    res.redirect(`/adminproduct/${tempIDprod}`);
});
app.post('/insertproduct/:kategoriid',url, function(req,res) {
    connection.query("insert into product set ?",{
        kategori_id : req.params.kategoriid,
        nama_product: req.body.product,
        harga: req.body.harga,
        description: req.body.description
    });
    res.redirect(`/adminproduct/${tempIDprod}`);
})
//================ Edit Product ================================
app.get('/editproduct/:id', function(req,res){
    connection.query("select kategori.id, nama_kategori, nama_product, harga, description from product join kategori on kategori.id = product.kategori_id where product.id = ? ", [req.params.id] ,function(err, product) {
        res.render('editproduct',
        {
            id : req.params.id,
            product : product,
            back : tempIDprod,
        })
    })
})

app.post('/updateproduct/:id',url, function(req,res) {
    connection.query('update product set ? where ? ', 
    [
        {
            nama_product : req.body.updateproduct,
            harga : req.body.updateharga,
            description : req.body.updatedesc
        },
        {
            id : req.params.id
        }
    ])
    res.redirect(`/adminproduct/${tempIDprod}`);    
})
// =============== Warna ================//
app.get('/deletewarna/:id', function(req,res){
    connection.query("delete from warna where ? ",{
        id : req.params.id
    });
    res.redirect(`/adminwarna/${tempIDwarna}`);
});
app.post('/insertwarna/:productid',url, function(req,res) {
    connection.query("insert into warna set ?",{
        product_id : req.params.productid,
        nama_warna: req.body.warna,
    });
    res.redirect(`/adminwarna/${tempIDwarna}`);
})
//================ Edit Warna ================================
app.get('/editwarna/:id', function(req,res){
    connection.query("select * from warna where ? ", [req.params.id] ,function(err, warna) {
        res.render('editwarna',
        {
            id : req.params.id,
            warna : warna,
            back : tempIDwarna,
        })
    })
})
app.post('/updatewarna/:id',url, function(req,res) {
    connection.query('update warna set ? where ? ', 
    [
        {
            nama_warna : req.body.warna
        },
        {
            id : req.params.id
        }
    ])
    res.redirect(`/adminwarna/${tempIDwarna}`);    
})
//=================== Size =========================
app.get('/deletesize/:id', function(req,res){
    connection.query("delete from size where ? ",{
        id : req.params.id,
    });
    res.redirect(`/adminsize/${tempIDwarna}`);
});
app.post('/insertsize/:warnaid',url, function(req,res) {
    connection.query("insert into size set ?",{
        warna_id : req.params.warnaid,
        size: req.body.size,
        stock: req.body.stock
    })  
    res.redirect(`/adminwarna/${tempIDwarna}`);
})
//================ Edit Size ================================
app.get('/editsize/:id', function(req,res){
    connection.query("select warna.id,size,stock,nama_warna from size join warna on warna.id = size.warna_id where size.id = ? ", [req.params.id] ,function(err, size) {
        res.render('editsize',
        {
            id : req.params.id,
            size : size
        })
    })
})
app.post('/updatesize/:id',url, function(req,res) {
    connection.query('update size set ? where ? ', 
    [
        {
            size : req.body.size,
            stock : req.body.stock
        },
        {
            id : req.params.id
        }
    ])
    res.redirect(`/adminsize/${tempIDsize}`);    
})

























// ================================ User ====================================

app.get('/home', function(req, res){
    connection.query("select * from season ",function(err, season){
        res.render('userseason', {season : season})
        // res.json(season)
        res.end();
    })
})
app.get('/userkategori/:id', function(req, res){
    connection.query("select kategori.id, season.nama_season, kategori.nama_kategori from season left join kategori on kategori.season_id = season.id where season.id = ?", [req.params.id] ,function(err, kategori){
        res.render('userkategori', {
            kategori : kategori, 
            seasonid : req.params.id, 
        })
        // res.json(kategori)
        res.end();
    })
})
app.get('/userproduct/:id', function(req, res){
    connection.query(`select kategori.id, nama_kategori, nama_product, product.id, harga, description, kategori_id, season_id
    from kategori
    left join product on product.kategori_id = kategori.id  
    where kategori.id = ?`, [req.params.id],  
    function(err, product){
        connection.query(`select * from season where id = ?`, [product[0].season_id],  
        function(err2, season){
            res.render('userproduct', 
            {
                product : product, 
                id : req.params.id,
                namaseason : season[0].nama_season,
                kategoriid : req.params.id,
            });
        })
    })
})
app.get('/userwarna/:id', function(req, res){
    connection.query(`select warna.id, nama_warna, size, stock, nama_kategori, nama_product
    from warna
    left join product on product.id = warna.product_id
    left join size on warna.id = size.warna_id
    left join kategori on kategori.id = product.kategori_id
    where product_id = ?`, [req.params.id], function(err, warna){
        res.render('userwarna',
        {
            warna : warna,
            productid : req.params.id,
        })
    })
})
// Buat Show isi cart yang ada
app.get('/usercart/:id', function(req, res){
    connection.query(`select * from cart where user_id = ?`, [req.session.user_id] ,function(err, cart){
        res.render('usercart',
        {
            cart : cart,
            user_id : req.session.user_id
        })
    })
})
// Untuk memasukkan barang yang ingin dibeli ke cart
app.post('/usercart/', function(req, res){
    connection.query(`insert into cart set ? `, {
        user_id : req.session.user_id,
        size_id : req.body.sid,
        nama_product : req.body.product,
        nama_warna : req.body.warna,
        size : req.body.size,
        harga : req.body.harga,
        qty : req.body.qty
    })
    res.json(req.body);
})



















app.listen(3000, console.log('server run'))