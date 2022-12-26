export const nullIfDefault = (value: string) => {
    return value != "No data" ? value : null
}