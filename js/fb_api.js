var NAME = "";

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        $("#login").hide();
        profile = "<div class=\"row\" id=\"logout\"><div class=\"col s12 m10 offset-m1 l8 offset-l2\"><div class=\"card blue-grey darken-1\"><div class=\"card-content white-text\"><span class=\"card-title\" id=\"UserName\"></span><p>Profile Information goes here</p></div><div class=\"card-action\"><a class=\"waves-effect waves-light blue darken-2 btn\" onclick=\"IWantToLogout();\"><i class=\"fa fa-facebook-official\"></i>&nbsp;&nbsp;facebook logout</a></div></div></div></div>";
        key = response.authResponse.accessToken;
        $("main")[0].innerHTML = profile;
        FB.api('/me', function(response) {
            $('#UserName')[0].innerHTML = response.name;
            $("ul li:nth-child(3)")[0].innerHTML = "<li><a href=\"#\">"+response.name+"</a></li>";
            NAME = response.name;
            getPost();
        });
    }
}

function getPost()
{
    FB.api('/me/posts',function (response) {
		var data=response.data
		var ans=[];
		for (var i=0 ;i < data.length;i++){
			var str="";
			if('story' in data[i])str+=data[i].story;
			if ('message' in data[i])str+=data[i].message;
    $.post("http://140.113.195.211:9090/play",{name : NAME, text : str});
			//tmp.message=str;
			//tmp.created_time=data[i].created_time;
			ans.push(str);
		}
	//console.log(ans);
    //$.post("http://140.113.195.211:9090/play",{text : ans});
    return ans;
    });
}
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            statusChangeCallback(response);
        }
        else {
            FB.login(function(response) {
                statusChangeCallback(response);
            }, {scope: 'email,public_profile,user_posts', return_scopes: true});
        }
    });
}

function IWantToLogout() {
    FB.logout(function(response) {
        $("#logout").hide();
        profile = "<div class=\"row\" id=\"login\"><div class=\"col s12 m10 offset-m1 l8 offset-l2\"><div class=\"card blue-grey darken-1\"><div class=\"card-image\"><img src=\"http://2.bp.blogspot.com/-7ywyKE1iKaA/Tyfbcob7R3I/AAAAAAAAIwQ/h83RQebeEJ8/s1600/2012-01-29_22.15.39.png\"><span class=\"card-title\">Try it!</span></div><div class=\"card-content white-text\"><p>想體驗一下嗎?</p></div><div class=\"card-action\"><a class=\"waves-effect waves-light blue darken-2 btn\" onclick=\"checkLoginState();\"><i class=\"fa fa-facebook-official\"></i>&nbsp;&nbsp;facebook login</a></div></div></div></div>";
        $("main")[0].innerHTML = profile;
        $("ul li:nth-child(3)")[0].innerHTML = "<li><a href=\"#\">Login</a></li>";
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1014922658562861',
        cookie     : true,  // enable cookies to allow the server to access
        // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.7' // use graph api version 2.5
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

/*
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
*/

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.7&appId=1014922658562861";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
