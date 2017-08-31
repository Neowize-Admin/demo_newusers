// demo identifier
var DEMO_NAME = location.host || "local";

// GOOGLE ANALYTICS
try {

    (function() {

        // get google analytics
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        // init and send visit
        ga('create', 'UA-105570970-1', 'auto');
        ga('send', 'pageview');

        // attach ga to global scope
        window.ga = ga;

        // helper function to send google analytics event
        window.sendGaEvent = function(action) {
            window.ga('send', 'event', "user_event", action, DEMO_NAME);
        }

    })();
}
catch (e) {
    console.warn("Error with google analytics!", e);
    window.ga = function() {};
}

// HOTJAR
(function() {
    // guarantree.neowize.com
    if (location.host == "guarantee.neowize.com") {
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:607867,hjsv:5};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
    }
    // newusers.neowize.com
    else if (location.host == "newusers.neowize.com") {
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:607871,hjsv:5};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
    }
    // easyintegration.neowize.com
    else if (location.host == "easyintegration.neowize.com") {
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:607875,hjsv:5};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
    }
    // categorysort.neowize.com
    else if (location.host == "categorysort.neowize.com") {
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:607877,hjsv:5};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
    }
})();

// WHEN USER HIT SIGNUP
function neowizeSubmitSignup() {

    // get site and email
    var site = $("#site-input").val();
    var email = $("#email-input").val();

    // if form not filled skip
    if (site.length == 0 || email.length == 0) return;

    // send email and site to our server
    $.ajax({
        url: "http://api1.shoptimally.com/dashboard/h/send_notification_mail/",
        type: 'POST',
        data: JSON.stringify({
            subject: "Someone registered to demo '" + window.DEMO_NAME + "': " + email,
            body: "Email: " + email + "\r\nSite: " + site,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
    }).fail(function() {
        window.sendGaEvent("FAILED_TO_SEND_DETAILS_TO_SERVER");
    });

    // send google analytics event
    window.sendGaEvent("clicked_start_now");
    window.sendGaEvent("data_" + site + "_" + " " + email);

    // bump "thank you" message
    $("#site-input").val("");
    $("#email-input").val("");
    $("#thank-you").css("display", "block");

    // return false so we won't really submit
    return false;
}