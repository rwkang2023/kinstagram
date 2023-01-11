// 2021.04.25 Conclusion.
// 0. 첫번째 화면에는 "왼쪽 메인 메뉴"를 보여 준다.
// 1. 기간 "From"은, "script_login.js"에서, "오늘 날짜"로 "sessionStorage"에 저장하여 찍어주고,
// 2. 그 다음에는 사용자가 직접 수정한 날짜로, "메뉴"별로 저장하여, 해당 메뉴를 선택하면, 자동으로 찍어주게 한다.

// languageNo === 1033 === 'en-us'
// languageNo === 1042 === 'ko-kr'
// languageNo === 2052 === 'zh-cn'

/*!
    * Start Bootstrap - SB Admin v6.0.2 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */

// 여기 저기 jQuery를 이용한 사이트의 코딩을 보면, $(function(){}); 이라고도 많이 사용하는데
// $(document).ready(function(){});와 동일한 의미입니다.
// $(document).ready(function(){}); 이것이 jQuery를 사용하기 위한 기본 문법입니다.
// 정확히는 DOM(Document Object Model) 객체가 생성되어 준비되는 시점에서 호출된다는 의미입니다.
// JS와 비교하자면 document.onload()... 와 거의 비슷하다고 생각하면 되고, html 문서가 로딩이 되면...이라는 느낌으로 이해하시면 됩니다.
// Conclusion. 내 생각 : 그러니까 이 구문 앞에 코딩을 한다는 것은, html 문서가 아직 로딩도 안 되어 있을 때도 실행할 수 있다는 것이므로,
//                      왠간하면 이 구문 다음에 코딩을 시작해야 된다... 뭐 이런 것 같네...

