interface Item {
    [key: string]: string | number; // Adjust the types based on your data structure
}

export function useSorting(array: any[], propertyName: string, sortOrder: 'asc' | 'desc' = 'asc') {
    const sortedArray = ref<Item[]>([]);

    const multiplier = sortOrder === 'asc' ? 1 : -1;

    sortedArray.value = array.slice().sort((a, b) => {
        const aValue = a[propertyName];
        const bValue = b[propertyName];

        if (aValue < bValue) {
            return -1 * multiplier;
        } else if (aValue > bValue) {
            return 1 * multiplier;
        } else {
            return 0;
        }
    });

    return {
        sortedArray,
    };
}
