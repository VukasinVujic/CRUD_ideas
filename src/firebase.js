import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAi4LtS3rmovmhsv6yzD4C3x4mljJaOV7M",
  authDomain: "new-project-ideas.firebaseapp.com",
  databaseURL: "https://new-project-ideas.firebaseio.com",
  projectId: "new-project-ideas",
  storageBucket: "new-project-ideas.appspot.com",
  messagingSenderId: "438728399133",
  appId: "1:438728399133:web:03ace6988e9f4b9b33e9f4",
};
// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();
