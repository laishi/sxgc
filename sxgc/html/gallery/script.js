const leftItems = document.querySelectorAll(".left .item");
const rightItems = document.querySelectorAll(".right .item");
const limit = leftItems.length;

const leftCoordinates = [
  { x: -10, z: -4 },
  { x: -20, z: -8 },
  { x: -30, z: -12 },
  { x: -40, z: -16 },
  { x: 10, z: -4 }
];

const rightCoordinates = [
  { x: 10, z: -4 },
  { x: 20, z: -8 },
  { x: 30, z: -12 },
  { x: 40, z: -16 },
  { x: -10, z: -4 }
];

const itemPos = (item,{x,z}) => item.style.transform = `translate3d(${x}rem,0,${z}rem)`;

function animateItems(item,coordinates) {
  const count = Number(item.dataset.counter);
  itemPos(item,coordinates[count-1]);
  item.dataset.counter = `${count === limit ? 1 : count + 1}`;
}

function activate() {
  setInterval(() => {
    for (let i = 0; i < limit; i++) {
      animateItems(leftItems[i],leftCoordinates);
      animateItems(rightItems[i],rightCoordinates);
    }
  },2000);
};

window.addEventListener('load',activate,false);