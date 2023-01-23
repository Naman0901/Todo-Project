const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json())

app.get('/todos/:id', async (req, res) => {
    try {
        var data = await pool.query("select type from userdata where stud_id = $1", [req.params.id]);
        if (data.rows[0].type != "super admin")
            var allTodo = await pool.query("select * from todo where id=$1 order by task_id DESC", [req.params.id]);
        else {
            var allTodo = await pool.query("select * from todo order by task_id DESC");
        }
        res.json(allTodo.rows);
    } catch (err) {
        console.log(err.message)
    }
});


app.get('/user/:id', async (req, res) => {
    try {
        const user = await pool.query("select * from userdata where stud_id = ($1)", [req.params.id]);
        res.json(user.rows);
    } catch (err) {
        console.log(err.message)
    }
})

app.post('/todos', async (req, res) => {
    try {
        const { task, name, id } = req.body;
        const newtodo = await pool.query("INSERT into todo (id, name, task) values ($1,$2,$3) returning *", [id, name, task]);
        res.json(newtodo.rows[0])
    } catch (err) {
        console.log(err.message)
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const { task } = req.body;
        const updatetodo = await pool.query("update todo set task = ($1) where task_id = ($2)", [task, req.params.id]);
        res.json("todo updated");
    } catch (err) {
        console.log(err.message)
    }
})

app.delete('/todos/:id', async (req, res) => {
    try {
        const deletetodo = await pool.query("delete from todo where task_id = ($1)", [req.params.id]);
        res.json("todo deleted");
    }
    catch (err) {
        console.log(err.message)
    }
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})
