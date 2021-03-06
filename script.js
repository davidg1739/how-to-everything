$(function() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    console.log(page);

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
    var gitTutorials = coding.child('Git-Github');
    var p5jsTutorials = coding.child('P5JS');
    var htmlTutorials = coding.child('HTML');
    var physicsTutorials = science.child('Physics');

    physicsTutorials.once("value", gotPhysicsData, errData);

    gitTutorials.once("value", gotGitData, errData);
    p5jsTutorials.once("value", gotP5Data, errData);
    htmlTutorials.once("value", gotHtmlData, errData);

    cooking.once("value", gotCookingData, errData);

    $('.submitInputsToDatabase').click(function() {
        let categoryPicked = $('.categoryChoice').val().split(',');
        let titlePicked = $('.titleInput').val();
        let infoPicked = $('.infoInput').val();
        let linkPicked = $('.linkInput').val();
        let linkNotOwnedPicked = $('.linkNotOwnedInput').val();
        let directionInputText = $('.directionInput').val()
        let ingredientInputText = $('.ingredientInput').val()
        if (categoryPicked[1]) {
            if (categoryPicked[1] == ' P5JS') {
                let data = {
                    Title: titlePicked,
                    Info: infoPicked,
                    Link: linkPicked,
                    LinkNotOwned: linkNotOwnedPicked
                };
                
                p5jsTutorials.push(data);
            }
            if (categoryPicked[1] == ' HTML') {
                let data = {
                    Title: titlePicked,
                    Info: infoPicked,
                    Link: linkPicked,
                    LinkNotOwned: linkNotOwnedPicked
                };
                htmlTutorials.push(data);
            }
            if (categoryPicked[1] == ' Git-Github') {
                let data = {
                    Title: titlePicked,
                    Info: infoPicked,
                    Link: linkPicked,
                    LinkNotOwned: linkNotOwnedPicked
                };
                gitTutorials.push(data);
            }
            if (categoryPicked[1] == 'Physics') {
                let data = {
                    Title: titlePicked,
                    Info: infoPicked,
                    Link: linkPicked,
                    LinkNotOwned: linkNotOwnedPicked
                };
                physicsTutorials.push(data);
            }
        }
        else {
            let dirList = directionInputText.split(',');
            let ingList = ingredientInputText.split(',');
            var dirs = {};
            var ings = {}
            for (let s = 1; s <= dirList.length; s++) {
                dirs['Step ' + s] = dirList[s-1];
            }
            for (let x = 1; x <= ingList.length; x++) {
                dirs['Ingredient ' + x] = dirList[x-1];
            }
            let data = {
                Title: titlePicked,
                Info: infoPicked,
                Link: linkPicked,
                LinkNotOwned: linkNotOwnedPicked,
                Directions: dirs,
                Ingredients: ings
            };
            cooking.push(data);
        }
    });

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


    if (page.toString() == 'cooking.html') {
        $('.content').on('click', '.accordion', function() {
            //do something
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
            var isThereALink = false;
            if (dataPiece.Link) {
                gitLink = dataPiece.Link;
                gitLinkElement = $('<iframe></iframe>');
                gitLinkElement.attr('src', gitLink);
                gitLinkElement.css('width', '100%').css('height', '50%');
                if (dataPiece.Link == '' || dataPiece.Link == ' ') {
                    isThereALink = false
                }
                else {
                    isThereALink = true;
                }
            }
            var isThereALinkNotOwned = false;
            var gitLinkElementNotOwned;
            if (dataPiece.LinkNotOwned) {
                gitLinkElementNotOwned = $('<a></a>');
                gitLinkElementNotOwned.attr('href', dataPiece.LinkNotOwned);
                gitLinkElementNotOwned.text(dataPiece.LinkNotOwned)
                if (dataPiece.LinkNotOwned == '' || dataPiece.LinkNotOwned == ' ') {
                    isThereALinkNotOwned = false
                }
                else {
                    isThereALinkNotOwned = true;
                }
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
            var isThereALink = false;
            if (dataPiece.Link) {
                p5Link = dataPiece.Link;
                p5LinkElement = $('<iframe></iframe>');
                p5LinkElement.attr('src', p5Link);
                p5LinkElement.css('width', '100%').css('height', '50%');
                if (dataPiece.Link == '' || dataPiece.Link == ' ') {
                    isThereALink = false
                }
                else {
                    isThereALink = true;
                }
            }

            var isThereALinkNotOwned = false;
            var p5LinkElementNotOwned;
            if (dataPiece.LinkNotOwned) {
                p5LinkElementNotOwned = $('<a></a>');
                p5LinkElementNotOwned.attr('href', dataPiece.LinkNotOwned);
                p5LinkElementNotOwned.text(dataPiece.LinkNotOwned)
                if (dataPiece.LinkNotOwned == '' || dataPiece.LinkNotOwned == ' ') {
                    isThereALinkNotOwned = false;
                }
                else {
                    isThereALinkNotOwned = true;
                }
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

    function gotHtmlData(data) {
        let newData = data.val();
        // Grab the keys to iterate over the comments
        var keys = Object.keys(newData);

        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            let dataPiece = newData[key];
            let title = dataPiece.Title;
            var htmlLink;
            var htmlLinkElement;
            var isThereALink = false;
            if (dataPiece.Link) {
                htmlLink = dataPiece.Link;
                htmlLinkElement = $('<iframe></iframe>');
                htmlLinkElement.attr('src', htmlLink);
                htmlLinkElement.css('width', '100%').css('height', '50%');
                if (dataPiece.Link == '' || dataPiece.Link == ' ') {
                    isThereALink = false
                }
                else {
                    isThereALink = true;
                }
            }

            var isThereALinkNotOwned = false;
            var htmlLinkElementNotOwned;
            if (dataPiece.LinkNotOwned) {
                htmlLinkElementNotOwned = $('<a></a>');
                htmlLinkElementNotOwned.attr('href', dataPiece.LinkNotOwned);
                htmlLinkElementNotOwned.text(dataPiece.LinkNotOwned)
                if (dataPiece.LinkNotOwned == '' || dataPiece.LinkNotOwned == ' ') {
                    isThereALinkNotOwned = false;
                }
                else {
                    isThereALinkNotOwned = true;
                }
            }

            let htmlPanelClass = $('.htmlPanel');
            htmlPanelClass.css('width', '100%').css('height', '100%');
            var isThereInfo = false;
            var htmlInfoElement;
            if (dataPiece.Info) {
                htmlInfoElement = $('<p></p>');
                htmlInfoElement.html(dataPiece.Info);
                isThereInfo = true;
            }
            let titleElement = $('<h1></h1>');
            titleElement.html(title);
            titleElement.css('text-align', 'center');
            htmlPanelClass.append(titleElement);

            if (isThereALink) {
                htmlPanelClass.append(htmlLinkElement);
                isThereALink = false;
            }

            if (isThereALinkNotOwned) {
                htmlPanelClass.append(htmlLinkElementNotOwned);
                isThereALinkNotOwned = false;
            }

            if (isThereInfo) {
                htmlPanelClass.append(htmlInfoElement);
                isThereInfo = false;
            }
        }
    }

    function gotPhysicsData(data) {
        let newData = data.val();
        // Grab the keys to iterate over the comments
        var keys = Object.keys(newData);

        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            let dataPiece = newData[key];
            let title = dataPiece.Title;
            var physicsLink;
            var physicsLinkElement;
            var isThereALink = false;
            if (dataPiece.Link) {
                physicsLink = dataPiece.Link;
                physicsLinkElement = $('<iframe></iframe>');
                physicsLinkElement.attr('src', physicsLink);
                physicsLinkElement.css('width', '100%').css('height', '50%');
                if (dataPiece.Link == '' || dataPiece.Link == ' ') {
                    isThereALink = false
                }
                else {
                    isThereALink = true;
                }
            }

            var isThereALinkNotOwned = false;
            var physicsLinkElementNotOwned;
            if (dataPiece.LinkNotOwned) {
                physicsLinkElementNotOwned = $('<a></a>');
                physicsLinkElementNotOwned.attr('href', dataPiece.LinkNotOwned);
                physicsLinkElementNotOwned.text(dataPiece.LinkNotOwned);
                if (dataPiece.LinkNotOwned == '' || dataPiece.LinkNotOwned == ' ') {
                    isThereALinkNotOwned = false;
                }
                else {
                    isThereALinkNotOwned = true;
                }
            }

            let physicsPanelClass = $('.physicsPanel');
            physicsPanelClass.css('width', '100%').css('height', '100%');
            var isThereInfo = false;
            var physicsInfoElement;
            if (dataPiece.Info) {
                physicsInfoElement = $('<p></p>');
                physicsInfoElement.html(dataPiece.Info);
                isThereInfo = true;
            }
            let titleElement = $('<h1></h1>');
            titleElement.html(title);
            titleElement.css('text-align', 'center');
            physicsPanelClass.append(titleElement);

            if (isThereALink) {
                physicsPanelClass.append(physicsLinkElement);
                isThereALink = false;
            }

            if (isThereALinkNotOwned) {
                physicsPanelClass.append(physicsLinkElementNotOwned);
                isThereALinkNotOwned = false;
            }

            if (isThereInfo) {
                physicsPanelClass.append(physicsInfoElement);
                isThereInfo = false;
            }
        }
    }

    function gotCookingData(data) {
        if (page.toString() == 'cooking.html') {
            let newData = data.val();
            // Grab the keys to iterate over the comments
            var keys = Object.keys(newData);

            for (let i = 0; i < keys.length; i++) {
                var key = keys[i];
                let dataPiece = newData[key];
                let title = dataPiece.Title;
                var cookingLink;
                var cookingLinkElement;
                var isThereALink = false;
                if (dataPiece.Link) {
                    cookingLink = dataPiece.Link;
                    cookingLinkElement = $('<iframe></iframe>');
                    cookingLinkElement.attr('src', cookingLink);
                    cookingLinkElement.css('width', '100%').css('height', '50%');
                    if (dataPiece.Link == '' || dataPiece.Link == ' ') {
                        isThereALink = false
                    }
                    else {
                        isThereALink = true;
                    }
                }

                var isThereALinkNotOwned = false;
                var cookingLinkElementNotOwned;
                if (dataPiece.LinkNotOwned) {
                    cookingLinkElementNotOwned = $('<a></a>');
                    cookingLinkElementNotOwned.attr('href', dataPiece.LinkNotOwned);
                    cookingLinkElementNotOwned.text(dataPiece.LinkNotOwned);
                    if (dataPiece.LinkNotOwned == '' || dataPiece.LinkNotOwned == ' ') {
                        isThereALinkNotOwned = false;
                    }
                    else {
                        isThereALinkNotOwned = true;
                    }
                }

                var areThereIngredients = false;
                var ingredientDivElement;
                if (dataPiece.Ingredients) {
                    var ing = dataPiece.Ingredients;
                    var numOfIngredients = Object.keys(ing).length;
                    ingredientDivElement = $('<div></div>');
                    let ingredientTitleElement = $('<h1></h1>');
                    ingredientTitleElement.html('Ingredients:');
                    var orderedIngredientList = $('<ol></ol>');
                    for (let q = 1; q <= numOfIngredients; q++) {
                        let newListItem = $('<li></li>');
                        newListItem.text(ing['Ingredient ' + q]);
                        newListItem.appendTo(orderedIngredientList);

                    }
                    ingredientDivElement.append(ingredientTitleElement);
                    ingredientDivElement.append(orderedIngredientList);
                    areThereIngredients = true;
                }

                var areThereDirections = false;
                var directionDivElement;
                if (dataPiece.Directions) {
                    var directions = dataPiece.Directions;
                    var numOfDirections = Object.keys(directions).length;
                    directionDivElement = $('<div></div>');
                    let directionTitleElement = $('<h1></h1>');
                    directionTitleElement.html('Directions:');
                    var orderedDirectionList = $('<ol></ol>');
                    for (let b = 1; b <= numOfDirections; b++) {
                        let newListItem = $('<li></li>');
                        newListItem.text(directions['Step ' + b]);
                        newListItem.appendTo(orderedDirectionList);

                    }
                    directionDivElement.append(directionTitleElement);
                    directionDivElement.append(orderedDirectionList);
                    areThereDirections = true;
                }

                let tempAcc = $('<buttton class="accordion"></button>');
                let tempSpan = $('<span class="accTitle"></span>');
                tempSpan.html(title);
                $(tempAcc).append(tempSpan);

                let tempPanel = $('<div class="panel"></div>');
                tempPanel.css('width', '100%').css('height', '100%');

                var isThereInfo = false;
                var cookingInfoElement;
                if (dataPiece.Info) {
                    cookingInfoElement = $('<p></p>');
                    cookingInfoElement.html(dataPiece.Info);
                    isThereInfo = true;
                }
                let titleElement = $('<h1></h1>');
                titleElement.html(title);
                titleElement.css('text-align', 'center');
                tempPanel.append(titleElement);

                if (areThereIngredients) {
                    tempPanel.append(ingredientDivElement);
                    areThereIngredients = false;
                }

                if (areThereDirections) {
                    tempPanel.append(directionDivElement);
                    areThereDirections = false;
                }

                if (isThereALink) {
                    tempPanel.append(cookingLinkElement);
                    isThereALink = false;
                }

                if (isThereALinkNotOwned) {
                    tempPanel.append(cookingLinkElementNotOwned);
                    isThereALinkNotOwned = false;
                }

                if (isThereInfo) {
                    tempPanel.append(cookingInfoElement);
                    isThereInfo = false;
                }


                let cookingContentDiv = $('.content');
                $(tempAcc).css('width', '100%').css('height', '100%');

                cookingContentDiv.append('<br><br><br>');
                cookingContentDiv.append(tempAcc);
                cookingContentDiv.append(tempPanel);
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
        window.open('coding.html', '_blank');
    });

    $('.cooking').click(function() {
        window.open('cooking.html', '_blank');
    });

    $('.science').click(function() {
        window.open('science.html', '_blank');
    });
});
