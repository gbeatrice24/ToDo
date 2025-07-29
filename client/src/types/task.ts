export interface Task {
  id: number
  name: string
  desc: string
  priority: string
  done: boolean
  date: Date
  editing: boolean
}