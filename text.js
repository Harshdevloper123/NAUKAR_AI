    document.getElementById("sendButton").addEventListener("click", function () {
        var query = document.getElementById("messageInput").value;
        if (query) {
            fetchResults(query);
        }
    });

    document.getElementById("messageInput").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            var query = document.getElementById("messageInput").value;
            if (query) {
                fetchResults(query);
            }
        }
    });

    function fetchResults(query) {
        const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayResults(data))
            .catch(error => console.error('Error fetching search results:', error));
    }

   