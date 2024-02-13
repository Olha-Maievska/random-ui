import { FC } from 'react'
import { useEmployeeStore } from '../store'
import { useParams } from 'react-router-dom'
import { DateTime } from 'luxon'
import { Alert } from 'flowbite-react'

interface EmployeeInfoProps {}

const EmployeeInfo: FC<EmployeeInfoProps> = () => {
  const employeeStore = useEmployeeStore()
  const params = useParams()
  const employee = employeeStore.findEmployeeById(params.id || '')

  if (!employee)
    return (
      <Alert color="failure">
        <span className="font-medium">Error!</span> Something bad happened,
        plese try again later
      </Alert>
    )
  return (
    <div className="my-8">
      <h5 className="text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
        {employee?.name.first} {employee?.name.last}
      </h5>
      <img className="mx-auto mt-8" src={employee?.picture.large} />
      <p className="text-2xl text-center mt-8">
        Date of birth:{' '}
        {DateTime.fromISO(
          employee?.dob.date || new Date().toISOString()
        ).toLocaleString(DateTime.DATE_FULL)}
      </p>
    </div>
  )
}

export default EmployeeInfo
