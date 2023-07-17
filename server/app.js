const express =require('express');
const app =express();
const cors =require('cors');
const pool=require('./db'); //calls or require dj.js
//middleware on cors and express
app.use(cors());
app.use(express.json());//req.body 
//ROUTES

//create todo
app.post('/todos',async(req ,res)=> {///POST FOR ADDING DATA
    try{
        const{
            todo_name,todo_day //description
        } =req.body;
        const newTodo = await pool.query("INSERT INTO todotable (todo_name,todo_day)VALUES($1,$2) RETURNING *;",//value placeholder for our todo_name,and todo_id
        [todo_name,todo_day]);//return data for updating or detelating a data

        res.json(newTodo.rows[0])
    } catch(error){    //try catch makes handing of errors easy
        console.error(error.message); //throw error to the console 
    }
});
app.get('/', async(req, res) =>{
    try{
        res.send('GDSC RONGO UNIVERSITY');
    } catch (error){
        console.error(error.message);
    }
});
//get all todos
app.get('/todos',async(req ,res)=>{
    try{
    const alltodos= await pool.query('SELECT * FROM todotable;');
    res.json(alltodos.rows)
    console.log('getting all todos');
    }catch (error) {
console.error(error.message);

    }
});
//get one todo
app.get('/todos/:id',async(req ,res)=>{
    try{
    const {id}=req.params
    const alltodos= await pool.query('SELECT * FROM todotable WHERE todo_id=$1;',[id]);//where specifies what we want to do
    res.json(alltodos.rows)
    console.log(`getting todo ${id}`);
    }catch (error) {
console.error(error.message);

    }
});

//delete a todo

app.delete("/todos/delete/:id",async(req,res) =>{
    try {
        const {id } =req.params;
        const deletetodo =await pool.query("DELETE FROM todo WHERE todo_id = $1",[
            id
        ]);
        res.json("todo was deleted");
    } catch (error) {
        console.log(error.message)
    }
})

//update a todo
app.put("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const {todo_name,todo_day} =req.body;
        const updatetodo = await pool.query("UPDATE todo SET (todo_name,todo_day) =$2",
        [(todo_name,todo_day),id]);

        res.json("todo was updated");
    } catch (error) {

        console.error(error.message)
    }
})


const server = app.listen(8080,'0.0.0.0',()=>{
    const host =server.address().address
    const port =server.address().port
    console.log(`server is listening at http://${host}:${port}`)
})
