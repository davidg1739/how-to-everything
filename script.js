$(function() {
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


    // checkUserStatus(false);

    // function checkUserStatus(buttonPressed) {
    //     function statusChecker(user) {
    //         if (user) {
    //             $('.log').html('Log Out')
    //         }
    //         else {
    //             $('.log').html('Log In')
    //         }
    //         console.log(user);
    //     }

    //     function newLogin(user) {
    //         if (user) {
    //             return false;
    //         }
    //         else {
    //             var provider = new firebase.auth.GoogleAuthProvider();
    //             firebase.auth().signInWithRedirect(provider);
    //         }
    //         console.log(user);
    //     }

    //     console.log(firebase.auth);
    //     var auth = firebase.auth();
    //     if (!buttonPressed) {
    //         auth.onAuthStateChanged(statusChecker());
    //     }
    //     if (butttonPressed) {
    //         auth.onAuthStateChanged(newLogin());
    //     }
    // }

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
