var gitHubModule = (function () {
    const githubUrl = "https://api.github.com/graphql";
    const token = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    const query = `{repository(owner: "Youru", name: "Tools") {
        id
        name
        ref(qualifiedName:"master") {
            target {
              ... on Commit {
                history(first: 15) {
                  edges {
                    node {
                      committedDate
                      oid
                      message
                      author {
                        name
                        date
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`;

    const queryRefs = `{repository(owner: "Youru", name: "Tools") {
        refs(refPrefix:"refs/heads/", orderBy: {direction: ASC, field: TAG_COMMIT_DATE}, first:1) {
            edges{
                node{
                    ... on Ref{
                        name
                        target {
                            ... on Commit {
                            history(first: 1) {
                                totalCount
                                edges{
                                    node{
                                        ... on Commit{
                                            committedDate
                                        }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
          }
        }
      }`;

    const queryIntrospection = `{
        __schema {
            types {
              name
              kind
              description
              fields {
                name
              }
            }
          }
      }`

    const queryType = `{
        __type(name: "Repository") {
            name
            kind
            description
            fields {
              name
            }
          }
      }`

    let getgitHub = function () {
        var toto = "";

        getGitHubRepo(queryRefs)
            .then(res =>
                res.json()
            )
            .then(res =>
                toto = res.data
            );
    }

    function getGitHubRepo(query) {
        return fetch(githubUrl,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                body: JSON.stringify({ query: query })
            }
        )
    }

    return {
        getgitHub: getgitHub
    };
})();