const connection= require('./connection') ;

const express= require('express');
const bodyParser= require('body-parser');

const app= express();
const port= 8000;


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

//get all the employees 
app.get('/employees', (req,res)=>{
    connection.query('select * from employee', (err,rows)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(rows)}
    })
}); 


//fetch detail of single employee
app.get('/employee/:id', (req,res)=>{
    connection.query('select * from employee where id=?',[req.params.id], (err,rows)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(rows)}
    })
});



//delete employee
app.delete('/employee/:id', (req,res)=>{
    connection.query('delete from employee where id=?',[req.params.id], (err,rows)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(rows)}
    })
});


//insert new employee
app.post('/newemployee', (req,res)=>{
    var emp = req.body;
    // console.log(emp);
    connection.query('insert into employee (name,salary) values(?,?)',[emp.name, emp.salary] ,
     (err,rows)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(rows)}
    })
});

//update the existing employee detail
app.patch('/updateemployee', (req,res)=>{
    var emp = req.body;
    // console.log(emp.id)
    connection.query('UPDATE employee SET ? WHERE id=?',[emp, emp.id] ,
    (err,rows)=>{
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(rows)}
    
        })
    });

//     


app.get('/employeesalary/:id', (req,res)=>{
        const reqid=req.params.id;
        connection.query(`select salary from employee where id=${reqid}`,(err,salary)=>{
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }

            if (salary.length === 0) {
                return res.status(404).json({ error: 'Employee not found' });
              }
        
            console.log(salary);

            const employeeSalary = salary[0].salary;

            connection.query('SELECT name from employee where salary=?',employeeSalary, (err,rows)=>{
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json(rows)}
        
        })
    
    })
});


// app.get('/employeesalary/:id', async (req,res)=>{
//     const reqid = req.params.id;
//     const salary = await connection.query(`select salary from employee where id=${reqid}`,(err,salary)=>{
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }

//         if (salary.length === 0) {
//             return res.status(404).json({ error: 'Employee not found' });
//           }
    
//         console.log(salary);
//         res.status(200).json(salary);
    
//         });

//     const employeeSalary = salary[0].salary;

//     connection.query('SELECT name from employee where salary=?',employeeSalary, (err,rows)=>{
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.status(200).json(rows)}
    
//     })
//     });


// app.get('/employeesalary/:id', async (req,res)=>{
//     const reqid = req.params.id;
//     const [salary] = await connection.promise().query(`select salary from employee where id=${reqid}`)
//     console.log(salary);
//         if (salary.length === 0) {
//             return res.status(404).json({ error: 'Employee not found' });
//           }
    
//     const employeeSalary = salary[0].salary;

//     connection.query('SELECT name from employee where salary=?',[employeeSalary], (err,rows)=>{
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.status(200).json(rows)}
    
//     })
//     });



app.listen(port, (err)=>{
    if(err){
        console.log(`Error in Running the server: ${err}`)
    }

    console.log(`Listening to the port http://localhost:${port}`);
    
});
