/* Copyright (c) 2024 Dario Passariello */

var t

// DEFINE THE STATE CONTAINER
state.custom = {}

// CREATE A NAME FOR THE USER
state.custom.name = !dphelper.storage.get("name") ? "Human" : dphelper.storage.get("name")

// CREATE A STATE FUNCTION 000
state.custom.fun000 = () => alert(state.custom.name)

// CREATE A STATE FUNCTION 001
state.custom.fun001 = () => {
  $("main").css({ "background": "gray" })
}

// CREATE A STATE FUNCTION 002
state.custom.fun002 = () => {
  const el = $("main")
  if (!t) !el.css({ "background-color": "rgb(255, 0, 0)" })
  if (el.css("background-color") === "rgb(255, 0, 0)" || el.css("background-color") === "rgb(128, 128, 128)") el.css({ "background-color": "rgb(0, 0, 255)" })
  else if (el.css("background-color") === "rgb(0, 0, 255)") el.css({ "background-color": "rgb(255, 0, 0)" })
  t = 1
  return
}

////////////////////////////////////////////////////////
// ADD TEXT AFTER FULL LOAD

$(window).ready(() => {
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
    () => {
      const name = $("#input___prompt").val()
      state.custom.name = name
      $("#yourName").text(name)
      dphelper.storage.set("name", name)
      message("Hello " + name)
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
  state.custom.triggerAnEvent = "event"
  dphelper.dispatch.set("myEvent", { detail: { "hello": "world" } })
  return
}

////////////////////////////////////////////////////
// LISTEN AN EVENTUALLY CHANGE OF AN EVENT

dphelper.dispatch.listen("myEvent", event => {
  console.log(`the event '${event.type}' happen `, event.detail)
  console.log("I am going to recall other function after event")
  state.custom.fun000()
  return
})

////////////////////////////////////////////////////
// TEST ALL FUNCTION OF LAYERPRO

const openFullLayer = () => {
  var randNum = Math.floor(Math.random() * 9999) + 1
  layerpro.popup.open({
	// id: this permit multiple popup (if you put fix number you can open one only with same id)
    id: 'IamAnExample_' + randNum, 
    body: "IamAnExample and you can put a component also!",
    name: "I am An Example popup id " + randNum,
    icon: "&#9998;",
    // source:"",
    width: 500,
    height: 450,
    iconize: true,
    maximize: true,
    dockable: true,
    close: true,
    //isMaximize: true,
    // raised:true,
    movable: true,
    resizable: true,
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
  dphelper.screen.toggle(el)
  return
}

////////////////////////////////////////////////////
// DATA SERIALIZATION

const serialize = () => {
  const data = dphelper.form.serialize("#fdata")
  state.custom.form = data
  console.log("You can send this to the server via API")
  console.log(data)
  // popup
  message("Data are serialized and are in the state. <br/>Look the console to see the json.<br>You can send the json via API to the server.")
  return
}

////////////////////////////////////////////////////
// POPULATE THE FORM WITH CUSTOM RANDOM DATA

const dform = () => {
  // dphelper.form.table is available only from 0.5.2
  dphelper.form.table(size = [7, 24], "fdata", "aside>div")
  return
}
