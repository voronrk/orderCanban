export function dateForSave(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`
}

export function dataForSendToSocket(user, date) {
    return JSON.stringify({'user': user, 'date': date});
};

