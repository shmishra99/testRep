
const CONSTENT_VALUES = require('./constant')

/*
Invoked from staleCSAT.js and CSAT.yaml file to 
Post survey link in closed issue.
*/


module.exports = async ({ github, context }) => {
    
    if (context.payload.sender.login == 'copybara-service[bot]' || 
        !context.payload.pull_request.base.ref.includes('master')) {
        return false;
    }
    let labelsToAdd = CONSTENT_VALUES.MODULE.pullRequestTriageApproved;
   
    if(context.payload.review.state === 'approved'){
  
        github.rest.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        labels: [labelsToAdd]
    })

}
     
     

    
}