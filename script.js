$(function() {
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
    var p5jsTutorials = coding.child('P5JS');

    gitTutorials.once("value", gotGitData, errData);
    p5jsTutorials.once("value", gotP5Data, errData);

    var acc = document.getElementsByClassName("accordion");
    var z;

    for (z = 0; z < acc.length; z++) {
        acc[z].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            }
            else {
                panel.style.display = "block";
            }
        });
    }

    function gotGitData(data) {
        let newData = data.val();
        // Grab the keys to iterate over the comments
        var keys = Object.keys(newData);

        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            let dataPiece = newData[key];
            let title = dataPiece.Title;
            var gitLink;
            var gitLinkElement;
            var isThereALink =  false;
            if (dataPiece.Link) {
                gitLink = dataPiece.Link;
                gitLinkElement = $('<iframe></iframe>');
                gitLinkElement.attr('src', gitLink);
                gitLinkElement.css('width', '100%').css('height', '50%');
                isThereALink = true;
            }
            var isThereALinkNotOwned = false;
            var gitLinkElementNotOwned;
            if (dataPiece.LinkNotOwned) {
                gitLinkElementNotOwned = $('<a></a>');
                gitLinkElementNotOwned.attr('href', dataPiece.LinkNotOwned);
                gitLinkElementNotOwned.text(dataPiece.LinkNotOwned)
                isThereALinkNotOwned = true;
            }

            let gitPanelClass = $('.gitPanel');
            gitPanelClass.css('width', '100%').css('height', '100%');
            var isThereInfo = false;
            var gitInfoElement;
            if (dataPiece.Info) {
                gitInfoElement = $('<p></p>');
                gitInfoElement.html(dataPiece.Info);
                isThereInfo = true;
            }
            let titleElement = $('<h1></h1>');
            titleElement.html(title);
            titleElement.css('text-align', 'center');
            gitPanelClass.append(titleElement);
            
            if (isThereALink) {
                gitPanelClass.append(gitLinkElement);
                isThereALink = false;
            }
            
            if (isThereALinkNotOwned) {
                gitPanelClass.append(gitLinkElementNotOwned);
                isThereALinkNotOwned = false;
            }
            
            if (isThereInfo) {
                gitPanelClass.append(gitInfoElement);
                isThereInfo = false;
            }
        }
    }
    
    function gotP5Data(data) {
        let newData = data.val();
        // Grab the keys to iterate over the comments
        var keys = Object.keys(newData);

        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            let dataPiece = newData[key];
            let title = dataPiece.Title;
            var p5Link;
            var p5LinkElement;
            var isThereALink =  false;
            if (dataPiece.Link) {
                p5Link = dataPiece.Link;
                p5LinkElement = $('<iframe></iframe>');
                p5LinkElement.attr('src', p5Link);
                p5LinkElement.css('width', '100%').css('height', '50%');
                isThereALink = true;
            }
            
            var isThereALinkNotOwned = false;
            var p5LinkElementNotOwned;
            if (dataPiece.LinkNotOwned) {
                p5LinkElementNotOwned = $('<a></a>');
                p5LinkElementNotOwned.attr('href', dataPiece.LinkNotOwned);
                p5LinkElementNotOwned.text(dataPiece.LinkNotOwned)
                isThereALinkNotOwned = true;
            }

            let p5PanelClass = $('.p5Panel');
            p5PanelClass.css('width', '100%').css('height', '100%');
            var isThereInfo = false;
            var p5InfoElement;
            if (dataPiece.Info) {
                p5InfoElement = $('<p></p>');
                p5InfoElement.html(dataPiece.Info);
                isThereInfo = true;
            }
            let titleElement = $('<h1></h1>');
            titleElement.html(title);
            titleElement.css('text-align', 'center');
            p5PanelClass.append(titleElement);
            
            if (isThereALink) {
                p5PanelClass.append(p5LinkElement);
                isThereALink = false;
            }
            
            if (isThereALinkNotOwned) {
                p5PanelClass.append(p5LinkElementNotOwned);
                isThereALinkNotOwned = false;
            }
            
            if (isThereInfo) {
                p5PanelClass.append(p5InfoElement);
                isThereInfo = false;
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
