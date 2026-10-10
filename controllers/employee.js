/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
import { Employee, sequelize } from "../models/Employee.js";
await sequelize.sync();
const employee ={
  // READ ALL EMPLOYEES
index: async (req, res) => {

        const employees = await Employee.findAll();

        res.render("insert", { employees });

},

    insert: async (req, res) => {
        const {
            FirstName,
            LastName,
            Department,
            Position,
            Salary,
            EmploymentStatus,
        }= req.body;
        const student = await Employee.create ({
            FirstName,
            LastName,
            Department,
            Position,
            Salary,
            EmploymentStatus
        });
        res.redirect("/employees")

},

    // GET ONE EMPLOYEE FOR EDITING
getEmployee: async (req, res) => {
        const id = req.params.id;
        const employee = await Employee.findByPk(id);


        res.render("edit", { employee });
},
  // UPDATE
update: async (req, res) => {

        const { id } = req.params;

        const {
            FirstName,
            LastName,
            Department,
            Position,
            Salary,
            EmploymentStatus
        } = req.body;

        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        await employee.update({
            FirstName,
            LastName,
            Department,
            Position,
            Salary: Salary === "" ? null : Salary,
            EmploymentStatus
        });

        res.redirect("/employees");

},
// DELETE
delete: async (req, res) => {

        const { id } = req.params;
        const employee = await Employee.findByPk(id);


        await employee.destroy();

        res.redirect("/employees");

    },
};

export { employee };
