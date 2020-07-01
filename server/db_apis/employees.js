const oracledb = require("oracledb");
const database = require("../services/database.js");

const baseQuery = `select empno "empno",
    ename "ename",
    job "job",
    mgr "mgr",
    hiredate "hiredate",
    sal "sal",
    comm "comm",
    deptno "deptno",
    seq "seq"
  from dev_livr.emp`;

async function find(context) {
  let query = baseQuery;
  const binds = {};
  // !!Using bind variables with Oracle Database
  // is very important for security and performance reasons.

  if (context.id) {
    binds.employee_id = context.id;

    query += `\nwhere seq = :employee_id`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const createSql = `insert into employees (
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    job_id,
    salary,
    commission_pct,
    manager_id,
    department_id
  ) values (
    :first_name,
    :last_name,
    :email,
    :phone_number,
    :hire_date,
    :job_id,
    :salary,
    :commission_pct,
    :manager_id,
    :department_id
  ) returning employee_id
  into :employee_id`;

async function create(emp) {
  // to prevent direct modification
  const employee = Object.assign({}, emp);

  employee.employee_id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  const result = await database.simpleExecute(createSql, employee);
  //createSql = statement,  employee = binds
  employee.employee_id = result.outBinds.employee_id[0];

  return employee;
}

module.exports.create = create;

const updateSql = `update employees
  set first_name = :first_name,
    last_name = :last_name,
    email = :email,
    phone_number = :phone_number,
    hire_date = :hire_date,
    job_id = :job_id,
    salary = :salary,
    commission_pct = :commission_pct,
    manager_id = :manager_id,
    department_id = :department_id
  where employee_id = :employee_id`;

async function update(emp) {
  const employee = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, employee);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return employee;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql = `begin

    delete from job_history
    where employee_id = :employee_id;

    delete from employees
    where employee_id = :employee_id;

    :rowcount := sql%rowcount;

  end;`;

async function del(id) {
  const binds = {
    employee_id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER,
    },
  };
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;

async function getEmployee() {
  let conn;
  try {
    conn = await oracledb.getConnection();

    result = await conn.execute(`INSERT INTO notice VALUES ('1', '2')`);

    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports.getEmployee = getEmployee;
