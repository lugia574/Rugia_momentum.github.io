const palyBtn = document.querySelector(".music-nav-icon i:nth-child(2)");
const PALYCLASS = "fa-play-circle";

const PAUSECLASS = "fa-pause-circle";

function hanblePalyBtn() {
  const palyBtnClass = palyBtn.classList;

  if (palyBtnClass.value.includes(PALYCLASS)) {
    palyBtn.classList.remove(PALYCLASS);
    palyBtn.classList.add(PAUSECLASS);
  } else {
    palyBtn.classList.remove(PAUSECLASS);
    palyBtn.classList.add(PALYCLASS);
  }
}

palyBtn.addEventListener("click", hanblePalyBtn);
