<script>
    // modules
    import { afterUpdate } from "svelte";
    import queryString from "query-string";
    import { Recaptcha, recaptcha, observer } from "svelte-recaptcha-v2";

    const apiURL = process.env.api_url;
    let formData = {};
    let formContainers = [];
    let send;
    let recaptchaPass = false;

    const postData = async (fID, output, send) => {
        const inputs = document.querySelectorAll(
            ".wpcf7-form-control:not(.wpcf7-submit)"
        );

        inputs.forEach(input => {
            formData[input.name] = input.value;
        });

        const resp = await fetch(
            `${apiURL}/contact-form-7/v1/contact-forms/${fID}/feedback`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: queryString.stringify(formData)
            }
        )
            .then(resp => resp.json())
            .then(resp => {
                output[0].classList.remove("wpcf7-display-none");
                if (
                    resp.status == "validation_failed" ||
                    resp.status == "spam"
                ) {
                    output[0].classList.add("error-message");
                } else {
                    output[0].classList.remove("error-message");
                    output[0].classList.add("success-message");
                    send[0].classList.add("sent");
                    send[0].innerHTML = "Sent";
                    send[0].disabled = true;
                }
                output[0].innerHTML = "<span>" + resp.message + "</span>";
                console.log(resp);
            })
            .catch(error => {
                console.log("Error:", error);
            });
    };

    const formDefault = async () => {
        formContainers = await document.querySelectorAll(".wpcf7");

        // bail if there's no form found
        if (formContainers.length === 0) {
            return;
        }

        formContainers.forEach(form => {
            let formIDString = form.id.split("-")[1],
                formID = formIDString.slice(1);

            send = form.querySelectorAll(".wpcf7-submit");
            send[0].disabled = recaptchaPass === false ? true : false;
            console.log(send);
            let messageBox = form.querySelectorAll(".wpcf7-response-output");

            if (send != undefined) {
                // send[0].classList.remove("disabled");
                send[0].addEventListener("click", function(event) {
                    event.preventDefault();
                    postData(formID, messageBox, send);
                });
            }
        });
    };

    afterUpdate(async () => {
        setTimeout(function() {
            formDefault();
        }, 2000);
    });

    const googleRecaptchaSiteKey = "6LdFOkAdAAAAAHk2IzedzYkND2NJkTVKcwclltTQ";
    const onCaptchaReady = event => {
        console.log("recaptcha init has completed.");

        /*
     │You can enable your form button here.
     */
    };

    const onCaptchaSuccess = event => {
        // console.log("token received: " + event.detail.token);
        /*
     │If using checkbox method, you can attach your
     │form logic here, or dispatch your custom event.
     */
        recaptchaPass = true;
        send[0].disabled = false;
        send[0].classList.remove("disabled");
        // console.log(send);
    };

    const onCaptchaError = event => {
        console.log("recaptcha init has failed.");
        /*
     │Usually due to incorrect siteKey.
     |Make sure you have the correct siteKey..
     */
    };

    const onCaptchaExpire = event => {
        console.log("recaptcha api has expired");
        recaptchaPass = false;
        /*
     │Normally, you wouldn't need to do anything.
     │Recaptcha should reinit itself automatically.
     */
    };

    const onCaptchaOpen = event => {
        console.log("google decided to challange the user");
        /*
     │This fires when the puzzle frame pops.
     */
    };

    const onCaptchaClose = event => {
        console.log("google decided to challange the user");
        /*
     │This fires when the puzzle frame closes.
     │Usually happens when the user clicks outside
     |the modal frame.
     */
    };
</script>

<div class="{recaptchaPass ? 'hidden' : 'block'}">
    <Recaptcha
        sitekey="{googleRecaptchaSiteKey}"
        badge="{'inline'}"
        size="{'normal'}"
        on:success="{onCaptchaSuccess}"
        on:error="{onCaptchaError}"
        on:expired="{onCaptchaExpire}"
        on:close="{onCaptchaClose}"
        on:ready="{onCaptchaReady}"
    />
</div>
