module.exports = async ({github,context}) => {  

    let issuess = await github.rest.issues.listForRepo({
          
        owner: context.repo.owner,
        repo: context.repo.repo,
         state:'closed'

    })
    console.log("line 3",issuess )
    console.log("issue trigger")

}