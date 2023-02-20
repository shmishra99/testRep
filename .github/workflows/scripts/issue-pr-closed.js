
const CONSTENT_VALUES = require('./constant')

module.exports = async ({github,context}) => {  
    
     /* 
        fetch the the list of issue from current Repo
        filter stale label and closed
     */
    let issuessList = await github.rest.issues.listForRepo({
         owner: context.repo.owner,
         repo: context.repo.repo,
         state:CONSTENT_VALUES.GLOBALS.STATE.CLOSED,
         labels:CONSTENT_VALUES.GLOBALS.LABELS.STALE
        })
  
    let issues = issuessList.data;


      /* 
        Iterate over all the closed issues with label stale and
        remove stale and stat:awaiting response
     */
    for(let i=0;i<issues.length;i++){
         
       let issue = issues[i]
       let queryObj = {}
       queryObj["issue_number"] = issue.number;
       queryObj['owner'] = context.repo.owner;
       queryObj["repo"] = context.repo.repo;
       
       queryObj["name"] = CONSTENT_VALUES.GLOBALS.LABELS.STALE
       await rmLabel(queryObj,github)


       queryObj["name"] = CONSTENT_VALUES.GLOBALS.LABELS.AWAITINGRES
       await rmLabel(queryObj,github)

    }
}

/* 
   Function to call git API to remove the label
   delete one label at a time
   
*/
async function rmLabel(queryObj,github){
    
    try{
    await github.rest.issues.removeLabel(queryObj)
    }
    catch(e){
        console.log(`Issue Number ${queryObj.number} Doesn't  have ${queryObj.name} label`)
    }

}