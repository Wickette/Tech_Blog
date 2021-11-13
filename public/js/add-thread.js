async function newThreadHandler(event) {
    event.preventDefault();
    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("description").value.trim()
    console.log(title)

    const response = await fetch("/api/threads", {
        method: "POST",
        body: JSON.stringify({
            title,
            description
        }),
        headers: {"Content-Type": "application/json"}
    })
    console.log(response)
   if (response.ok) {
       document.location.replace("/dashboard")
   } else {
       alert(response.statusText)
   }
}

document.querySelector("#addThreadBtn").addEventListener("click", newThreadHandler)