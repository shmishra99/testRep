
const CONSTENT_VALUES = require('./constant')

/*
Invoked from pullRequestTriageApproved.yaml file to add label 
for "ready to pull" and "kokoro:force-run" when PR review submitted. 
*/


module.exports = async ({ github, context }) => {
    if (context.payload.sender.login == 'copybara-service[bot]' || 
        !context.payload.pull_request.base.ref.includes('main')) { //change master to main
        return false;
    }
    let labelsToAdd = CONSTENT_VALUES.MODULE.pullRequestTriageApprovedLabels;
   if((context.payload.review.state === 'approved')){ 
        github.rest.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        labels: labelsToAdd
    })

 }   
}
