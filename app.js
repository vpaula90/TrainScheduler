
var config = {
    apiKey: "AIzaSyBU30U23TEXibsxP88LWPgtTtTgvOCCU64",
    authDomain: "trainschedule-f58cf.firebaseapp.com",
    databaseURL: "https://trainschedule-f58cf.firebaseio.com",
    projectId: "trainschedule-f58cf",
    storageBucket: "trainschedule-f58cf.appspot.com",
    messagingSenderId: "76548170422"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var frequency = "";
  var firstTrain = "";



  $("#add-train-btn").on("click", function(event){
      console.log("test");
      event.preventDefault();

      trainName = $("#train-name-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      firstTrain = $("#first-train-input").val().trim();


      database.ref().push({
          Train_Name: trainName,
          Destination: destination,
          Frequency: frequency,
          First_Train: firstTrain,

      })

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#frequency-input").val("");
      $("#first-train-input").val("");


  });


  database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());

      trainName = childSnapshot.val().Train_Name;
      destination = childSnapshot.val().Destination;
      frequency= childSnapshot.val().Frequency;
      firstTrain = childSnapshot.val().First_Train;

    //   conver the inputed time from military time to standard
    //   var timeConverter = moment(firstTrain, "HH:mm").format("h:mm:ss A");
    
    // // variable to hold todays date
    //   var dt = new Date();
    // // pull in the time at this moment
    //   var timeNow = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() 

    // // convert the time to match the standard time
    //   var convertTimeNow = moment(timeNow).format("h:mm:ss A");  
      
    // //   do a difference from the time now and the time entered for the first train
    //   var difference = moment(convertTimeNow).diff(moment(timeConverter), "minutes");

    // //   look at the difference in time and the frequency in which the train comes
    //   var timeLeft = difference % frequency;

    // // Frequency that the train comes minus how many minutes between first train and time now
    //   var timeTilTrain = frequency - timeLeft;

    // //  Setup time until next train in minutes
    //   var nextTrain = moment().add(timeTilTrain, "minutes");

    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain));


var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(moment(nextTrain).format("h:mm A")),
    $("<td>").text(tMinutesTillTrain)


);
    
    $("#train-table > tbody").append(newRow);


  });

