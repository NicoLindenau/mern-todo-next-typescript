import { Dispatch, SetStateAction } from "react"

export interface Todo {
  _id: string
  task: string
  isDone: boolean
}

export interface LoadingContextInterface {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

export interface RefreshTodosContextInterface {
  refreshTodos: boolean
  setRefreshTodos: Dispatch<SetStateAction<boolean>>
}
