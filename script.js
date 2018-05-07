var c;

function setup() {
    c = getURLParams();
    if (c.id != undefined) {
        return;
    }
    else {
        // let tempLink = $('<a></a>');
        // tempLink.attr('href', '?id=' + userInput);
        // tempLink.html(userInput);
        // let para = $('#content');
    }
}

$(function() {
    console.log(c);
    var database;
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBf9c50Uf0zQTvM7t-MX7ziDmawbqZWYOA",
        authDomain: "how-to-everything-46ae3.firebaseapp.com",
        databaseURL: "https://how-to-everything-46ae3.firebaseio.com",
        projectId: "how-to-everything-46ae3",
        storageBucket: "how-to-everything-46ae3.appspot.com",
        messagingSenderId: "480642201727"
    };
    firebase.initializeApp(config);

    database = firebase.database();
    var coding = database.ref('coding');
    var cooking = database.ref('cooking');
    var science = database.ref('science');
    var gitTutorials = coding.child('Git-Github')

    coding.once("value", gotData, errData);

    var currentPage = document.location;
    var tempText;
    currentPage = currentPage.toString();
    if (currentPage.lastIndexOf('/')) {
        let tempNum = currentPage.lastIndexOf('/');
        let pageLength = currentPage.length;
        tempText = [];
        while (tempNum <= pageLength) {
            tempText.push(currentPage[tempNum]);
            tempNum+=1;
        }
    }
    currentPage = tempText;
    console.log(currentPage);
    
    function gotData(data) {
        if ( == 'index.html' || currentPage = '') {
            return;
        }
        else if (currentPage == 'coding.html') {
            $('.clickableCodeLinks').empty();
            let newData = data.val();
            console.log(newData);
            // Grab the keys to iterate over the comments
            var keys = Object.keys(newData);

            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                let dataPiece = newData[key];
                console.log(dataPiece);
                let param = newData[key].Parameter;
                param = param.toString();
                console.log(param);
                let title = newData[key].Title;
                console.log(title);

                let tempLink = $('<a></a>');
                tempLink.attr('href', '?id=' + param);
                tempLink.html(title);
                console.log(tempLink);
                let tempDiv = $('<div></div>');
                tempDiv.append(tempLink);
                let bigDiv = $('.clickableCodeLinks');
                bigDiv.append(tempDiv);
                console.log(bigDiv);
            }
        }
    }

    function errData(err) {
        console.log('Lost Data!');
        console.log(err);
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            let photo = user.photoURL;

            $(".logOutButton").css('display', 'block');
            $(".logInButton").css('display', 'none');
            $(".userImage").attr('src', photo);
            $('.userImageItem').css('display', 'inline-block');
            $(".userImage").css('border-radius', '50%');
        }
        else {
            // No user is signed in.

            $(".logOutButton").css('display', 'none');
            $(".logInButton").css('display', 'block');
            $(".userImageItem").css('display', 'none');

        }
    });

    function login() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);

    }

    function logout() {
        firebase.auth().signOut();
    }

    $('.logInButton').click(function() {
        login();
    });

    $('.logOutButton').click(function() {
        logout();
    });


    $('.coding').click(function() {
        window.open('coding.html');
    });

    $('.cooking').click(function() {
        window.open('cooking.html');
    });

    $('.science').click(function() {
        window.open('science.html');
    });
});
