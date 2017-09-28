  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCaXQf3nxouJPwAqVsq5B7fTV_UukTklQU",
    authDomain: "trainscheduler-efd95.firebaseapp.com",
    databaseURL: "https://trainscheduler-efd95.firebaseio.com",
    projectId: "trainscheduler-efd95",
    storageBucket: "trainscheduler-efd95.appspot.com",
    messagingSenderId: "224848766108"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submit-button").on("click", function(event){
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: trainFrequency
  };

  database.ref().push(newTrain);

  alert("New Train successfully added");

  $("train-name-input").val("");
  $("destination").val("");
  $("first-train-input").val("");
  $("frequency-input").val("")

});

database.ref().on("child_added", function(childSnapshot, prevChildKey){
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;


var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

var currentTime = moment();

var nextArrival = moment().diff(moment(firstTimeConverted), "minutes");

var remainder = nextArrival % frequency;

var minutesTillTrain = frequency - remainder;

var nextTrain = moment().add(minutesTillTrain, "minutes");

  var tableRow = $("<tr>");
  var trainDisplay = $("<td>").text(trainName);
  var destinationDisplay = $("<td>").text(destination);
  var frequencyDisplay = $("<td>").text((frequency) + " min");
  var arrivalDisplay = $("<td>").text(moment(nextTrain).format("h:mm a"));
  var minutesDisplay = $("<td>").text(minutesTillTrain + " min");

  tableRow.append(trainDisplay);
  tableRow.append(destinationDisplay);
  tableRow.append(frequencyDisplay);
  tableRow.append(arrivalDisplay);
  tableRow.append(minutesDisplay)

  $("tbody").append(tableRow);

});
