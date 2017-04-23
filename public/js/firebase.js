(function() {
let config = {
   apiKey: ' AIzaSyAjwkHGCRF5APcvJlI84UYI5POfYI7rvuA',
   authDomain: 'unlucky-geniuses.firebaseapp.com',
   databaseURL: 'https://unlucky-geniuses.firebaseio.com',
   projectId: 'unlucky-geniuses',
   storageBucket: 'unlucky-geniuses.appspot.com',
   messagingSenderId: '239442017860',
};
firebase.initializeApp(config);

const preObject = document.getElementById('object');

const dbRefObject = firebase.database().ref().child('object');
// sync object changes

dbRefObject.on('value', (snap) => console.log(snap.val()));
}());
