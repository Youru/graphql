var gitHubModule = (function () {
    const githubUrl = "https://api.github.com/graphql";
    const token = "xxxxxxxxxxxxxxxxxxxxxx";
    let queries;


    let init = function () {
        queries = queriesModule.querylist();
        var querylist = document.getElementById("query-list");

        for (let query in queries) {
            var option = document.createElement("option");
            option.text = query;
            querylist.add(option, querylist[querylist.childElementCount]);
        }
    }

    let getgitHub = function () {
        var queryToSelect = document.getElementById("query-list").value;


        var variables = { name: "__Schema" }
        // var variables = { owner: "Youru" }
        getGitHubRepo(queries[queryToSelect], variables)
            .then(res =>
                res.json()
            )
            .then(res => {
                content = document.getElementById("content-json");
                content.innerHTML = JSON.stringify(res.data, undefined, 2);
            }
            );
    }

    function getGitHubRepo(query, variables) {
        return fetch(githubUrl,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify({ query, variables })
            }
        )
    }

    return {
        getgitHub: getgitHub,
        init: init
    };
})();