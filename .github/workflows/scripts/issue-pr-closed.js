
const CONSTENT_VALUES = require('./constant')

module.exports = async ({github,context}) => {  
    
    let issuessList = await github.rest.issues.listForRepo({
         owner: context.repo.owner,
         repo: context.repo.repo,
         state:CONSTENT_VALUES.GLOBALS.STATE.CLOSED,
         labels:CONSTENT_VALUES.GLOBALS.LABELS.STALE
        })
  
    let issues = issuessList.data;
    for(let i=0;i<issues.length;i++){
         
       let issue = issues[i]

       let queryObj = {}
       queryObj["issue_number"] = issue.number;
       queryObj['owner'] = context.repo.owner;
       queryObj["repo"] = context.repo.repo;
       
       //call to remove stale
       queryObj["name"] = CONSTENT_VALUES.GLOBALS.LABELS.STALE
  
       await rmLabel(queryObj,github)
       queryObj["name"] = CONSTENT_VALUES.GLOBALS.LABELS.AWAITINGRES
 
       await rmLabel(queryObj,github)

    }
}

async function rmLabel(queryObj,github){
    
    try{
    await github.rest.issues.removeLabel(queryObj)
    }
    catch(e){
        console.log(`Issue Number ${queryObj.number} Doesn't  have ${queryObj.name} label`)
    }

}