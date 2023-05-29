
const CONSTENT_VALUES = require('./constant')

/*
Invoked from staleCSAT.js and CSAT.yaml file to 
Post survey link in closed issue.
*/


module.exports = async ({ github, context }) => {
        console.log("my line 11",context.payload.sender.login,context.payload.pull_request.base.ref)
    if (context.payload.sender.login == 'copybara-service[bot]' || 
        !context.payload.pull_request.base.ref.includes('main')) {. //change master to main
        return false;
    }
    console.log("my line 11....")
    let labelsToAdd = CONSTENT_VALUES.MODULE.pullRequestTriageApproved;
     console.log("my line 11....18")
    if(!context.payload.review.state === 'approved'){
  
        github.rest.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        labels: [labelsToAdd]
    })

}
     
     

    
}
