module.exports = async ({github,context}) => {  

    // console.log('entered unmark for issueid = ', context.payload.issue.number);
    // console.log('issue author is ', context.payload.issue.user.login);
    // console.log('issue latest commenter is ', context.payload.sender.login);
    
    let issuessList = await github.rest.issues.listForRepo({
         owner: context.repo.owner,
         repo: context.repo.repo,
         state:'closed',
         labels:'stalled'

    })
  
    let issues = issuessList.data;
    
    
    for(let i=0;i<issues.length;i++){
         
       let issue = issues[i]

       let queryObj = {}
       queryObj["issue_number"] = issue.number;
       queryObj['owner'] = context.repo.owner;
       queryObj["repo"] = context.repo.repo;
       
       //call to remove stale
       queryObj["name"] = 'stalled'
       console.log("line 30",queryObj)
       await rmLabel(queryObj,github)
      
       //call to remove a stat:awaiting response

       queryObj["name"] = "stat:awaiting response"
       console.log("line 30",queryObj)
       await rmLabel(queryObj,github)

    }


    console.log("issue trigger")

}

async function rmLabel(queryObj,github){
  
    await github.rest.issues.removeLabel(queryObj)

}