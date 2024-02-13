import { makeAutoObservable } from 'mobx'
import { api } from '../../core/api'
import { ListEmployeesPaginationDto } from './api/list-employees-pagination.dto'

type FetchStatus = 'NOT_STARTED' | 'LOADING' | 'SUCCESS' | 'FAILED'

interface FetchlistOfEmployeesParams {
  page?: number | null
}

class EmployeeStore {
  listFetchStatus: FetchStatus = 'NOT_STARTED'
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
      this.listFetchStatus = 'SUCCESS'
      this.listEmployees = [...data.results]
    } catch (error) {
      console.log(error)
      this.listFetchStatus = 'FAILED'
    }
  }
}

const empoyeeStoreInstance = new EmployeeStore()

export const useEmployeeStore = () => {
  return empoyeeStoreInstance
}
