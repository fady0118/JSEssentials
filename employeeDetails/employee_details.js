const employees = [
    { id: 1, name: 'John Doe', age: 30, department: 'IT', salary: 50000 },
    { id: 2, name: 'Alice Smith', age: 28, department: 'HR', salary: 45000 },
    { id: 3, name: 'Bob Johnson', age: 35, department: 'Finance', salary: 60000 },
    //... More employee records can be added here
  ];
  function displayEmployees(){
    // Function to display all employees
 const totalEmployees = employees.map((employee, index) => `<p>${employee.id}: ${employee.name} - ${employee.department} - $${employee.salary}</p>`).join('');
 document.getElementById('employeesDetails').innerHTML = totalEmployees;
  }
  function calculateTotalSalaries(){
    const TotalSalaries = employees.reduce((acc,employee)=>acc+employee.salary,0);
    alert(`Total Salaries: $${TotalSalaries}`);
  }

  function displayHREmployees(){
    const hremployess = employees.filter((employee)=>employee.department === 'HR');
    const hrEmployeesDisplay = hremployess.map((employee)=>`<p>${employee.id}: ${employee.name} - ${employee.department} - ${employee.salary}</p>`).join('');
    document.getElementById('employeesDetails').innerHTML = hrEmployeesDisplay;
  }

  function findEmployeeById(Emp_id){
    const employeebyid = employees.filter((employee)=>employee.id===Emp_id);
    const employeebyidDisplay = employeebyid.map((employee)=>`<p>${employee.id}: ${employee.name} - ${employee.department} - ${employee.salary}</p>`).join('');
    document.getElementById('employeesDetails').innerHTML = employeebyidDisplay;
  }