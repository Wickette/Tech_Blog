console.log("onload")
const newCommentHandler = async (event) => {
  console.log("click")

    const description = document.querySelector("#commentInput").value.trim()
    const thread_id = window.location.toString().split("/")[window.location.toString().split("/").length -1]

    if (description) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body:  JSON.stringify({ description, thread_id }), 
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert("Cannot post comment");
    }
  }
}
  
  document.querySelector('#commentBtn').addEventListener('click', newCommentHandler);
  