const projectHistory = document.getElementById('0');
const contribute = document.getElementById('1');
const statistics = document.getElementById('2');

contribute.addEventListener('click', () => {
  nav = 1;
  console.log('bbb');
})

statistics.addEventListener('click', () => {
  nav = 2;
  console.log('cc');
})

projectHistory.addEventListener('click', () => {
  nav = 0;
  console.log('aaa');
})
