//when signed in
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  //$("#name").text(profile.getName());
  $(".game-div").css("display", "block");
  $(".log-btn").css("display", "none");
}

//sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert("You have been signed out!");
    $(".game-div").css("display", "none");
    $(".log-btn").css("display", "block");
  });
}
