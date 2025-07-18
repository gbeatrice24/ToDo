import { Task } from '@/types/Task';
import { computed } from 'vue';

export function getTaskBgColor(task: Task): string {
    switch (task.priority) {
        case 'High':
            return 'bg-red-500'
        case 'Medium':
            return 'bg-amber-500'
        case 'Low':
            return 'bg-teal-400'
        default:
            return 'bg-gray-500'
    }
}



