import type { LoadingContextInterface, RefreshTodosContextInterface } from "../types"
import { useContext } from "react"
import { AiFillDelete } from "react-icons/ai"
import { LoadingContext, RefreshTodosContext } from "../pages"

const DeleteTodo = ({ todoId }: { todoId: string }) => {
  const { setLoading } = useContext(LoadingContext) as LoadingContextInterface
  const { setRefreshTodos } = useContext(RefreshTodosContext) as RefreshTodosContextInterface

  const deleteTodo = async () => {
    try {
      setLoading(true)
      await fetch(`/api/todos/${todoId}`, {
        method: "DELETE"
      })
      setRefreshTodos(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      className="dark:text-rose-200 transition text-gray-400 hover:text-red-400 hover:scale-150 duration-500 col-start-6 col-end-7 justify-self-center"
      onClick={deleteTodo}>
      <AiFillDelete />
    </button>
  )
}

export default DeleteTodo
