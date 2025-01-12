export function useDateNoTimeFormatter<T extends string | Date>(date: T): string | null {
    const inputDate = new Date(date);

    if (isNaN(inputDate.getTime())) {
        console.error('Invalid date format');
        return null;
    }

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    } as const;

    return inputDate.toLocaleString('en-US', options);
}
