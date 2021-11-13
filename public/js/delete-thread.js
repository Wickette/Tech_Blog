async function deleteThreadHandler(event) {
    event.preventDefault()

    const thread_id = window.location.toString().split("/")[window.location.toString().split("/").length-1]
    const response = await fetch(`/api/threads/${thread_id}`, {
        method: "DELETE",
        body: JSON.stringify({
            thread_id: thread_id
        }),
        headers: {"Content-type": "application/json"}
    })
    if (response.ok) {
        document.location.replace("/dashboard")
    } else {
        alert(response.statusText)
    }
}

document.querySelector("#deleteThreadBtn").addEventListener("click", deleteThreadHandler)