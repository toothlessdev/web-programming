document.querySelector('#btn').addEventListener('click', () => {
  let nickname = document.querySelector('#nickname').value;
  console.log(nickname);
  document.querySelector('#text').innerHTML = nickname;
});
