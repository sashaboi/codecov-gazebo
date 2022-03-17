import { useQuery } from 'react-query'

import Api from 'shared/api'

export function usePull({ provider, owner, repo, pullId }) {
  const query = `
    query Pull($owner: String!, $repo: String!, $pullid: Int!) {
        owner(username: $owner) {
          repository(name: $repo) {
            pull(id: $pullid) {
              pullId
              title
              state
              author {
                username
              }
              updatestamp
              head {
                commitid
                totals {
                  coverage
                }
              }
              comparedTo {
                commitid
              }
              compareWithBase {
                patchTotals {
                  coverage
                }
                changeWithParent
              }
            }
          }
        }
      }
    `

  return useQuery(['pull', provider, owner, repo, pullId], () => {
    return Api.graphql({
      provider,
      query,
      variables: {
        provider,
        owner,
        repo,
        pullid: parseInt(pullId, 10),
      },
    }).then((res) => res?.data?.owner?.repository?.pull)
  })
}
