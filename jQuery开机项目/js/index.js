window.onload = function () {
    // 获取头部容器
    let headerNode = document.querySelector('#header');
    // 获取li节点
    let liNodes = document.querySelectorAll('#header .headMain .nav li');
    // 获取小三角节点
    let arrowNode = document.querySelector('#header .arrow');
    // 获取up节点
    let upNodes = document.querySelectorAll('#header .headMain .nav li .up');
    // 获取content节点
    let contentNode = document.querySelector('.content');
    // 获取内容区内部ul
    let ulNode = document.querySelector('.content .list');
    // 获取内容区li节点
    let liContentNodes = document.querySelectorAll('.content .list > li');
    // 获取第二屏item节点
    let itemNodes = document.querySelectorAll('.content .list > li .course .course3 .item');
    // 获取第二屏back节点
    let backNodes = document.querySelectorAll('.content .list > li .course .course3 .item .back');
    // 获取首屏轮播图小圆点
    let homeIconLiNodes = document.querySelectorAll('.content .list > li .home .homeIcon > li');
    // 获取轮播图图片的li
    let homeLiNodes = document.querySelectorAll('.content .list > li .home .homeList > li');
    // home节点 用来做移入事件
    let homeNode = document.querySelector('.content .list > li .home');
    // 获取侧边导航li
    let broadsideLiNodes = document.querySelectorAll('.content .meunBar > li');
    // 获取开机遮罩线段
    let maskLineNode = document.querySelector('#mask .maskLine');
    // 获取开机上遮罩
    let maskTopNode = document.querySelector('#mask .maskTop');
    // 获取开机下遮罩
    let maskBottomNode = document.querySelector('#mask .maskBottom');
    // 获取遮罩层
    let maskNode = document.querySelector('#mask');
    // 设置最初索引
    let index = 0;
    // 设置上一次索引
    let lastIndex = 0;
    // 设置降频定时器
    let timer = null;
    // 记录首屏轮播的旧索引
    let oldIndex = 0;
    // 自动轮播索引值
    let autoIndex = 0;
    // 头部颜色数组
    let colorHead = ['rgba(135, 206, 235, .3)', 'rgba(248, 109, 0, .3)', 'rgba(204, 199, 106, .3)', 'rgba(177, 210, 167, .3)', 'rgba(102, 105, 176, .3)'];
    // 获取首屏小圆点的ul
    let homeIconNode = document.querySelector('.content .list > li .home .homeIcon');
    // 获取首屏的轮播图ul
    let homeListNode = document.querySelector('.content .list > li .home .homeList');
    // 获取小飞机
    let planeNode1 = document.querySelector('.content .list > li .course .plane1');
    let planeNode2 = document.querySelector('.content .list > li .course .plane2');
    let planeNode3 = document.querySelector('.content .list > li .course .plane3');
    // 获取笔
    let pencelNode1 = document.querySelector('.content .list > li .works .pencel1');
    let pencelNode2 = document.querySelector('.content .list > li .works .pencel2');
    let pencelNode3 = document.querySelector('.content .list > li .works .pencel3');
    // 获取第四屏两图片容器
    let itemNode1 = document.querySelector('.content .list > li .about .about3 .item:first-child');
    let itemNode2 = document.querySelector('.content .list > li .about .about3 .item:last-child');
    // 获取第五屏的文本容器
    let teamNode1 = document.querySelector('.content .list > li .team .team1');
    let teamNode2 = document.querySelector('.content .list > li .team .team2');
    // 获取音频容器
    let musicNode = document.querySelector('#header .headMain .music');
    // 获取音频标签
    let audioNode = document.querySelector('#header .headMain .music audio');
    // 定义出场入场方式
    let inOrOutArr = [{
        inAin: function () {
            // 第一屏入场
            homeListNode.style.transform = 'translateY(0px)';
            homeIconNode.style.transform = 'translateY(0px)';
            homeListNode.style.opacity = '1';
            homeIconNode.style.opacity = '1';
        }, outAin: function () {
            // 第一屏出场
            homeListNode.style.transform = 'translateY(-200px)';
            homeIconNode.style.transform = 'translateY(200px)';
            homeListNode.style.opacity = '0';
            homeIconNode.style.opacity = '0';
        }
    }, {
        inAin: function () {
            // 第二屏入场
            planeNode1.style.transform = 'translate(0px, 0px)';
            planeNode2.style.transform = 'translate(0px, 0px)';
            planeNode3.style.transform = 'translate(0px, 0px)';
            planeNode1.style.opacity = '1';
            planeNode2.style.opacity = '1';
            planeNode3.style.opacity = '1';
        }, outAin: function () {
            // 第二屏出场
            planeNode1.style.transform = 'translate(-200px, -200px)';
            planeNode2.style.transform = 'translate(-200px, 200px)';
            planeNode3.style.transform = 'translate(200px, -200px)';
            planeNode1.style.opacity = '0';
            planeNode2.style.opacity = '0';
            planeNode3.style.opacity = '0';
        }
    }, {
        inAin: function () {
            // 第三屏入场
            pencelNode1.style.transform = 'translateY(0px)';
            pencelNode2.style.transform = 'translateY(0px)';
            pencelNode3.style.transform = 'translateY(0px)';
            pencelNode1.style.opacity = '1';
            pencelNode2.style.opacity = '1';
            pencelNode3.style.opacity = '1';
        }, outAin: function () {
            // 第三屏出场
            pencelNode1.style.transform = 'translateY(-200px)';
            pencelNode2.style.transform = 'translateY(200px)';
            pencelNode3.style.transform = 'translateY(200px)';
            pencelNode1.style.opacity = '0';
            pencelNode2.style.opacity = '0';
            pencelNode3.style.opacity = '0';
        }
    }, {
        inAin: function () {
            // 第四屏入场
            itemNode1.style.transform = 'rotateZ(0deg)';
            itemNode2.style.transform = 'rotateZ(0deg)';
        }, outAin: function () {
            // 第四屏出场
            itemNode1.style.transform = 'rotateZ(45deg)';
            itemNode2.style.transform = 'rotateZ(-45deg)';
        }
    }, {
        inAin: function () {
            // 第五屏入场
            teamNode1.style.transform = 'translateX(0px)';
            teamNode2.style.transform = 'translateX(0px)';
        }, outAin: function () {
            teamNode1.style.transform = 'translateX(-200px)';
            teamNode2.style.transform = 'translateX(200px)';
        }
    }];
    // 内容区
    // 设置内容区的高度是页面高度 - 首部高度
    contentNode.style.height = document.documentElement.clientHeight - headerNode.offsetHeight + 'px';
    // 开机动画
    function loading() {
        let arr = ['xtlogo.png', 'home_gruen.png', 'home.png', 'list1.jpeg', 'list2.jpeg', 'list3.jpeg', 'list4.jpeg', 'worksimg1.jpg', 'worksimg2.jpg', 'worksimg3.jpg', 'worksimg4.jpg', 'worksimg3.jpg', 'worksimg4.jpg', 'team1.png'];
        let imgCount = 0;
        for (let i = 0; i < arr.length; i++) {
            let imgNode = new Image();
            imgNode.src = './img/' + arr[i];
            imgNode.onload = function () {
                imgCount++;
                maskLineNode.style.width = imgCount / arr.length * 100 + '%';
            }
        }
    }
    loading();
    // 绑定过渡完成事件 注意有几个过渡执行几次
    maskLineNode.addEventListener('transitionend', function () {
        maskTopNode.style.height = '0';
        maskBottomNode.style.height = '0';
        this.style.display = 'none';
    });
    // 绑定过渡事件 为高度过渡绑定 过渡完开启轮播 删除遮罩节点
    maskBottomNode.addEventListener('transitionend', function () {
        // 第一屏入场
        inOrOutArr[0].inAin();
        // 执行自动轮播
        autoMove();
        // 删除节点
        maskNode.remove();
    });
    // 当视口发生变换的时候 自动更新小三角的位置
    window.onresize = function () {
        // 更新小三角的位置
        arrowPosition(index);
    }
    // 获取第四屏ul节点
    let picUlNodes = document.querySelectorAll('.content .list > li .about .about3 .item ul');
    // 设置第一个的up宽度是100%
    upNodes[0].style.width = '100%';
    // 默认处于出场状态
    for (let i = 0; i < 5; i++) {
        inOrOutArr[i].outAin();
    }
    // 设置小三角的位置
    function arrowPosition(index) {
        arrowNode.style.left = liNodes[index].getBoundingClientRect().left + liNodes[index].offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px';
    }
    // 设置头部颜色函数
    function headColor(index) {
        headerNode.style.backgroundColor = colorHead[index];
    }
    // 设置主屏幕移动
    function move(index) {
        ulNode.style.top = - index * (document.documentElement.clientHeight - headerNode.offsetHeight) + 'px';
        // 小三角移动
        arrowPosition(index);
        // 头部颜色变化
        headColor(index);
        // 文字遮罩的宽度发生改变
        shadeWidth(index);
        broadsideColor(index);
        inOrOutArr[lastIndex].outAin();
        inOrOutArr[index].inAin();
    }
    // 封装上层文字遮罩的宽度
    function shadeWidth(index) {
        // 排他操作
        for (let j = 0; j < upNodes.length; j++) {
            upNodes[j].style.width = '';
        }
        upNodes[index].style.width = '100%';
    }
    // 滚轮事件的回调
    function scrollWheel(event) {
        // 向上或向下的标志变量
        let flag = '';
        // event兼容
        event = event || window.event;
        // chrome ie8
        if (event.wheelDelta) {
            if (event.wheelDelta > 0) {
                flag = 'up';
            } else {
                flag = 'down';
            }
        } else if (event.detail) {
            // firefox
            if (event.detail < 0) {
                flag = 'up';
            } else {
                flag = 'down';
            }
        }
        lastIndex = index;
        if ((lastIndex == 0 && flag == 'up') || (lastIndex == liNodes.length - 1 && flag == 'down')) {
            return;
        }
        switch (flag) {
            case 'up':
                if (index > 0) {
                    index--;
                    move(index);
                }
                break;
            case 'down':
                if (index < liContentNodes.length - 1) {
                    index++;
                    move(index);
                }
                break;
        }
    }
    // 音频的逻辑
    musicNode.onclick = function () {
        if (audioNode.paused) {
            // 播放音频
            audioNode.play();
            this.style.backgroundImage = 'url(./img/musicon.gif)';
        } else {
            // 暂停音频
            audioNode.pause();
            this.style.backgroundImage = 'url(./img/musicoff.gif)';
        }
    }
    arrowPosition(0);
    // 绑定事件监听 切换页面
    for (let i = 0; i < liNodes.length; i++) {
        liNodes[i].index = i;
        broadsideLiNodes[i].index = i;
        // 添加nav点击事件
        liNodes[i].onclick = function () {
            move(this.index);
            // 同步滚轮事件的index
            index = this.index;
            // 同步出入场动画
            lastIndex = this.index;
        }
        // 添加侧边导航点击事件
        broadsideLiNodes[i].onclick = function () {
            move(this.index);
            // 同步滚轮事件的index
            index = this.index;
            // 同步出入场动画
            lastIndex = this.index;
        }
    }
    // 封装小圆点点击变色函数
    function broadsideColor(index) {
        for (let j = 0; j < broadsideLiNodes.length; j++) {
            // 所有li移除active类名
            broadsideLiNodes[j].className = '';
        }
        broadsideLiNodes[index].className = 'active';
    }
    // 为每一个li设置高度
    for (let i = 0; i < liContentNodes.length; i++) {
        liContentNodes[i].style.height = document.documentElement.clientHeight - headerNode.offsetHeight + 'px';
    }
    // 绑定滚轮事件
    // chrome ie8
    document.addEventListener('mousewheel', function (event) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            scrollWheel(event);
        }, 200);
    });
    // firefox
    document.addEventListener('DOMMouseScroll', function (event) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            scrollWheel(event);
        }, 200);
    });
    // addElement函数
    function addElement(domNode) {
        // 获取自定义属性
        let dataSrc = domNode.dataset.src;
        // 设置偏移量
        let width = domNode.offsetWidth / 2;
        let height = domNode.offsetHeight / 2;
        // 拼装节点
        for (let i = 0; i < 4; i++) {
            let liNode = document.createElement('li');
            // 相当于document.createElement('img');
            let imgNode = new Image();
            liNode.style.width = width + 'px';
            liNode.style.height = height + 'px';
            imgNode.src = dataSrc;
            liNode.appendChild(imgNode);
            domNode.appendChild(liNode);
            imgNode.style.top = -Math.floor(i / 2) * height + 'px';
            imgNode.style.left = -width * (i % 2) + 'px';
        }
        // 获取ul中img节点  在加载节点以后获取 用传过来的dom对象获取
        let imgNodes = domNode.querySelectorAll('.content .list > li .about .about3 .item ul li img');
        // 为dom绑定移入移出事件
        domNode.onmouseenter = function () {
            imgNodes[0].style.top = height + 'px';
            imgNodes[1].style.left = -2 * width + 'px';
            imgNodes[2].style.left = width + 'px';
            imgNodes[3].style.top = -2 * height + 'px';
        }
        domNode.onmouseleave = function () {
            imgNodes[0].style.top = 0;
            imgNodes[1].style.left = -width + 'px';
            imgNodes[2].style.left = 0;
            imgNodes[3].style.top = -height + 'px';
        }

    }
    // 第四屏逻辑
    for (let i = 0; i < picUlNodes.length; i++) {
        // 为每一个ul添加节点
        addElement(picUlNodes[i]);
    }
    // 第二屏逻辑
    // 设置back的位置
    for (let i = 0; i < backNodes.length; i++) {
        backNodes[i].style.backgroundPosition = -(i % 4) * 120 + 'px ' + -Math.floor(i / 4) * 132 + 'px';
        itemNodes[i].style.transition = 'transform 1s ' + (i + 1) * 0.05 + 's';
    }
    // 首屏逻辑
    // 首屏轮播函数
    function homeTransform(index) {
        for (let j = 0; j < homeIconLiNodes.length; j++) {
            homeIconLiNodes[j].className = '';
        }
        homeIconLiNodes[index].className = 'active';
        // 判断点击的index是否在oldIndex的方向
        if (oldIndex < index || (oldIndex == 3 && index == 0)) {
            // 去下一张
            homeLiNodes[oldIndex].className = 'leftHide';
            homeLiNodes[index].className = 'rightShow';
        } else if (oldIndex > index) {
            homeLiNodes[index].className = 'leftShow';
            homeLiNodes[oldIndex].className = 'rightHide';
        }
        oldIndex = index;
        autoIndex = index;
    }
    // 给小圆点绑定点击事件
    for (let i = 0; i < homeIconLiNodes.length; i++) {
        homeIconLiNodes[i].index = i;
        homeIconLiNodes[i].onclick = function () {
            homeTransform(this.index);
        }
    }
    // 自动轮播
    let homeTimer = null;
    // 定时器
    function autoMove() {
        homeTimer = setInterval(() => {
            autoIndex++;
            if (autoIndex > homeLiNodes.length - 1) {
                autoIndex = 0;
            }
            homeTransform(autoIndex);
        }, 3000);
    }

    // 移入事件
    homeNode.onmouseenter = function () {
        clearInterval(homeTimer);
    };
    // 移出事件
    homeNode.onmouseleave = function () {
        autoMove();
    }
}