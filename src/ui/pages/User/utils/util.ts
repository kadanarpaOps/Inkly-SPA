
export const getRandomString = (list: string[]): string => {
    const randomPosition = Math.floor(Math.random() * list.length);
    return list[randomPosition];
}
