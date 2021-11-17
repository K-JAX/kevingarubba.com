<script>
    // modules
    import { afterUpdate } from "svelte";
    import queryString from "query-string";

    const apiURL = process.env.api_url;
    let formData = {};

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
        const formContainers = await document.querySelectorAll(".wpcf7");

        // bail if there's no form found
        if (formContainers.length === 0) {
            return;
        }

        formContainers.forEach(form => {
            let formIDString = form.id.split("-")[1],
                formID = formIDString.slice(1);

            let send = form.querySelectorAll(".wpcf7-submit");
            let messageBox = form.querySelectorAll(".wpcf7-response-output");

            if (send != undefined) {
                send[0].classList.remove("loading");
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
</script>
