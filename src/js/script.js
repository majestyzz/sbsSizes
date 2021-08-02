document.addEventListener('DOMContentLoaded', () => {
  // tabs
  const tabItems = document.querySelectorAll('.tab__item'),
    tabWrapper = document.querySelector('.tab__items'),
    tabContentAll = document.querySelectorAll('.tab__content');
  //  console.log({tabItems,tabWrapper,tabContentAll});
  function hideElements() {
    tabContentAll.forEach((i) => {
      i.classList.remove('add');
      i.classList.add('hide');
    });
    tabItems.forEach((i) => {
      i.classList.remove('tab_active');
    });
  }

  function showElements(i = 0) {
    tabItems[i].classList.add('tab_active');
    tabContentAll[i].classList.add('show');
    tabContentAll[i].classList.remove('hide');
  }

  function clickElem() {
    tabWrapper.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.matches('.tab__item')) {
        tabItems.forEach((i, index) => {
          if (i == target) {
            hideElements();
            showElements(index);
          }
        });
      }
    });
  }
  hideElements();
  showElements();
  clickElem();

  // take data
  const widthRoomInput = document.querySelector('.calc-size [name="width"]'),
    longRoomInput = document.querySelector('.calc-size [name="long"]'),
    heightRoomInput = document.querySelector('.calc-size [name="height"]'),
    radioAll = document.querySelectorAll('[name="tile"]'),
    widthWindowInput = document.querySelector('.calc-size [name="window-width"]'),
    longWindowInput = document.querySelector('.calc-size [name="window-long"]'),
    widthDoorInput = document.querySelector('.calc-size [name="door-width"]'),
    longDoorInput = document.querySelector('.calc-size [name="door-long"]'),
    buttonSub = document.querySelector('.calc-size__button'),
    modalTitle = document.querySelectorAll('.modal__title span'),
    modalVisible = document.querySelector('.modal');


  let sizesDB = {
    widthRoom: 0,
    longRoom: 0,
    heightRoom: 0,
    widthWindow: 0,
    longWindow: 0,
    heightWindow: 0,
    widthDoor: 0,
    longDoor: 0,
    heightDoor: 0,
    result: 0,
    typeClay: ['ПК-9, CM-9(не гранит) КПФ А-3 Интерьерный ответ',
      'ПК-10 CM-11 Интерьерный ответ', 'ПК-11 CM-12 КПФ-А3'
    ],
  };
  
  function modalClose() {
    document.querySelector('.modal__close').addEventListener('click', () => {
      modalVisible.classList.add('hide');
      modalVisible.classList.remove('show');
    });
    
  }

  function modalOpen() {
    modalVisible.classList.add('show');
    modalVisible.classList.remove('hide');
  }

  function catchData(sizeName, input) {
    input.value.split(' ').map((item) => {
      if (item.includes(',')) {
        return +(parseInt(i) + item.slice(item.indexOf(',') + 1));
      }
      return +item;
    }).forEach((i) => {
      return sizesDB[sizeName] += i;
    });
    input.value = '';
  }
  function clearValues() {
    for (let key in sizesDB) {
      if (key === 'typeClay') {
        continue;
      }
      sizesDB[key] = 0;
    }
  }
  function calcResult() {
    buttonSub.addEventListener('click', (event) => {
      event.preventDefault();
      catchData('widthRoom', widthRoomInput);
      catchData('longRoom', longRoomInput);
      catchData('heightRoom', heightRoomInput);
      catchData('widthWindow', widthWindowInput);
      catchData('longWindow', longWindowInput);
      catchData('widthDoor', widthDoorInput);
      catchData('longDoor', longDoorInput);
      sizesDB.result = (((sizesDB.widthRoom + sizesDB.longRoom) * 2) * sizesDB.heightRoom) - ((sizesDB.longWindow *
      sizesDB.heightWindow) + (sizesDB.widthDoor * sizesDB.longDoor));
      modalTitle[0].innerHTML = `${sizesDB.result}`;
      modalTitle[1].innerHTML = ` ${Math.ceil(sizesDB.result / 5)}`;
      modalTitle[2].innerHTML = ` ${Math.ceil(sizesDB.result / 5)}`;
      
      radioAll.forEach((item, index) => {
        if (item.checked) {
          modalTitle[3].innerHTML = ` ${sizesDB.typeClay[index]}`;
        }
      });
      modalOpen();
      clearValues();
    });
  }
  calcResult();
  modalClose()
  console.log(radioAll[1]);
});