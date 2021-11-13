async function editThreadHandler(event) {
    event.preventDefault()

    const title = document.getElementById("title").value.trim()
    const description = document.getElementById("description").value.trim()    
    const thread_id = window.location.toString().split("/")[window.location.toString().split("/").length-1]

    const response = await fetch (`/api/threads/${thread_id}`, {
        method: "PUT",
        body: JSON.stringify({
            thread_id: thread_id,
            title,
            description
        }),
        headers: {"Content-type": "application/json"}
    })
    if (response.ok) {
        document.location.replace("/dashboard")
    } else {
        alert(response.statusText)
    }
}

document.querySelector("#editThreadBtn").addEventListener("click", editThreadHandler)