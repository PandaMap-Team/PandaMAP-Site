// Анимация title
const base = "andaMAP";
let i = 0;
function typeTitle() {
  if (i <= base.length) {
    document.title = "P" + base.slice(0, i);
    i++;
  } else {
    i = 0;
  }
  setTimeout(typeTitle, 500);
}
typeTitle();