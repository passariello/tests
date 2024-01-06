/* Copyright (c) 2024 Dario Passariello */

	var t;

	// DEFINE THE STATE CONTAINER
	state.custom = {}
	
	// CREATE A NAME FOR THE USER
	state.custom.name = !dphelper.storage.get("name") ? "Human" : dphelper.storage.get("name")
	
	// CREATE A STATE FUNCTION 000	
	state.custom.fun000 = () => alert(state.custom.name)

	// CREATE A STATE FUNCTION 001
	state.custom.fun001 = () => {
		$("main").css({"background":"gray"})
	}
	
	// CREATE A STATE FUNCTION 002
	state.custom.fun002 = () => {
		const el = $("main");	
		if(!t) !el.css({"background-color":"rgb(255, 0, 0)"})
		if(el.css("background-color") === "rgb(255, 0, 0)" || el.css("background-color") === "rgb(128, 128, 128)") el.css({"background-color":"rgb(0, 0, 255)"})
		else if(el.css("background-color") === "rgb(0, 0, 255)") el.css({"background-color":"rgb(255, 0, 0)"})
		t = 1
		return
	}

	////////////////////////////////////////////////////////
	// ADD TEXT AFTER FULL LOAD	

	$(window).ready(()=>{ 
		$("#yourName").text(state.custom.name)
		$(".year").text(dphelper.date.year()) // add year on footer
		dphelper.disable.select('body') // disable select on body
		dphelper.disable.spellCheck(1000) // disable spellCheck after 1 sec
		dphelper.disable.rightClick('html') // disable right click		
		dform()
		$("html").fadeIn(1000)		
		return
	})

	////////////////////////////////////////////////////
	// TEST AN ALERT
	
	// This open an custom alert and show the mane for state.
	const openLayerAlert = () => {
		alert("I am an Alert and you are " + state.custom.name)
		return
	}

	////////////////////////////////////////////////////
	// TEST A MESSAGE
	
	const openLayerMessage = () => {
		message("I am an Alert!")
		return
	}
	
	////////////////////////////////////////////////////
	// TEST A PROMPT BOX
	
	const openLayerPrompt = () => {
		prompt(
		"Hello, who are you?",
		()=>{
				const name = $("#input___prompt").val()
				state.custom.name = name
				$("#yourName").text(name)
				dphelper.storage.set("name",name)
				alert("Hello " + name)
			}
		)
		return
	}

	////////////////////////////////////////////////////
	// TEST A CONFIRMATION BOX
	
	const openLayerConfirm = () => {
		confirm(
		"I am an Alert!",
		() => alert("yes"),
		() => alert("no")
		)
		return
	}
	
	////////////////////////////////////////////////////
	// SET STATE AND TRIGGER AN EVENT 
	
	const afterState = () => {
		state.custom.triggerAnEvent = "event";	
		dphelper.dispatch.set("myEvent",{
			detail: { "hello" : "world" }
		})	
		return
	}
	
	////////////////////////////////////////////////////
	// LISTEN AN EVENTUALLY CHANGE OF AN EVENT 
	
	dphelper.dispatch.listen("myEvent", event => {
		console.log(`the event '${event.type}' happen `, event.detail )
		console.log("I am going to recall other function after event")
		state.custom.fun000()
		return
	})
	
	////////////////////////////////////////////////////
	// TEST ALL FUNCTION OF LAYERPRO
	
	const openFullLayer = () => {
		layerpro.popup.open({
		id: 'IamAnExample',
		body: "IamAnExample and you can put a component also!",
		name: "IamAnExample",
		icon: "&#9998;",
		// source:"",
		width: 500,
		height: 450,
		iconize:true,
		maximize:true,
		dockable:true,
		close: true,
		//isMaximize: true,
		// raised:true,
		movable: true,
		resizable:true,
		//store: true,
		// top:"",
		// left:"",
		// right:"",
		// bottom:"",
		// fadeIn:"",
		// fadeOut:"",
		// minWidth:"",
		// minHeight:"",
		})
		return
	}
	
	////////////////////////////////////////////////////
	// GO FULLSCREEN (with toggle)
	
	const goFullScreen = el => {
		var elem = document.querySelector(el)
		if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {  
		  if (elem.requestFullscreen) {
			elem.requestFullscreen()
		  } else if (elem.mozRequestFullScreen) { /* Firefox */
			elem.mozRequestFullScreen()
		  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
			elem.webkitRequestFullscreen()
		  } else if (elem.msRequestFullscreen) { /* IE/Edge */
			elem.msRequestFullscreen()
		  }
		} else {
		  if (document.exitFullscreen) {
			document.exitFullscreen()
		  } else if (document.mozCancelFullScreen) { /* Firefox */
			document.mozCancelFullScreen()
		  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
			document.webkitExitFullscreen()
		  } else if (document.msExitFullscreen) { /* IE/Edge */
			document.msExitFullscreen()
		  }
		}
		return
	}	
	
	////////////////////////////////////////////////////
	// DATA SERIALIZATION
	
	const serialize = () => {		
		const data = dphelper.form.serialize("#fdata")
		state.custom.form = data
		console.log("You can send this to the server via API",data)
		alert("Data are serialized and are in the state. <br/>Look the console to see the json.<br>You can send the json via API to the server.")
		return
	}
	
	////////////////////////////////////////////////////
	// POPULATE THE FORM WITH CUSTOM RANDOM DATA
	
	const dform = () => {
		// ready in next dphelper 0.5.1 (at this time 0.5.0
		// dphelper.form.table(size = [7, 24], id, elem)
		var 
		v = "",
		ro = 24, // rows
		co = 7 // columns
		
		v = "<form id='fdata'>"
		v += "<div class='table'>";		
		v += "<div class='title'>"
		for(var t = 1;t<=co; t++){ v += `<span>${t}</span>` }
		v += "</div>"
		for(var r = 1; r<=ro; r++){
			v += `<div class='row'><span>${r}</span>`
			for(var c = 1;c<=co; c++){
				v += `<input name='data[${c}][${r}]' tabindex='${c.toString().padStart(2, '0')}${r.toString().padStart(2, '0')}' type='number' onclick="this.select()" value='${Math.floor(Math.random() * 100)}' title='${c} to ${r}' />`
			}
			v += "</div>"
		}			
		v += "</div>"
		v += "</form>"
		
		$("aside>div").html(v)
		return			
	}
	
