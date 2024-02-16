import { observer } from 'mobx-react'
import { FC, useEffect } from 'react'
import { useEmployeeStore } from '../store'
import { Alert, Pagination, Spinner } from 'flowbite-react'
import EmployeeCard from '../components/employee-card.components'
import { useSearchParams } from 'react-router-dom'

interface ListEmployeesProps {}

const ListEmployees: FC<ListEmployeesProps> = observer(() => {
  const employeeStore = useEmployeeStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page')

  useEffect(() => {
    if (employeeStore.listFetchStatus === 'NOT_STARTED') {
      employeeStore.fetchListOfEmployees({ page: page ? Number(page) : null })
    }
  }, [])

  const onPageChange = (page: number) => {
    setSearchParams({ page: String(page) })
    employeeStore.fetchListOfEmployees({ page })
  }

  if (employeeStore.listFetchStatus === 'LOADING') {
    return (
      <div className="flex justify-center mt-12">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    )
  }

  if (employeeStore.listFetchStatus === 'FAILED') {
    return (
      <Alert color="failure">
        <span className="font-medium">Error!</span> Something bad happened,
        plese try again later
      </Alert>
    )
  }

  return (
    <div className="px-8 my-8">
      <div className="flex justify-center flex-wrap gap-4">
        {employeeStore.listEmployees.map((employee) => {
          return (
            <EmployeeCard
              key={`employee=${employee.login.uuid}`}
              name={`${employee.name.first} ${employee.name.last}`}
              dob={new Date(employee.dob.date)}
              photo={employee.picture.large}
              uuid={employee.login.uuid}
            />
          )
        })}
      </div>
      <div className="flex overflow-x-auto sm:justify-center mt-5">
        <Pagination
          currentPage={page ? Number(page) : 1}
          totalPages={10}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
})

export default ListEmployees
