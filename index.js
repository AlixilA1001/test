const app=require('express')();
const server=require('http').createServer(app);
const io =require('socket.io')(server);
const morgan =require('morgan')
const bodyParser=require('body-parser')
const port =3000

app.use(bodyParser.json())
app.use(morgan('dev'))
app.get('/test',(req,res)=>res.send('Hello, Samuel!'))
app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/index.html`)
})

io.on('connection',(socket)=>{
    console.log('Un utilisateur s\'est connecté.');

    socket.on('disconnect',()=>{
        console.log('User disconnected')
    });
    socket.on('chat message',(msg)=>{
        console.log('message:' + msg);
        io.emit('chat message',msg);
    });
});

server.listen(3000,()=>{
    console.log('Serveur sur le port 3000');
})

