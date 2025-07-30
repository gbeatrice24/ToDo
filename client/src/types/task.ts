export interface Task {
  id: string
  name: string
  desc: string
  priority: string
  done: boolean
  date: Date
  editing: boolean
}