import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useEmployeeMutation } from '../../../redux/adminapislice';
import Loader from '../../loader';
const Employee = () => {
  const { id } = useParams();
  const [employeedata, {isLoading}] = useEmployeeMutation();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    try {
      employeedata(id).unwrap().then((data) => {
        setEmployee(data)
      })
    } catch (error) {
      console.log("Error => ", error)
    }
  }, [])



  return (
    <div>
      {isLoading && (
        <Loader/>
      )
      }
      <div>
        {employee.name}
        {isLoading ? "true" : "false"}
      </div>
    </div>
  )
}
export default Employee
