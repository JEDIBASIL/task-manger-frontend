const dateConverter = (date: Date | undefined): string => {
    if (date === undefined) date = new Date();
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    date = new Date(date)
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    return `${day} ${months[month]}, ${year}`;
}

export { dateConverter }