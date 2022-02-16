function welcome(user: string): string {
  return `Hello, ${user}!`;
}

(function () {
  console.log(welcome("world"));
})();