(function ($) {
    // 2021.04.25 Conclusion. 아래 함수 "$(document).ready(function () {}" 전까지는,
    // "scripts_login.js"에서 실행한 후, 서버로 가기 전에 실행되는 것이다.

    // 암묵적인 "느슨한 모드(sloppy mode)"를 해제하고,
    // 명시적인 "엄격 모드(Strict Mode)"를 사용하는 방법이다.
    "use strict";

    // 2023.01.06 Added. 신규 피드 등록을 위한, 모달 창 띄우기... body 마우스 스크롤 없애기...
    // 1. jquery 용법...
    // $('#add_feed').click(function () {
    //     $('.modal_overlay').css({
    //         display: 'flex',
    //         overflow: 'hidden'
    //     })
    //     alert("add_box 버튼이 클릭되었습니다.")
    // })

    // 전역 변수 선언 : 펑션 외부에 선언해야 한다.
    // let filesName;


    // 2023.01.06 Added. 신규 피드 등록을 위한, 모달 창 띄우기... body 마우스 스크롤 없애기...
    // 2. javascript 용법...
    const modal_add_feed = document.getElementById("modal_add_feed");
    const modal_add_feed_content = document.getElementById("modal_add_feed_content");
    const button_add_feed = document.getElementById("add_feed");
    button_add_feed.addEventListener("click", e => {
        // alert("add_box 버튼이 클릭되었습니다.")
        // modal_add_feed.style.top = window.pageYOffset + 'px'; // top을 이용해 시작 y 위치를 바꿔 줌.
        modal_add_feed.style.display = "flex";
        document.body.style.overflow = "hidden";
    });

    // 2023.01.06 Added. 모달 첫번째/두번째 모두 닫기...
    const button_close_modal = document.getElementById("close_modal");
    button_close_modal.addEventListener("click", e => {
        // alert("첫번째 모달 창 닫기 버튼이 클릭되었습니다.")
        modal_add_feed.style.display = "none";
        document.body.style.overflow = "visible";
    })
    const button_close_model_content = document.getElementById("close_modal_content");
    button_close_model_content.addEventListener("click", e => {
        // alert("두번째 모달 창 닫기 버튼이 클릭되었습니다.")
        modal_add_feed_content.style.display = "none";
        document.body.style.overflow = "visible";
    })

    // 2023.01.06 Added. 모달 창에 이미지 드래그 앤 드롭으로 처리 하기...
    // 1. 드래그 앤 드롭 javascript 처리...
    // https://inpa.tistory.com/entry/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-Drag-Drop-%EA%B8%B0%EB%8A%A5#top
    // const $drop = document.querySelector(".dropBox");
    // const $title = document.querySelector(".dropBox h1");
    let files; // 아래 "button_write_feed" 버튼 "클릭 이벤트"에서 사용하기 위해, "ondrop" 펑션 외부에서 "전역 변수"로 선언...
    const $drop = document.getElementById("modal_image_drop");
    // alert(`${getLineNumber()}, $drop: ${$drop}`)
    // alert(`${getLineNumber()}, $title: ${$title}`)
    // 드래그한 파일 객체가 해당 영역에 놓였을 때...
    $drop.ondrop = (e) => {
        e.stopPropagation(); // 화면 상에서 여러개 겹쳐 있을 때, 맨 상위 화면(모달 창)만 가리키게 한다.그 밑에 화면으로 전파가 안 된다.
        e.preventDefault();

        $drop.className = "modal_image_upload";

        // 파일 리스트
        // const files = [...e.dataTransfer?.files];
        files = [...e.dataTransfer?.files];
        // $title.innerHTML = files.map(v => v.name).join("<br");

        // alert(`${getLineNumber()}, files: ${files}`);
        // alert(`${getLineNumber()}, files[0]: ${files[0]}`);
        // alert(`${getLineNumber()}, files[0].name: ${files[0].name}`);

        /* 이건 이상하게도, 아래 jquery 에서는 잘 되었는데, 여기서는 안 되네... 위의 filsList = [...e.dataTransfer?.files]를 사용.
        e.dataTransfer = e.originalEvent.dataTransfer; // 여기 2개 라인이 실제로 "이미지"를 가져 오는 것이다.
        let files = e.dataTransfer.files;
        // alert(`getLineNumber(): ${getLineNumber()}`);
        */

        if (files.length > 1) {
            alert(`${getLineNumber()}, 하나만 올릴 수 있습니다.!!!`);
            return;
        } else {
            // alert('1개 파일이네요!!!');
            // return;
        }

        if (files[0].type.match(/image.*/)) {
            $('#modal_add_feed_content').css({
                "display": "flex",
            });
            $('.modal_image_upload_content').css({
                "background-image": "url(" + window.URL.createObjectURL(files[0]) + ")",
                "outline": "none",
                "background-size": "contain",
                "background-rep0eat": "no-repeat",
                "background-position": "center",
                // "display": "flex",
            });
            $('#modal_add_feed').css({
                "display": "none"
            });

            // 2023.01.07 Conclusion. 여기서 "$(e.target)"가 곧 "이미지 업로드"를 받는,
            //      모달 창인데, 이것이 2개이므로, "class" 이름으로 "img_upload_space"를,
            //      위와 같이 직접 핸들링해 준다.
            //      다만, "background-size" 값을, "100% 100%"에서 "contain" 값으로 변경해 준다.
            //      또한 아래 2가지 옵션도 추가해 주어야 한다.
            //      "background-rep0eat": "no-repeat",
            //      "background-position": "center",
            // $(e.target).css({
            //     "background-image": "url(" + window.URL.createObjectURL(files[0]) + ")",
            //     "outline": "none",
            //     // "background-size": "100% 100%"
            // });
            let fileName = files[0].name;
            // alert(`${getLineNumber()}, 이미지 파일 가져오기 성공!!! ${fileName}`);
        } else {
            alert(`${getLineNumber()}, 이미지 파일이 아니네요!!!`);
            return;
        }
    }
    // onfragover 이벤트가 없으면, 위의 onDrop 이벤트가 실행되지 않는다.
    $drop.ondragover = (e) => {
        e.stopPropagation(); // 화면 상에서 여러개 겹쳐 있을 때, 맨 상위 화면(모달 창)만 가리키게 한다.그 밑에 화면으로 전파가 안 된다.
        e.preventDefault();
        // alert(`${getLineNumber()}, $drop.className: ${$drop.className}, e.type: ${e.type}, e.target: ${e.target} ondragover 이벤트입니다.`)
        // alert(`${getLineNumber()}, e.dataTransfer.files[0]: ${e.dataTransfer.files[0]}, ondragover 이벤트입니다.`)
        if (e.type == "dragover") {
            $(e.target).css({
                "background-color": "black", // 마우스 드레그 상태에서, 모달 창 위로 올라 갔을 때, "black"
                "outline-offset": "-20px"
            });
        } else {
            $(e.target).css({
                "background-color": "white", // "dragleave"
                "outline-offset": "-10px"
            });
        }
    }
    // 드래그한 파일이 최초로 진입했을 때...
    $drop.ondragenter = (e) => {
        e.stopPropagation(); // 화면 상에서 여러개 겹쳐 있을 때, 맨 상위 화면(모달 창)만 가리키게 한다.그 밑에 화면으로 전파가 안 된다.
        e.preventDefault();
        // alert(`${getLineNumber()}, $drop.className: ${$drop.className} ondragenter 이벤트입니다.`)
        // $drop.classList.add("active");
    }
    // 드래그한 파일이 영역을 벗어났을 때...
    $drop.ondragleave = (e) => {
        e.stopPropagation(); // 화면 상에서 여러개 겹쳐 있을 때, 맨 상위 화면(모달 창)만 가리키게 한다.그 밑에 화면으로 전파가 안 된다.
        e.preventDefault();
        // $drop.classList.remove("active");
        // alert(`${getLineNumber()}, ondragleave 이벤트입니다.`)
    }

    // 2. 드래그 앤 드롭 jquery 처리...
    // https://cholol.tistory.com/552
    // $('.modal_image_upload')
    //     .on("dragover", dragOver)
    //     .on("dragleave", dragOver)
    //     .on("drop", uploadFiles);
    //
    // function dragOver(e) {
    //     e.stopPropagation(); // 화면 상에서 여러개 겹쳐 있을 때, 맨 상위 화면(모달 창)만 가리키게 한다.그 밑에 화면으로 전파가 안 된다.
    //     e.preventDefault();
    //
    //     if (e.type == "dragover") {
    //         $(e.target).css({
    //             "background-color": "black", // 마우스 드레그 상태에서, 모달 창 위로 올라 갔을 때, "black"
    //             "outline-offset": "-20px"
    //         });
    //     } else {
    //         $(e.target).css({
    //             "background-color": "white", // "dragleave"
    //             "outline-offset": "-10px"
    //         });
    //     }
    // }
    //
    // function uploadFiles(e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //
    //     alert(`${getLineNumber()}, e.originalEvent.dataTransfer: ${e.originalEvent.dataTransfer}`);
    //     e.dataTransfer = e.originalEvent.dataTransfer; // 여기 2개 라인이 실제로 "이미지"를 가져 오는 것이다.
    //     alert(`${getLineNumber()}, e.dataTransfer: ${e.dataTransfer}`);
    //
    //     let files = e.dataTransfer.files;
    //     filesName = files[0].name
    //     alert(`${getLineNumber()}, filesName: ${filesName}`);
    //     // alert(`getLineNumber(): ${getLineNumber()}`);
    //
    //     if (files.length > 1) {
    //         alert('하나만 올릴 수 있습니다.!!!');
    //         return;
    //     } else {
    //         // alert('1개 파일이네요!!!');
    //         // return;
    //     }
    //
    //     // var filetype = files[0].type;
    //     // alert('filetype: ', filetype);
    //     if (files[0].type.match(/image.*/)) {
    //
    //         $('#modal_add_feed_content').css({
    //             "display": "flex",
    //         });
    //         $('.modal_image_upload_content').css({
    //             "background-image": "url(" + window.URL.createObjectURL(files[0]) + ")",
    //             "outline": "none",
    //             "background-size": "contain",
    //             "background-rep0eat": "no-repeat",
    //             "background-position": "center",
    //             // "display": "flex",
    //         });
    //         $('#modal_add_feed').css({
    //             "display": "none"
    //         });
    //
    //         // 2023.01.07 Conclusion. 여기서 "$(e.target)"가 곧 "이미지 업로드"를 받는,
    //         //      모달 창인데, 이것이 2개이므로, "class" 이름으로 "img_upload_space"를,
    //         //      위와 같이 직접 핸들링해 준다.
    //         //      다만, "background-size" 값을, "100% 100%"에서 "contain" 값으로 변경해 준다.
    //         //      또한 아래 2가지 옵션도 추가해 주어야 한다.
    //         //      "background-rep0eat": "no-repeat",
    //         //      "background-position": "center",
    //
    //         $(e.target).css({
    //             "background-image": "url(" + window.URL.createObjectURL(files[0]) + ")",
    //             "outline": "none",
    //             // "background-size": "100% 100%"
    //         });
    //         let filename = files[0].name;
    //         console.log("filename: ", filename)
    //         // alert('이미지 파일 가져오기 성공!!!');
    //     } else {
    //         alert('이미지 파일이 아니네요!!!');
    //         return;
    //     }
    // }


    /////////////////////////////////////////////////////////////////////////////////////
    // 2023.01.07 Added. 신규 피드 "공유 하기" 버튼 처리...
    let bttn_write_feed = document.getElementById("button_write_feed");
    bttn_write_feed.addEventListener("click", e => {
    // $('#button_write_feed').on('click', ()=>{
    //     alert(`${getLineNumber()}, 공유 하기 버튼을 클릭하였네요!!! ${files[0].name}`);

        const image = $('#input_image').css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
        // alert(`${getLineNumber()}, image: ${image}`);

        // 2023.01.09 Conclusion. "files" 값이 "리스트" 형식의 값이므로, 반드시 첫번째 파일만 사용한다...
        // https://www.youtube.com/watch?v=M8UPyeF5DfM  ===> 5:35:10 요기...
        const file = files[0];
        // const file = files; 이건 사용하면 안 됨...
        // alert(`${getLineNumber()}, file: ${file}`);

        // const content = $('#input_content').val();
        // const content = document.getElementById("input_content").val();
        const content = document.getElementById("input_content").value.trim();
        // alert(`${getLineNumber()}, content: ${content}`);

        // const profile_image = $('#input_profile_image').attr('src');
        const profile_image = "http://cins.duckdns.org/static/assets/img/mekyoung_20220514_1.jpg";
        // alert(`${getLineNumber()}, profile_image: ${profile_image}`);
        if (profile_image == undefined) {
            alert(`${getLineNumber()}, 프로필 이미지가 비어 있습니다. 다시 확인하시오!`);
        }

        // Javascript에서 div element에 접근하여, div 안의 내용을 읽을 때는 다음 3가지 속성을 사용할 수 있습니다.
        // element.innerHTML : element 안의 HTML, XML을 읽습니다.
        // element.innerText : element 안의 텍스트를 사용자에게 "보여지는 대로" 읽습니다.
        // node.textContent : node 안의 텍스트를 (<script>, <style>에 상관없이) 읽습니다.
        const user_id = document.getElementById("input_user_id").innerText.trim();
        // const user_id = $.trim(('#input_user_id').text());
        // alert(`${getLineNumber()}, used_id: ${user_id}`);

        const user_email = document.getElementById("input_user_email").innerText.trim();
        // const user_email = $.trim($('#input_user_email');
        // alert(`${getLineNumber()}, user_email: ${user_email}`);

        let fd = new FormData();
        // alert(`${getLineNumber()}, fd: ${fd}`);
        // alert(`${getLineNumber()}, fd.values: ${fd.values}`);

        // 2023.01.09 Conslusion. AJAX 통신에서는 2가지 방식이 있다. 1. 일반 데이터: JSON 형식, 2. 파일 데이터: FORM 형식
        fd.append('file', file);
        fd.append('image', image);
        fd.append('content', content);
        fd.append('profile_image', profile_image);
        fd.append('user_id', user_id);
        fd.append('user_email', user_email);

        if (image.length <= 0) {
            alert(`${getLineNumber()}, 이미지가 비어 있습니다!!! 다시 확인하시오!`);
        } else if (content.length <= 0) {
            alert(`${getLineNumber()}, 설명을 정확히 입력하시오!!!`);
        } else if (profile_image == undefined) {
            alert(`${getLineNumber()}, 프로필 이미지가 비어 있습니다. 다시 확인하시오!`);
        } else if (user_id.length <= 0) {
            alert(`${getLineNumber()}, 사용자 아이디가 없습니다. 다시 확인하시오!!!`);
        } else if (user_email.length <= 0) {
            alert(`${getLineNumber()}, 사용자 이메일이 없습니다. 다시 확인하시오!!!`);
        } else {
            writeFeed(fd);
            console.log(`${getLineNumber()}, fd: ${fd}`);
        }
    });

    function writeFeed(fd) {
        $.ajax({
            url: "/content/upload",
            data: fd,
            method: "POST",
            processData: false,
            contentType: false,
            success: function (data) {
                console.log("성공");
            },
            error: function (request, status, error) {
                console.log("에러!!!");
            },
            complete: function () {
                console.log("무조건 실행!!!!!");
                // alert(`${getLineNumber()}, 모달 창 닫기 전 상태 확인!!!`)
                closeMode(); // 성공이든 실패든 modal창을 닫기 위해...
                location.reload(); // 로드한 feed를 메인화면에서 확인할 수 있게 화면은 새로 고침 해 준다.
            }
        });
    }

    let go_home = document.getElementById("go_home");
    go_home.addEventListener('click', ev => {
       location.replace('');
    });
    // $('.go_home').on('click', () => {
    //     location.replace('/');
    // });

    let close_modal = document.getElementById("close_modal");
    close_modal.addEventListener('click', ev => {
        closeMode();
    })
    // $('.close_modal').on("click", () => {
    //     closeMode();
    // });

    // 2023.01.09 Created. 모달 창 닫기 펑션...
    function closeMode() {
        $('.modal').css({
            display: 'none'
        });
    };

    // 2023.01.07 Created. 현재 실행 줄 번호 값 얻기...
    function getLineNumber() {
        let e = new Error();
        e = e.stack.split("\n")[2].split(":");
        e.pop();
        return e.pop();
    }

    // 2023.01.07 Conclusion. 이건 아예 안 되네...
    // function getLineNumber() {
    //     let lineNumber = new Exception().getStackTrace()[0].getLineNumber();
    //     return lineNumber;
    // }


    // console.log("0 process_scripts.js processCodeCurrent: ", processCodeCurrent);

    // // Add active state to sidbar nav links
    // let path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    // // console.log("scripts_process read(function) 실행 전 path: ", path);
    // let pathList = path.split("/");
    // // console.log("scripts_process read(function) 실행 전 pathList: ", pathList);
    // // console.log("scripts_process read(function) 실행 전 pathList[3]: ", pathList[3]);
    //
    // // 2022.04.10 Added. sessionStorage 값을 한번 확인해 본다.
    // // var i = 1;
    // // for (var keyname in sessionStorage) {
    // //     console.log("keyname: ", keyname, ", i: ", i);
    // //     // console.log(sessionStorage[i]);
    // //     i ++;
    // // }
    //
    // const latestSession = sessionStorage.getItem("latestSession");
    // // console.log("scripts_process latestSession: ", latestSession);
    // // 반드시 "latestSession" 변수에 저장한 후에, 아레에서 다시 세팅해야 한다.
    //
    // // console.log("넘어 온 fromDateString: ", fromDateString);
    // // console.log("넘어 온 toDateString: ", toDateString);
    //
    // const thisDate = new Date();
    // // alert(`${getLineNumber()}, thisDate: ${thisDate}`);
    // console.log(`${getLineNumber()}, thisDate: ${thisDate}`);
    //
    // let thisDateStr = dateFormat(thisDate);
    // console.log(`${getLineNumber()}, thisDateStr: ${thisDateStr}`);
    // let thisDateString = getYyyyMmDdMmSsToString(thisDate);
    // console.log(`${getLineNumber()}, thisDateString: ${thisDateString}`);
    //
    // // 2022.04.10 Added. 현재 메뉴로 저장된 fromDate, toDate 값이 없을 때만, 넘어온 값으로 넣어준다.
    // let this_fromDate_key, this_fromDate_value, this_toDate_key, this_toDate_value;
    // // this_fromDate_key = latestSession + "_fromDate";
    // this_fromDate_key = thisDateStr;
    // // this_toDate_key = latestSession + "_toDate";
    // this_toDate_key = thisDateStr;
    // this_fromDate_value = sessionStorage.getItem(this_fromDate_key);
    // this_toDate_value = sessionStorage.getItem(this_toDate_key);
    // // console.log("scripts_process this_fromDate_key: ", this_fromDate_key);
    // // console.log("scripts_process this_toDate_key: ", this_toDate_key);
    // // console.log("scripts_process 세팅 전 this_fromDate_value: ", this_fromDate_value);
    // // console.log("scripts_process 세팅 전 this_toDate_value: ", this_toDate_value);
    // // if (this_fromDate_value === null) {
    // //     this_fromDate_value = fromDateString;
    // //     console.log("scripts_process 내부 this_fromDate_value: ", this_fromDate_value);
    // // }
    // // if (this_toDate_value === null) {
    // //     this_toDate_value = toDateString;
    // //     console.log("scripts_process 내부 this_toDate_value: ", this_toDate_value);
    // // }
    //
    // // 2022.04.10 Conclusion. 현재 메뉴로 저장된 fromDate, toDate 값이 있든 없든 상관없이, 무조건 넘어온 값으로 넣어준다.
    // // 2022.04.10 Conclusion. session 용량이 500 글짜 정도로 한계가 있는 관계로,
    // // 가장 최근 기간의 fromDate, toDate 값만을 session 에 저장 관리한다.
    // // 여기서는 views.py 에서 넘어온 가장 최근 메뉴의 fromDate, toDate 값을, 다시 찍어준다.
    // // this_fromDate_value = fromDateString;
    // // this_toDate_value = toDateString;
    // this_fromDate_value = thisDateStr;
    // this_toDate_value = thisDateStr;
    //
    // sessionStorage.setItem(this_fromDate_key, this_fromDate_value);
    // sessionStorage.setItem(this_toDate_key, this_toDate_value);
    // this_fromDate_value = sessionStorage.getItem(this_fromDate_key);
    // this_toDate_value = sessionStorage.getItem(this_toDate_key);
    // // console.log("scripts_process 세팅 후 this_fromDate_value: ", this_fromDate_value);
    // // console.log("scripts_process 세팅 후 this_toDate_value: ", this_toDate_value);
    //
    // var pathAdded;
    // if (latestSession === "login") {
    //     sessionStorage.setItem("latestSession", pathList[3]);
    //     pathAdded = false;
    //     // 0. 첫번째 화면에는 "왼쪽 메인 메뉴"를 보여 준다.
    //     $("body").toggleClass("sb-sidenav-toggled");
    //     // alert(`pathAdded = false latestSession: ${latestSession}`);
    // } else {
    //     if (pathList[3].length > 0) {
    //         pathAdded = true;
    //         sessionStorage.setItem("latestSession", pathList[3]);
    //     } else {
    //         pathAdded = false;
    //         // 0. 첫번째 화면에는 "왼쪽 메인 메뉴"를 보여 준다.
    //         $("body").toggleClass("sb-sidenav-toggled");
    //         // alert(`pathAdded = false pathList[3]: ${pathList[3]}`);
    //     }
    // }
    //
    // // 접속 클라이언트 IP, ID 얻기 : 서버의 uwsgi_emperor.log 파일에 로그 기록을 위함.
    // // const IP = '{{ sessionIP | escapejs }}'; // 여기서 바로는 안 되고, basebottom.html 파일에서 먼저 변수 정의 후 여기서 사용.
    // const IP = "127.0.0.1";
    // const ID = "clarus.66"
    // const userId = "rwkang@naver.com"
    // console.log("scripts_process IP: ", IP);
    // console.log("scripts_process ID: ", ID);
    // console.log("scripts_process sessionUserId: ", userId);
    //
    // // console.log("넘어 온 fromDateString: ", fromDateString);
    //
    // // $("#production-container").hide();
    //
    // // alert(`1 fromDateString: ${fromDateString}`);
    //
    // // 2021.02.06 Conclusion. 여기는 진입부 모두 실행한 후, 실행한다. 여길 먼저 실행하지 않는다는 점에 주의...
    // $(document).ready(function () {
    //
    //     // // 2023.01.09 Added. keydown event 발생 시에 event.preventDefault()를 추가해서 event 발생을 취소한다.
    //     // // form에서 Enter key를 누르면 405 Method Not Allowed error가 발생하는 문제 해결하기
    //     // $("input").keydown(function (event) {
    //     //     if (event.keyCode === 13) {
    //     //         event.preventDefault();
    //     //     }
    //     // })
    //
    //     // 2021.07.01 Added.
    //     // const userId = userId;
    //
    //     // 2021.06.27 Added. "all"을 "공정"으로 변경해 준다.
    //     let processCodeCurrent = 'all';
    //     if (processCodeCurrent == 'all') {
    //         // processCodeCurrent = '공정';
    //         let processNameCurrent = '공정';
    //     }
    //     // console.log("1 process_scripts.js processCodeCurrent: ", processCodeCurrent);
    //
    //     // <!-- 2021.06.26 Added. Progress Bar https://arbcoms.com/36-how-to-add-pagination-plus-fancy-progress-bar-in-django/ -->
    //     // 2021.06.30 Conclusion. 의미없음
    //     // NProgress.start();
    //     // NProgress.done();
    //
    //     // 2021.03.05 Added. NavBar에서 [시스템 제목.PSC 제조 관리] 클릭하면, 메뉴가 보이게...
    //     $(document).on("click", "#navBarAll", function (e) {
    //         e.preventDefault();
    //         $("body").toggleClass("sb-sidenav-toggled");
    //         // alert(`1 navBarAll clicked!! e: ${e}`);
    //     });
    //
    //     // 2021.02.04 Conclusion. ***** 자바스크립트에서는, 달은 [0]부터 [11]까지이고, [0]이 1월임,
    //     // 날짜는 [1]부터 시작하는데, ***** 만약 날짜 값을 [0]을 주면, 그 달의 [마지막 날]을 돌려준다.*****
    //     let thisDate;
    //     if (latestSession === "login") {
    //         thisDate = sessionStorage.getItem("fromDateProCapacity");
    //         const thisDateArr = thisDate.split("-");
    //         thisDate = new Date(thisDateArr[0], thisDateArr[1] - 1, thisDateArr[2]); // "년,월,일"인데, 월은 1을 빼주어야 함.
    //     } else {
    //         thisDate = new Date();
    //     }
    //
    //     alert(`11 thisDate: ${thisDate}`);
    //
    //     let firstDay = 1; // 이건 이번 달, 지난 달, 다음 달 구분 없이, 무조건 [1]
    //     // console.log("scripts_process thisDate: ", thisDate); // 서버의 uwsgi_emperor.log 파일에 로그 기록을 위함.
    //     // console.log(""); // 서버의 uwsgi_emperor.log 파일에 로그 기록을 위함.
    //     let thisDateString = getYyyyMmDdMmSsToString(thisDate);
    //     // console.log(`${getLineNumber()}, thisDateString: ${thisDateString}`);
    //
    //     let nextMonth = thisDate.getMonth() + 1; // 숫자로 5, 또는 11.
    //     // console.log("nextMonth: ", nextMonth);
    //     // var firstDateNextMonth = new Date(thisDate.getFullYear(), nextMonth, firstDay); // 이런 식으로 계산할 필요가 없다.
    //     // console.log("firstDateNextMonth: ", firstDateNextMonth);
    //     let lastDateThisMonth = new Date(thisDate.getFullYear(), thisDate.getMonth(), 0); // 날짜 값을 [0]을 주면, 마지막 날짜를 돌려 준다.
    //     // console.log("lastDateThisMonth: ", lastDateThisMonth);
    //     let lastDayThisMonth = lastDateThisMonth.getDate();
    //     // console.log("lastDayThisMonth: ", lastDayThisMonth); // 숫자로 마지막 날짜 값을 얻는다.
    //
    //     var fromDate = new Date(thisDate.getFullYear(), thisDate.getMonth(), firstDay);
    //     // console.log("typeof fromDate: ", typeof fromDate);
    //     // console.log("fromDate: ", fromDate);
    //     // alert(`2 fromDate: ${fromDate}`);
    //
    //     var fromDateString = getYyyyMmDdMmSsToString(fromDate);
    //     // console.log("typeof fromDateString: ", typeof fromDateString);
    //     // console.log("fromDateString: ", fromDateString);
    //
    //     // alert(`22 thisDate: ${thisDate}`);
    //
    //     var toDate = thisDate;
    //     var toDateString = getYyyyMmDdMmSsToString(toDate); // new Date(); // 반드시 여기서 선언을 해 주어야 한다.
    //
    //     // fromDate = dateToYYYYMMDD(fromDate);
    //     // toDate = dateToYYYYMMDD(toDate);
    //     fromDate = thisDateStr;
    //     toDate = thisDateStr;
    //     // console.log("fromDate typeof:", typeof fromDate);
    //     // console.log("변환 후 fromDate 값:", fromDate);
    //     // console.log("변환 후 toDate 값:", toDate);
    //
    //     // fromDateString = document.getElementById("fromDate").value;
    //     fromDateString = thisDateStr;
    //     // console.log("1일로 다시 세팅한 fromDateString 값 typeof:", typeof fromDateString);
    //     // console.log("시작 1일로 다시 세팅한 fromDateString 값:", fromDateString);
    //
    //     // toDateString = document.getElementById("toDate").value;
    //     toDateString = thisDateStr;
    //     // console.log("오늘로 다시 세팅한 toDateString 값 typeof:", typeof toDateString);
    //     // console.log("시작 오늘로 다시 세팅한 toDateString 값:", toDateString);
    //
    //     // 2021.02.09 Added. [table.td.tr 행 수 또는 그 값 가져오기.
    //     let arrProcessCode = $("td#process-code");
    //     let arrProcessName = $("td#process-name");
    //     // console.log("시작 arrProcessCode.length: ", arrProcessCode.length);
    //     // console.log("시작 arrProcessName: ", arrProcessName);
    //     // console.log("시작 typeof arrProcessName: ", typeof arrProcessName);
    //     let processCode;
    //     let processName;
    //     // 2021.02.09 Added. 만약 2개 이상의 공정 자료가 있을 때는, 모든 공정의 자료를 가져오게 한다.
    //     if (arrProcessCode.length === 0 || arrProcessCode.length > 1) {
    //         processCode = "공정";
    //         processName = "전체";
    //         // alert(`33 processCode: ${processCode}, processCode: ${processCode}`);
    //     } else {
    //         $.each(arrProcessCode, function (index, item) { // ***** 여기는 로우 1개씩 그 값을 가져와서 뿌린다.***** [index]는 [0]부터 시작함에 주의...
    //             let itemText = $(item).text();
    //             if (index === 0) {
    //                 processCode = itemText;
    //             }
    //         });
    //     }
    //
    //     let tradeId = 0;
    //     let tradeName = 'all';
    //     // console.log("tradeId: ", tradeId);
    //     // console.log("typeof tradeId: ", typeof tradeId);
    //
    //     // alert(`33 fromDateString: ${fromDateString}`);
    //
    //     var action = 'inactive';
    //     // var href = this.href;
    //     // console.log("보낼 path: ", path);
    //
    //     // let pathCurrent = window.location.href; // because the 'href' property of the DOM element is the absolute path
    //     // let pathCurrentList = pathCurrent.split("/");
    //     // console.log("pathCurrent: ", pathCurrent);
    //     // console.log("pathList[3]: ", pathList[3]);
    //     // console.log("pathCurrentList[3]: ", pathCurrentList[3]);
    //
    //     // 2021.06.25 Conclusion. 초기값으로 "00 INIT" 라인명을 준다.
    //     var legendTextCurrent = "00 INIT";
    //
    //     if (pathList[3] === "pmp_all_month_buyer_qty" || pathList[3] === "pmp_all_daily_buyer_qty"
    //         || pathList[3] === 'pmp_all_month_buyer_amt' || pathList[3] === 'pmp_all_daily_buyer_amt') {
    //         // 2021.03.03 Added. [table.생산 실적 수량]을 [page]별로 합산. 서버에서 자료를 어떠한 형태로든 가져오면 무조건 수행...
    //         // console.log("111 dataTableResetShippingData() 함수 호출 전: ");
    //         var shippingTotal = dataTableResetShippingData(legendTextCurrent);
    //         // console.log("111 dataTableResetShippingData() 함수 호출 후 ppQtyTotal: ", ppQtyTotal);
    //
    //     } else if (pathList[3] === "ppp_all_month_process") {
    //         // 2021.03.03 Added. [table.생산 실적 수량]을 [page]별로 합산. 서버에서 자료를 어떠한 형태로든 가져오면 무조건 수행...
    //         // console.log("111 dataTableResetProcess() 함수 호출 전: ");
    //         // dataTableResetProcess(legendTextCurrent); // 2021.06.25 Conclusion. dataTableResetMonitoring()로 같이 사용하게 한다.
    //         var ppQtyTotal = dataTableResetMonitoring(legendTextCurrent);
    //     } else if (pathList[3] === "ppp_all_daily_process") {
    //         // console.log("111 dataTableResetProcess() 함수 호출 후 ppQtyTotal: ", ppQtyTotal);
    //         // 2021.03.03 Added. [table.생산 실적 수량]을 [page]별로 합산. 서버에서 자료를 어떠한 형태로든 가져오면 무조건 수행...
    //         // console.log("111 dataTableResetProcess() 함수 호출 전: ");
    //         // dataTableResetProcess(legendTextCurrent); // 2021.06.25 Conclusion. dataTableResetMonitoring()로 같이 사용하게 한다.
    //         var ppQtyTotal = dataTableResetMonitoring(legendTextCurrent);
    //         // console.log("111 dataTableResetProcess() 함수 호출 후 ppQtyTotal: ", ppQtyTotal);
    //
    //     } else if (pathList[3] === "pro_shipping_daily_product") {
    //         // 2021.03.03 Added. [table.생산 실적 수량]을 [page]별로 합산. 서버에서 자료를 어떠한 형태로든 가져오면 무조건 수행...
    //         // console.log("111 dataTableResetShippingData() 함수 호출 전: ");
    //         var shippingTotal = dataTableResetShippingData(legendTextCurrent);
    //         // console.log("111 dataTableResetShippingData() 함수 호출 후 ppQtyTotal: ", ppQtyTotal);
    //     } else if (pathList[3] === 'pro_shipping_month_proportion') {
    //         //console.log("1-1 pathCurrent: ");
    //         //alert("1-1 dataTableResetShippingData() 함수 호출 전 ");
    //         var shippingTotal = dataTableResetShippingData(legendTextCurrent);
    //     } else if (pathList[3] === 'pro_shipping_month_product') {
    //         //alert("1-2 dataTableResetShippingData() 함수 호출 전 ");
    //         var shippingTotal = dataTableResetShippingData(legendTextCurrent);
    //         // alert("1-2 dataTableResetShippingData() 함수 호출 후 ");
    //
    //     } else if (pathList[3] === 'ppp_process_month_machine') {
    //         //console.log("1-1 pathCurrent: ");
    //         var ppQtyTotal = dataTableResetMonitoring(legendTextCurrent);
    //     } else if (pathList[3] === 'ppp_process_daily_machine') {
    //         //console.log("1-1 pathCurrent: ");
    //         var ppQtyTotal = dataTableResetMonitoring(legendTextCurrent);
    //     } else if (pathList[3] === 'ppp_process_month_product') {
    //         // console.log("1-2 dataTableResetMonitoring() 함수 호출 전 ");
    //         // alert("1-2 dataTableResetMonitoring() 함수 호출 전 legendTextCurrent: ", legendTextCurrent);
    //         var ppQtyTotal = dataTableResetMonitoring(legendTextCurrent);
    //         // alert("1-2 dataTableResetMonitoring() 함수 호출 후 ");
    //         // console.log("1-2 dataTableResetMonitoring() 함수 호출 후 ppQtyTotal: ", ppQtyTotal);
    //     } else if (pathList[3] === "ppp_process_daily_product") {
    //         // 2021.03.03 Added. [table.생산 실적 수량]을 [page]별로 합산. 서버에서 자료를 어떠한 형태로든 가져오면 무조건 수행...
    //         // console.log("111 dataTableResetProcess() 함수 호출 전: ");
    //         // dataTableResetProcess(legendTextCurrent); // 2021.06.25 Conclusion. dataTableResetMonitoring()로 같이 사용하게 한다.
    //         var ppQtyTotal = dataTableResetMonitoring(legendTextCurrent);
    //         // console.log("111 dataTableResetProcess() 함수 호출 후 ppQtyTotal: ", ppQtyTotal);
    //
    //     } else if (pathList[3] === "ppp_process_product_ajax") {
    //         // 2021.03.03 Added. [table.생산 실적 수량]을 [page]별로 합산. 서버에서 자료를 어떠한 형태로든 가져오면 무조건 수행...
    //         // console.log("111 dataTableResetProcess() 함수 호출 전: ");
    //         // dataTableResetProcess(legendTextCurrent); // 2021.06.25 Conclusion. dataTableResetMonitoring()로 같이 사용하게 한다.
    //         var ppQtyTotal = dataTableResetMonitoring(legendTextCurrent);
    //         // console.log("111 dataTableResetProcess() 함수 호출 후 ppQtyTotal: ", ppQtyTotal);
    //
    //     } else if (pathList[3] === 'ppp_capacity') {
    //         // console.log("222 pathCurrent: ", pathCurrent);
    //         var processTotal = dataTableResetCapacity();
    //     } else if (pathList[3] === 'pro_capacity') {
    //         // alert(`222 pro_capacity clicked!! e: ${pathCurrent}`);
    //         // console.log("222 pathCurrent: ", pathCurrent);
    //         var processTotal = dataTableResetCapacity();
    //     } else if (pathList[3] === 'ppp_current') {
    //         // console.log("333 pathCurrent: ", pathCurrent);
    //         var ppQtyTotal = dataTableResetCurrent();
    //     } else if (pathList[3] === 'ppp_monitoring') {
    //         // console.log("444 pathCurrent: ", pathCurrent);
    //         dataTableResetMonitoring(legendTextCurrent);
    //     } else if (pathList[3] === 'ppp_machine') {
    //         // console.log("4-4 pathCurrent: ", pathCurrent);
    //         dataTableResetMonitoring(legendTextCurrent);
    //     } else if (pathList[3] === 'ppp_ai_inspection') {
    //         // console.log("555 pathCurrent: ", pathCurrent);
    //         dataTableResetAiInspection();
    //     }
    //
    //     // 2021.03.03 Added. 표 맨 아래 우측, [pagination.각 페이지] 클릭했을 때, [table.생산 실적 수량]을 [page]별로 합산.
    //
    //     $(document).on("click", ".page-link", function () {
    //         if (pathList[3] === "pmp_all_month_buyer_qty" || pathList[3] === "pmp_all_daily_buyer_qty"
    //             || pathList[3] === 'pmp_all_month_buyer_amt' || pathList[3] === 'pmp_all_daily_buyer_amt') {
    //             // console.log("111 pathCurrent: ");
    //             dataTableResetShippingData(legendTextCurrent);
    //
    //         } else if (pathList[3] === 'ppp_all_month_process') {
    //             //console.log("1-1 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_all_daily_process') {
    //             //console.log("1-1 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //
    //         } else if (pathList[3] === 'pro_shipping_daily_product') {
    //             // console.log("111 pathCurrent: ");
    //             dataTableResetShippingData(legendTextCurrent);
    //         } else if (pathList[3] === 'pro_shipping_month_proportion') {
    //             //console.log("1-1 pathCurrent: ");
    //             //alert("1-1 dataTableResetShippingData() 함수 호출 전 ");
    //             dataTableResetShippingData(legendTextCurrent);
    //         } else if (pathList[3] === 'pro_shipping_month_product') {
    //             //console.log("1-2 pathCurrent: ");
    //             //alert("1-1 dataTableResetShippingData() 함수 호출 전 ");
    //             dataTableResetShippingData(legendTextCurrent);
    //
    //         } else if (pathList[3] === 'ppp_process_month_machine') {
    //             //console.log("1-1 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_process_daily_machine') {
    //             //console.log("1-1 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_process_month_product') {
    //             //console.log("1-2 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_process_daily_product') {
    //             // console.log("11 pathCurrent: ");
    //             // dataTableResetProcess(legendTextCurrent); // 2021.06.25 Conclusion. dataTableResetMonitoring()로 같이 사용하게 한다.
    //             dataTableResetMonitoring(legendTextCurrent);
    //
    //         } else if (pathList[3] === 'ppp_process_product_ajax') {
    //             // console.log("11 pathCurrent: ");
    //             // dataTableResetProcess(legendTextCurrent); // 2021.06.25 Conclusion. dataTableResetMonitoring()로 같이 사용하게 한다.
    //             dataTableResetMonitoring(legendTextCurrent);
    //
    //         } else if (pathList[3] === 'ppp_capacity') {
    //             // console.log("22 pathCurrent: ");
    //             dataTableResetCapacity();
    //         } else if (pathList[3] === 'pro_capacity') {
    //             // console.log("222 pathCurrent: ", pathCurrent);
    //             // console.log("22 pathCurrent: ");
    //             dataTableResetCapacity();
    //         } else if (pathList[3] === 'ppp_current') {
    //             // console.log("33 pathCurrent: ");
    //             dataTableResetCurrent();
    //         } else if (pathList[3] === 'ppp_monitoring') {
    //             // console.log("44 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_machine') {
    //             // console.log("4-4 pathCurrent: ", pathCurrent);
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_ai_inspection') {
    //             // console.log("55 dataTableResetAiInspection: ");
    //             dataTableResetAiInspection();
    //         }
    //     });
    //
    //     // 2021.03.04 Added. 표 중간 표 제품 바로 밑 왼쪽, 페이지에 표시할 로우 수
    //     // [table.show entries] 로수 수를 변경하면, 역시 [table.생산 실적 수량]을 [page]별로 합산.
    //     $(document).on("click", ".custom-select", function () {
    //         if (pathList[3] === "pmp_all_month_buyer_qty" || pathList[3] === "pmp_all_daily_buyer_qty"
    //             || pathList[3] === 'pmp_all_month_buyer_amt' || pathList[3] === 'pmp_all_daily_buyer_amt') {
    //             // console.log("111 pathCurrent: ");
    //             dataTableResetShippingData(legendTextCurrent);
    //
    //         } else if (pathList[3] === 'ppp_all_month_process') {
    //             // console.log("1-1 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_all_daily_process') {
    //             // console.log("1-1 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //
    //         } else if (pathList[3] === 'pro_shipping_daily_product') {
    //             // console.log("111 pathCurrent: ");
    //             dataTableResetShippingData(legendTextCurrent);
    //         } else if (pathList[3] === 'pro_shipping_month_proportion') {
    //             console.log("1-1 pathCurrent: ");
    //             alert("1-1 dataTableResetShippingData() 함수 호출 전 ");
    //             dataTableResetShippingData(legendTextCurrent);
    //         } else if (pathList[3] === 'pro_shipping_month_product') {
    //             console.log("1-2 pathCurrent: ");
    //             alert("1-1 dataTableResetShippingData() 함수 호출 전 ");
    //             dataTableResetShippingData(legendTextCurrent);
    //
    //         } else if (pathList[3] === 'ppp_process_month_machine') {
    //             // console.log("1-1 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_process_daily_machine') {
    //             // console.log("1-1 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_process_month_product') {
    //             //console.log("1-2 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_process_daily_product') {
    //             // console.log("1 pathCurrent: ");
    //             // dataTableResetProcess(legendTextCurrent); // 2021.06.25 Conclusion. dataTableResetMonitoring()로 같이 사용하게 한다.
    //             dataTableResetMonitoring(legendTextCurrent);
    //
    //         } else if (pathList[3] === 'ppp_process_product_ajax') {
    //             // console.log("1 pathCurrent: ");
    //             // dataTableResetProcess(legendTextCurrent); // 2021.06.25 Conclusion. dataTableResetMonitoring()로 같이 사용하게 한다.
    //             dataTableResetMonitoring(legendTextCurrent);
    //
    //         } else if (pathList[3] === 'ppp_capacity') {
    //             // console.log("2 pathCurrent: ");
    //             dataTableResetCapacity();
    //         } else if (pathList[3] === 'pro_capacity') {
    //             // console.log("2 pathCurrent: ");
    //             dataTableResetCapacity();
    //         } else if (pathList[3] === 'ppp_current') {
    //             // console.log("3 pathCurrent: ");
    //             dataTableResetCurrent();
    //         } else if (pathList[3] === 'ppp_monitoring') {
    //             // console.log("4 pathCurrent: ");
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_machine') {
    //             // console.log("4-4 pathCurrent: ", pathCurrent);
    //             dataTableResetMonitoring(legendTextCurrent);
    //         } else if (pathList[3] === 'ppp_ai_inspection') {
    //             // console.log("5 pathCurrent: ");
    //             dataTableResetAiInspection();
    //         }
    //     });

        // alert(`44 fromDateString: ${fromDateString}`);

        // // const spinnerBox = document.getElementById("spinner-box");
        // const spinnerBox = document.getElementById("spinner-box");
        // // setTimeout(()=>{
        // spinnerBox.classList.add("not-visible");
        // // }), 500;

        // console.log("ready() 내부 : 여기가 제일 마직막에 실행되는 것인가?", pathList[3]); // 맞네... 여기가 제일 나중에 실해되네...

        // var defaultLegendClickHandler = Chart.defaults.global.legend.onClick;
        // console.log("!!!: ", defaultLegendClickHandler);
        // var defaultLegendClickHandler = Chart.defaults.global.legend;
        // console.log("!!!: ", defaultLegendClickHandler);
        // console.log("!!!: ", myChart.);
        // onClick: function (e, legendItem) {

    // });

    // 2023.01.09 Added. 아래 "dateFormat()" 펑션은 블로그에서 가져 온 것으로, getYyyyMmDdMmSsToString() 펑션과 비슷한 내용이다.
    // https://sweets1327.tistory.com/63
    function dateFormat(date) {
        let dateFormat2 = date.getFullYear() +
            '-' + ( (date.getMonth()+1) <= 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
            '-' + ( (date.getDate()) <= 9 ? "0" + (date.getDate()) : (date.getDate()) );
        return dateFormat2;
    }
    // let toDay = dateFormat(new Date('2022-5-21')); // "2022-05-21"

    function getYyyyMmDdMmSsToString(date) {
        // alert(`0 getYyyyMmDdMmSsToString date: ${date}`);
        // console.log("date: ", date);
        // console.log("typeof date: ", typeof date);
        var dd = date.getDate();
        var mm = date.getMonth()+1; //January is 0!

        var yyyy = date.getFullYear();
        if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}

        yyyy = yyyy.toString();
        mm = mm.toString();
        dd = dd.toString();

        var m = date.getHours();
        var s = date.getMinutes();

        if(m<10){m='0'+m} if(s<10){s='0'+s}
        m = m.toString();
        s = s.toString();

        // var s1 = yyyy+"-"+mm+"-"+dd+" "+m+":"+s;
        var s1 = yyyy+"-"+mm+"-"+dd;
        return s1;
    }

})(jQuery);
