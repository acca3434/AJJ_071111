class JangMainSlide {
    constructor(classNameValue) {
        this.imgCount = 1;
        this.slideSecond = 5;
        this.slideWidth = 100 - 0.6;
        this.slideHeight = 97.6;
        this.slideContainerTag = document.querySelector(`.${classNameValue}-slide-container`);
        this.slideWrapTag = document.querySelector(`.${classNameValue}-slide-wrap`);
        this.imgTags = document.querySelectorAll(`[class ^= "${classNameValue}-img"]`);
        this.prevBtn = document.querySelector(`.${classNameValue}-prev-btn`);
        this.nextBtn = document.querySelector(`.${classNameValue}-next-btn`);
        this.timerTag = document.querySelector(`.${classNameValue}-timer`);
        this.index = 1;
        this.startX = null;
        this.endX = null;
        this.isMoving = false;
        this.autoPlayFn = "first";
        this.stoppingSetTimeOut = null
        this.imgWidth = -this.slideWidth;
        this.resizeControl = null;
        this.dragSetTimeOut = null;
        this.isDragDone = true;
        this.init(classNameValue);
    }
    init(classNameValue) {
        let _this = this;
        // ㅜ , 블럭, 드래그 방지하기
        // window.document.oncontextmenu = new Function("return false");
        // window.document.onselectstart = new Function("return false");
        // window.document.ondragstart = new Function("return false");
        // ㅜ 이미지 태그 번호 넣기
        _this.imgTags.forEach((el, idx, arr) => {
            el.children[0].innerHTML += `${idx + 1} / ${arr.length}`;
        })

        // ㅜ 첫 번째와 마지막 슬라이드 페이지에 한 번에 보여줄 이미지 개수만큼 복사해놓기
        for (let i = 1; i <= _this.imgCount; i++) {
            window[`copyTag${i}`] = _this.imgTags[i - 1].cloneNode(true);
            window[`copyTag${i + _this.imgCount}`] = _this.imgTags[_this.imgTags.length - _this.imgCount - 1 + i].cloneNode(true);
            _this.slideWrapTag.insertBefore(window[`copyTag${i + _this.imgCount}`], _this.imgTags[0]);
            _this.slideWrapTag.appendChild(window[`copyTag${i}`]);
        }
        _this.imgTags = document.querySelectorAll(`[class ^= "${classNameValue}-img"]`);

        // ㅜ 슬라이드의 width, height, margin 설정하기
        _this.slideContainerTag.style.width = `${_this.slideWidth}vw`;
        _this.slideContainerTag.style.height = `${_this.slideHeight}vh`;
        _this.imgTags.forEach((el) => {
            const margin = 0;
            el.style.margin = `${margin}vw`;
            el.style.width = `${_this.slideWidth / _this.imgCount - (margin * 2)}vw`;
            el.style.height = `${_this.slideHeight / _this.imgCount - (margin * 2)}vh`;
        })

        // ㅜ 첫 화면에 첫 번째의 이미지 태그가 보이게끔 left 조정하기
        _this.slideWrapTag.style.left = `-${_this.slideWidth}vw`;
        _this.autoPlay();

        // ㅜ 다음 버튼을 클릭했을 때
        // ㅜ 맨 뒤에 복사해 둔 첫 번째 사진의 경우 원래 자리로 이동해야 하기 때문에 막아놓기
        _this.nextBtn.onclick = () => {
            let _this = this;
            if ((_this.index === _this.imgTags.length / _this.imgCount - 1)) return;
            _this.btnControl("next");
        }

        // ㅜ 이전 버튼을 클릭했을 때
        // ㅜ 맨 뒤에 복사해 둔 첫 번째 사진의 경우 원래 자리로 이동해야 하기 때문에 막아놓기
        _this.prevBtn.onclick = () => {
            let _this = this;
            if (_this.index === 0) return;
            _this.btnControl("prev");
        }

        // ㅜ 마우스 왼쪽 버튼을 클릭했을 때
        _this.slideContainerTag.onmousedown = (e) => {
            // ㅜ 맨 앞과 맨 뒤에 복사해 둔 사진의 위치일 때는 드래그 막아놓기
            if (_this.index >= (_this.imgTags.length / _this.imgCount - 1)) return;
            if (_this.index <= 0) return;
            if (_this.dragSetTimeOut !== null) return;
            if (e.button === 0) {
                _this.startX = _this.pxToVw(e.pageX);
                console.log("onmousedown");

                clearInterval(_this.autoPlayFn);
                console.log("autoPlayFn out");
                _this.autoPlayFn = null;

                clearTimeout(_this.stoppingSetTimeOut);
                console.log("stoppingSetTimeOut out");
                _this.stoppingSetTimeOut = null;
            }
        }

        // 마우스 왼쪽 버튼의 클릭을 놓았을 때
        _this.slideContainerTag.onmouseup = (e) => {
            if (_this.startX === null) return;
            if (e.button === 0) {
                console.log("onmouseup");
                _this.isDragDone = false;

                _this.endX = _this.pxToVw(e.pageX);
                setTimeout(() => {
                    _this.dragEvent();
                }, 10);
            }
        }

        // 드래그 중일 때
        _this.slideContainerTag.onmousemove = (e) => {
            if (_this.startX === null) return;
            if (_this.isDragDone === true) return;
            console.log("onmousemove");

            // 드래그의 정도에 따라 실시간으로 게이지 바와 슬라이드를 변화시키기 
            let posX = _this.startX - _this.pxToVw(e.pageX);
            _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth - posX}vw)`;

            if (posX < 0) posX = -posX;
            _this.gage(`${posX}%`, "");
        }

        // _this.slideContainerTag.onmouseleave = (e) => {
        //     if (_this.startX === null) return;
        //     if (_this.dragSetTimeOut !== null) return;
        //     console.log("mouseleave");

        //     _this.endX = _this.pxToVw(e.pageX);
        //     setTimeout(() => {
        //         _this.dragEvent();
        //     }, 10);
        // }

        // _this.slideContainerTag.onmouseenter = (e) => {
        //     e.stopPropagation();
        //     clearInterval(_this.autoPlayFn);
        //     _this.autoPlayFn = null;
        // }

        // _this.slideContainerTag.addEventListener('mouseleave', () => {
        //     _this.autoPlay();
        // })

        // 창의 크기가 변경될 때
        window.addEventListener("resize", () => {
            _this.gage("0%", "");
            _this.slideWrapTag.style.transition = "";

            clearTimeout(_this.resizeControl);
            console.log("resizeControl out");

            _this.resizeControl = setTimeout(() => {
                console.log("resizeControl in");

                clearInterval(_this.autoPlayFn);
                console.log("autoPlayFn out");
                _this.autoPlayFn = null;

                clearTimeout(_this.stoppingSetTimeOut);
                console.log("stoppingSetTimeOut out");
                _this.stoppingSetTimeOut = null;

                _this.autoPlayFn = "first";
                setTimeout(() => {
                    _this.autoPlay();
                }, 10);
            }, 500);
        })

        // window.addEventListener("resize", (e) => {
        //     _this.gage(0, 0);
        //     clearInterval(_this.autoPlayFn);
        //     _this.slideWrapTag.style.transition = "";
        //     _this.autoPlayFn = null;
        //    if (_this.resize === false) _this.resize = true;
        //    this.resizeIndex = window.innerHeight;
        //    console.log("_this.resizeIndex: "+_this.resizeIndex);
        //    console.log("this.resizeIndex: "+this.resizeIndex);
        // })

        // setInterval(() => {
        //     let time = this.resizeIndex;
        //     setTimeout(() => {
        //         if(this.resizeIndex === time){
        //             if(_this.resize === true)
        //             {
        //                  if(_this.index === 6)
        //                  {
        //                      _this.index = 1;
        //                      _this.slideWrapTag.style.transition = "0s";
        //                      _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth}vw)`;
        //                  }
        //                  _this.isMoving = false;
        //                  _this.autoPlay();
        //                  _this.resize = false;
        //             }
        //         }
        //     }, 1000);
        // }, 100);
    }
    autoPlay() {
        let _this = this;
        if (_this.autoPlayFn === "first") {
            _this.gage("100%", `${_this.slideSecond}s`);
            console.log(_this.timerTag.style.transition);
            _this.autoPlayFn = null;
            _this.autoPlay();
        }
        else if (_this.autoPlayFn === null) {
            _this.autoPlayFn = setInterval(() => {
                console.log("autoPlayFn in");
                _this.move("next");
            }, _this.slideSecond * 1000);
        }
    }
    move(str) {
        let _this = this;
        if (!_this.isMoving) {
            _this.isMoving = true;
            _this.slideWrapTag.style.transition = `${_this.slideSecond}s`;

            // ㅜ 다음 슬라이드로 이동하기
            if (str === "next") {
                _this.index++;
                _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth}vw)`;
                _this.gage("0%", `${_this.slideSecond}s`);

                // ㅜ 이동 후 슬라이드를 잠시 정지 상태로 두기
                if (_this.stoppingSetTimeOut === null) {
                    _this.stoppingSetTimeOut = setTimeout(() => {

                        // ㅜ autoPlay()가 짝수 번째마다 실행되도록 텀 두기
                        _this.stoppingSetTimeOut = setTimeout(() => {
                            _this.isMoving = false;
                            _this.stoppingSetTimeOut = null;
                            _this.gage("100%", `${_this.slideSecond}s`);

                            // ㅜ 맨 뒤에 복사해 둔 첫 번째 사진의 위치로 올 경우 원래 자리로 이동하기
                            if ((_this.imgTags.length / _this.imgCount - 1) <= _this.index) {
                                _this.index = 1;
                                _this.slideWrapTag.style.transition = "";
                                _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth}vw)`;
                            }
                        }, 10);
                    }, _this.slideSecond * 1000);
                }
            }

            // ㅜ 이전 슬라이드로 이동하기
            else if (str === "prev") {
                _this.index--;
                _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth}vw)`;
                _this.gage("0%", `${_this.slideSecond}s`);

                // ㅜ 이동 후 슬라이드를 잠시 정지 상태로 두기
                if (_this.stoppingSetTimeOut === null) {
                    _this.stoppingSetTimeOut = setTimeout(() => {

                        // ㅜ autoPlay()가 먼저 실행되기 때문에 같은 시간이면 짝수 번째마다 실행된다.
                        _this.isMoving = false;
                        _this.stoppingSetTimeOut = null;
                        _this.gage("100%", `${_this.slideSecond}s`);

                        // ㅜ 맨 앞에 복사해 둔 마지막 사진의 위치로 올 경우 원래 자리로 이동하기
                        if (0 >= _this.index) {
                            _this.index = (_this.imgTags.length / _this.imgCount) - 2;
                            _this.slideWrapTag.style.transition = "0s";
                            _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth}vw)`;
                        }
                    }, _this.slideSecond * 1000);
                }
            }
        }
    }
    btnControl(str) {
        let _this = this;

        clearInterval(_this.autoPlayFn);
        console.log("autoPlayFn out");
        _this.autoPlayFn = null;

        clearTimeout(_this.stoppingSetTimeOut);
        console.log("stoppingSetTimeOut out");
        _this.stoppingSetTimeOut = null;

        // ㅜ 게이지 바는 버튼을 클릭하자마자 100%로 채워놓기
        _this.gage("100%", "");

        // ㅜ move() 안에 있는 게이지 바의 0% 트랜지션과 겹치지 않게 텀 두기
        setTimeout(() => {
            _this.isMoving = false;
            _this.move(str);

            // ㅜ move() 안에 있는 게이지 바의 100% 트랜지션이 종료됨과 동시에 setInterval의 첫 실행이 이뤄지게 하기
            setTimeout(() => {
                _this.autoPlay();
            }, _this.slideSecond * 1000);
        }, 10);
    }
    dragEvent() {
        let _this = this;
        const posX = _this.startX - _this.endX;
        console.log(posX);

        // ㅜ 드래그 방향 및 정도에 따라 해당 슬라이드로 이동하기
        if (posX > 20 || posX < -20) {
            _this.isMoving = false;
            if (posX > 20) _this.move("next");
            else if (posX < -20) _this.move("prev");

            // ㅜ move() 안에 있는 게이지 바의 100% 트랜지션이 종료됨과 동시에 setInterval의 첫 실행이 이뤄지게 하기
            _this.dragSetTimeOut = setTimeout(() => {
                _this.startX = null;
                _this.endX = null;
                _this.dragSetTimeOut = null;
    
                _this.autoPlay();
            }, _this.slideSecond * 1000);
        }

        // 슬라이드 이동이 없을 경우
        else {
            _this.gage("100%", `${_this.slideSecond}s`);
            _this.slideWrapTag.style.transform = `translateX(${(_this.index - 1) * _this.imgWidth}vw)`;
            _this.dragSetTimeOut = setTimeout(() => {
                _this.move("next");

                // ㅜ move() 안에 있는 게이지 바의 100% 트랜지션이 종료됨과 동시에 setInterval의 첫 실행이 이뤄지게 하기
                setTimeout(() => {
                    _this.startX = null;
                    _this.endX = null;
                    _this.dragSetTimeOut = null;
        
                    _this.autoPlay();
                }, _this.slideSecond * 1000);
            }, _this.slideSecond * 1000);

        }

    }
    gage(value, second) {
        let _this = this;
        _this.timerTag.style.width = value;
        _this.timerTag.style.transition = second;
    }
    pxToVw(value) {
        const bodyWidth = document.body.offsetWidth;
        return (value / bodyWidth * 100);
    }
}

// 07 11 11 최종 수정