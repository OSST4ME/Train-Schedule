
var config = {
  apiKey: "AIzaSyCrrUbZr8M16TpR0FOdNlHOTrNhDzCAr9o",
  authDomain: "train-b237e.firebaseapp.com",
  databaseURL: "https://train-b237e.firebaseio.com",
  projectId: "train-b237e",
  storageBucket: "train-b237e.appspot.com",
  messagingSenderId: "522946139870"
};

firebase.initializeApp(config);

var trainData = firebase.database();

$("#add-train-btn").on("click", function() {

var trainName = $("#train-name-input").val().trim();
var destination = $("#destination-input").val().trim();
var frequency = $("#frequency-input").val().trim();
var firstTrain = $("#first-train-input").val().trim();


var newTrain = {

  name: trainName,
  destination: destination,
  frequency: frequency,
  firstTrain: firstTrain
  
};

trainData.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.frequency);
console.log(newTrain.firstTrain);


alert("Train successfully added");

$("#train-name-input").val("");
$("#destination-input").val("");
$("#frequency-input").val("");
$("#first-train-input").val("");


return false;
});

trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;
    
    var timeArr = tFirstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;
    
    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {

      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;
      
      tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
      console.log("tMinutes:", tMinutes);
      console.log("tArrival:", tArrival);

      $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
        tFrequency + "</td><td>" + tFirstTrain + "</td><td>" + tArrival); 
});

