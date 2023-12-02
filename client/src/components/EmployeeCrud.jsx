import axios from "axios";
import { useEffect, useState } from "react";

function EmployeeCrud() {
	const [_id, setId] = useState("");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setMobile] = useState("");
	const [employees, setUsers] = useState([]);

	useEffect(() => {
		(async () => await Load())();
	}, []);

	async function Load() {
		const result = await axios.get("http://localhost:8000/user/getAll");
		setUsers(result.data.data);
		// console.log(result.data);
	}

	async function save(event) {
		event.preventDefault();
		try {
			await axios.post("http://localhost:8000/user/create", {
				name: name,
				address: address,
				phone: phone,
			});
			alert("Employee Registration Successfully");
			setId("");
			setName("");
			setAddress("");
			setMobile("");
			Load();
		} catch (err) {
			alert("User Registration Failed");
		}
	}
	async function editEmployee(employees) {
		setName(employees.name);
		setAddress(employees.address);
		setMobile(employees.phone);

		setId(employees._id);
	}

	async function DeleteEmployee(_id) {
		await axios.delete("http://localhost:8000/user/delete/" + _id);
		alert("Employee deleted Successfully");
		Load();
	}

	async function update(event) {
		event.preventDefault();
		try {
			await axios.patch(
				"http://localhost:8000/user/update/" +
					employees.find((u) => u._id === _id)._id || _id,
				{
					_id: _id,
					name: name,
					address: address,
					phone: phone,
				},
			);
			alert("Registration Updateddddd");
			setId("");
			setName("");
			setAddress("");
			setMobile("");
			Load();
		} catch (err) {
			alert(err);
		}
	}

	return (
		<div className='container d-flex justify-content-center align-items-center vh-100'>
			<div className='container '>
				<form>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='_id'
							hidden
							value={_id}
							onChange={(event) => {
								setId(event.target.value);
							}}
						/>
						<label>Employee Name</label>
						<input
							type='text'
							className='form-control'
							id='name'
							value={name}
							onChange={(event) => {
								setName(event.target.value);
							}}
						/>
					</div>
					<div className='form-group'>
						<label>Employee Address</label>
						<input
							type='text'
							className='form-control'
							id='address'
							value={address}
							onChange={(event) => {
								setAddress(event.target.value);
							}}
						/>
					</div>

					<div className='form-group'>
						<label>Mobile</label>
						<input
							type='text'
							className='form-control'
							id='phone'
							value={phone}
							onChange={(event) => {
								setMobile(event.target.value);
							}}
						/>
					</div>

					<div className=' btn-group'>
						<button className='btn btn-primary mt-4 ' onClick={save}>
							Add Employee
						</button>
						<button className='btn btn-warning mt-4' onClick={update}>
							Update
						</button>
					</div>
				</form>
			</div>

			<table
				className='table table-secondary table-hover table-bordered'
				align='center'
			>
				<thead>
					<tr className='table-success'>
						<th scope='col'>Employee Id</th>
						<th scope='col'>Employee Name</th>
						<th scope='col'>Employee Address</th>
						<th scope='col'>Employee Mobile</th>
						<th scope='col'>Options</th>
					</tr>
				</thead>
				<tbody>
					{employees.map((employee) => (
						<tr key={employee._id}>
							<th scope='row'>{employee._id}</th>
							<td>{employee.name}</td>
							<td>{employee.address}</td>
							<td>{employee.phone}</td>
							<td>
								<div className='d-flex btn-group'>
									<button
										type='button'
										className='btn btn-warning'
										onClick={() => editEmployee(employee)}
									>
										Edit
									</button>
									<button
										className='btn btn-danger'
										onClick={() => DeleteEmployee(employee._id)}
									>
										Delete
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default EmployeeCrud;
