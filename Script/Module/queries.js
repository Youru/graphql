var queriesModule = (function () {
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

    const queryRefs = `query getrepo($owner: String!){repository(owner: $owner, name: "Tools") {
        refs(refPrefix:"refs/heads/", orderBy: {direction: ASC, field: TAG_COMMIT_DATE}, first:10) {
            edges{
                node{
                    ... on Ref{
                        name
                        target {
                            ... on Commit {
                            history(first: 10) {
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

    const querySchema = `{
        __schema {
            types {
                name
                description
                fields {
                    name
                }
            }
            }
        }`

    const queryType = `query GetTypeName($name: String!){
            __type(name: $name) {
                name
                kind
                description
                    fields {
                        name
                    }
                }
            }
        `

    let querylist = function () {
        return {
            GetLastCommit: query,
            GetBranchRef: queryRefs,
            GetSchema: querySchema,
            GetType: queryType
        };
    }


    return {
        querylist: querylist
    }

})();