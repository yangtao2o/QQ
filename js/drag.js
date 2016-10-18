//获取className
function getByClass(clsName,parent){
  	var oParent=parent?document.getElementById(parent):document,
      	eles=[],
      	elements=oParent.getElementsByTagName('*');

  	for(var i=0,l=elements.length;i<l;i++){
    	if(elements[i].className==clsName){
      		eles.push(elements[i]);
    	}
  	}
  	return eles;
}
//加载
function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
addLoadEvent(drag);
addLoadEvent(clickLogin);
addLoadEvent(login);
//点击登录
function clickLogin() {
	var clickLog = getId("clickLogin");
	var oDrag = getId("loginPanel");
	clickLog.onclick = function() {
		clickLog.style.display = "none";
		oDrag.style.display = "block";
		oDrag.style.left = "38%";
		oDrag.style.top = "20%";
	}
}
//getID
function getId(id) {
	return document.getElementById(id);
}
//拖动函数
function drag(){
   	var oTitle=getByClass("loginPanel")[0];
   	// 拖曳
   	oTitle.onmousedown=fnDown;
   	//关闭界面
   	var clickLog = getId("clickLogin");
   	var oClose = getId("ui_boxyClose");
   	var oDrag = getId("loginPanel");
   	oClose.onclick = function() {
       oDrag.style.display = "none";
       clickLog.style.display = "block";
   	}
   	//切换状态
   	var loginState = getId("loginState");
   	var loginStateShow = getId("loginStateShow");
   	var stateList = getId("loginStatePanel");
   	var lis = stateList.getElementsByTagName("li");
   	var stateTxt = getId("login2qq_state_txt");
   	loginState.onclick = function(event) {
   	   stateList.style.display = "block";
   	   event = event || window.event;
   			if(event.stopPropagation) {
   				event.stopPropagation();
   			} else {
   				event.cancelBubble = true;
   			}
   	}
   	//鼠标滑动、离开和点击
   	for(var i=0,len=lis.length; i<len; i++) {
   		lis[i].onmouseover = function() {
   			this.style.color = "#fff";
   			this.style.background = "#57f";
   		}
   		lis[i].onmouseout = function() {
   			this.style.color = "#000";
   			this.style.background = "#fff";
   		}
   		lis[i].onclick = function(event) {
   			event = event || window.event;
   			if(event.stopPropagation) {
   				event.stopPropagation();
   			} else {
   				event.cancelBubble = true;
   			}
   			id = this.id;
   			stateList.style.display = "none";
   			loginStateShow.className = "";
   			loginStateShow.className = "login-state-show " + id;
   			stateTxt.innerHTML = getByClass("stateSelect_text", id)[0].innerHTML;
   		}
   	}
   	//鼠标在任何地方点击，隐藏状态栏
   	document.onclick = function() {
   		stateList.style.display = "none";
   	}
}

function fnDown(event) {
	event = event || window.event;
	var oDrag = getId("loginPanel");
	// 光标按下时光标和面板之间的距离
	var disX = event.clientX - oDrag.offsetLeft;
	var disY = event.clientY - oDrag.offsetTop;
	//移动
	document.onmousemove = function(event) {
		event = event || window.event;
		fnMove(event, disX, disY);
	}
	//释放鼠标
	document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
	}
}

function fnMove(e, posX, posY) {
	var oDrag = getId("loginPanel");
	//光标按下拖动后光标回到之前在面板上的位置
	var lt = e.clientX - posX;
	var rt = e.clientY - posY;

	var winW = document.documentElement.clientWidth || document.body.clientWidth;
	var winH = document.documentElement.clientHeight || document.body.clientHeight;
	
	var maxW = winW - oDrag.offsetWidth - 10;
	var maxH = winH - oDrag.offsetHeight;
	
	if(lt < 0) {
		lt = 0;
	} else if(lt > maxW) {
		lt = maxW;
	}
	if(rt < 0) {
		rt = 10;
	} else if(rt > maxH) {
		rt = maxH;
	}
	oDrag.style.left = lt + "px";
	oDrag.style.top = rt + "px";
}

//登录
function login() {
	var oDrag = getId("loginPanel");
	var inputs = getByClass("inputs")[0];
	var signInput = inputs.getElementsByTagName("input");
	var aBtn = getId("btn");
	aBtn.onclick = function() {
		if(signInput[0].value != "" && signInput[1].value != "") {
			alert("恭喜你，登录成功！");
			setTimeout(function() {
				oDrag.style.display = "none";
			},2000);
		} else {
			alert("账户或密码不能为空！");
		}
	}
}









































