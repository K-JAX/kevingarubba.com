<script context="module">
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        var visited = getCookie("siteload");
        var durVal;
        if (visited != "") {
            // alert("Welcome again " + visited);
            durVal = 2000;
        } else {
            visited = "visited";
            if (visited != "" && visited != null) {
                setCookie("siteload", visited, 1);
            }
            durVal = 3500;
        }
        return durVal;
    }

    export const durVal = checkCookie();
</script>
