module.exports = async ({github,context}) => {  

    // console.log('entered unmark for issueid = ', context.payload.issue.number);
    // console.log('issue author is ', context.payload.issue.user.login);
    // console.log('issue latest commenter is ', context.payload.sender.login);
    
    let issuess = await github.rest.issues.listForRepo({
         owner: context.repo.owner,
         repo: context.repo.repo,
         state:'closed',
         labels:'stalled'

    })

    // for(let i=0;i<issuess.length;i++){
         
    //     // //obj call for stale label remove 
    //     // let staleRM = 

    //     // await rmLabel()
            

    // }

    

    console.log("line 3",JSON.stringify(issuess.data[0].labels) )



    console.log("issue trigger")

}

async function rmLabel(queryObj){
  
    await github.rest.issues.removeLabel({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        name: "stale"

    })

}