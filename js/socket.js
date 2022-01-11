export const user = `u${Math.round(Math.random()*100000)}`;
export const socket = new WebSocket(`ws://ordercanban:1234/?user=${user}`);