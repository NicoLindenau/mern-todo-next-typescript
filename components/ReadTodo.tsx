import type { LoadingContextInterface, RefreshTodosContextInterface, Todo } from "../types"
import { useContext, useEffect, useState, Fragment } from "react"
import { LoadingContext, RefreshTodosContext } from "../pages"
import UpdateTodo from "./UpdateTodo"
import DeleteTodo from "./DeleteTodo"

const ReadTodo = () => {
  const { setLoading } = useContext(LoadingContext) as LoadingContextInterface
  const { refreshTodos, setRefreshTodos } = useContext(
    RefreshTodosContext
  ) as RefreshTodosContextInterface
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos")
        const fetchedData = await response.json()
        setTodos(fetchedData)
        setLoading(false)
        setRefreshTodos(false)
      } catch (error) {
        console.error(error)
      }
    }
    if (refreshTodos) {
      fetchTodos()
    }
  }, [refreshTodos, setLoading, setRefreshTodos])

  const todosDone = todos.filter((todo) => {
    return todo.isDone === true
  })

  const isDone = async (todoId: string, task: string, isDone: boolean) => {
    try {
      setLoading(true)
      await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        body: JSON.stringify({ task, isDone: !isDone }),
        headers: { "Content-Type": "application/json" }
      })
      setRefreshTodos(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-rose-200 dark:bg-gray-800 dark:text-gray-400 transition duration-500">
      <div className="md:w-8/12 xl:w-6/12 2xl:w-5/12 mx-auto px-5 md:text-2xl">
        <div className="grid grid-cols-6 justify-items-start gap-y-5 ">
          <div className="col-start-1 col-end-5">To Do</div>
          <div className="col-start-5 col-end-6 justify-self-center">Edit</div>
          <div className="col-start-6 col-end-7 justify-self-center">Delete</div>
          {todos.length === 0 && (
            <h3 className="col-start-1 col-end-7 justify-self-center">no todos yet</h3>
          )}
          {todos.map((todo) => {
            return (
              <Fragment key={todo._id}>
                <button
                  onClick={() => isDone(todo._id, todo.task, todo.isDone)}
                  className={`${
                    todo.isDone ? "line-through" : ""
                  } hover:line-through col-start-1 col-end-5 break-all`}>
                  •{todo.task}
                </button>
                <UpdateTodo todo={todo} />
                <DeleteTodo todoId={todo._id} />
              </Fragment>
            )
          })}
        </div>
        {todos.length > 0 && (
          <h1 className="w-11/12 text-xl md:text-2xl text-center p-5">
            Completed {todosDone.length} out of {todos.length}{" "}
            {todos.length === 1 ? "todo" : "todos"}.{" "}
            {todosDone.length === todos.length && todos.length > 0 && "Good job!"}
          </h1>
        )}
      </div>
    </div>
  )
}

export default ReadTodo
