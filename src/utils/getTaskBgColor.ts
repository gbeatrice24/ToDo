export function getBgColor(priority: string): string {
    switch (priority) {
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



