import { makeAutoObservable, toJS } from 'mobx'
import { api } from '../../core/api'
import { ListEmployeesPaginationDto } from './api/list-employees-pagination.dto'
import { FetchStatus } from '../../components/types'

interface FetchlistOfEmployeesParams {
  page?: number | null
}

interface UpdateEmployeeByIDData {
  firstName: string
  lastName: string
  photo: string
  birthDate: Date
}

class EmployeeStore {
  listFetchStatus: FetchStatus = 'NOT_STARTED'
  deleteEmployeeStatus: FetchStatus = 'NOT_STARTED'
  listEmployees: ListEmployeesPaginationDto['results'] = []

  constructor() {
    makeAutoObservable(this)
  }

  async fetchListOfEmployees({ page = 1 }: FetchlistOfEmployeesParams = {}) {
    this.listFetchStatus = 'LOADING'

    try {
      const { data } = await api.get<ListEmployeesPaginationDto>('/api', {
        params: {
          page,
          results: 12,
          seed: 'hr',
        },
      })
      const updatedEmployees = this.getUpdatedEmployees()
      const deletedEmployees = this.getDeletedEmployees()

      this.listEmployees = data.results
        .filter((employee) => {
          const deletedEmployee = deletedEmployees.find(
            (empl) => empl === employee.login.uuid
          )

          return !deletedEmployee
        })
        .map((emp) => {
          const updatedEmployee = updatedEmployees.find(
            (empl) => empl.login.uuid === emp.login.uuid
          )

          this.listFetchStatus = 'SUCCESS'

          return updatedEmployee || emp
        })
    } catch (error) {
      console.log(error)
      this.listFetchStatus = 'FAILED'
    }
  }

  findEmployeeById(id: string) {
    return this.listEmployees.find((employee) => employee.login.uuid === id)
  }

  getUpdatedEmployees(): ListEmployeesPaginationDto['results'] {
    return JSON.parse(localStorage.getItem('updatedEmployees') || '[]')
  }

  async updateEmployeeByID(id: string, data: UpdateEmployeeByIDData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const employee = toJS(this.findEmployeeById(id))

        if (!employee) {
          throw new Error('No employee!')
        }
        employee.name.first = data.firstName
        employee.name.last = data.lastName
        employee.dob.date = data.birthDate.toISOString()
        employee.picture.large = data.photo

        const updatedEmployees = this.getUpdatedEmployees()

        const existingUpdatedEmployee = updatedEmployees.findIndex(
          (emp) => emp.login.uuid === id
        )

        if (existingUpdatedEmployee !== -1) {
          updatedEmployees[existingUpdatedEmployee] = employee
        } else {
          updatedEmployees.push(employee)
        }

        this.listEmployees = []
        this.listFetchStatus = 'NOT_STARTED'
        localStorage.setItem(
          'updatedEmployees',
          JSON.stringify(updatedEmployees)
        )

        resolve(true)
      }, 500)
    })
  }

  getDeletedEmployees(): string[] {
    return JSON.parse(localStorage.getItem('deletedEmployees') || '[]')
  }

  async deleteEmployeeById(id: string) {
    this.deleteEmployeeStatus = 'LOADING'
    return new Promise((resolve) => {
      setTimeout(() => {
        const deletedEmployees = this.getDeletedEmployees()
        deletedEmployees.push(id)

        this.listEmployees = []
        this.listFetchStatus = 'NOT_STARTED'

        localStorage.setItem(
          'deletedEmployees',
          JSON.stringify(deletedEmployees)
        )
        resolve(true)
        this.deleteEmployeeStatus = 'NOT_STARTED'
      }, 500)
    })
  }
}

const empoyeeStoreInstance = new EmployeeStore()

export const useEmployeeStore = () => {
  return empoyeeStoreInstance
}
