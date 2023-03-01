
const CONSTENT_VALUES = require('./constant')

module.exports = async ({github,context}) => {  
    
     /* 
        fetch the the list of issue from current Repo
        filter stale label and closed
     */

        const prTitle = context.payload.pull_request.title;
        console.log("line 12",prTitle)
        console.log(
            'Entered triagePullRequestTrustedPartners for PR Title =', prTitle);
        // if (checkForTfCoreRepo(context)) {
        //   for (const [key, value] of prReviewersTrustedPartners.entries()) {
        //     if (prTitle.toLowerCase().indexOf(key.toLowerCase()) != -1) {
        //       return await context.octokit.pulls.requestReviewers(
        //           context.pullRequest({reviewers: value}));
        //     }
        //   }
        // }

        


  
    
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