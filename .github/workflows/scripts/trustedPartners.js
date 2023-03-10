
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
        let prReviewersTrustedPartners = CONSTENT_VALUES.MODULE.TRUSTEDPARTNERS
        if (checkForTfCoreRepo(context)) {
          for (const [key, value] of prReviewersTrustedPartners.entries()) {
            if (prTitle.toLowerCase().indexOf(key.toLowerCase()) != -1) {
                // console.log("pr number ",github)
                console.log("pr number ",context.payload.number,value,typeof value)

           
              let data =  await github.rest.pulls.requestReviewers(
                    {
                    reviewers:value,
                    owner:context.repo.owner,
                    repo:context.repo.repo,
                    pull_number:context.payload.number

                    });
                console.log("ret data",data)    
            }
          }
        }

    
}

      /**
       * Determines if PR is from core repo
       * @param {!Object} context
       * @return {!bool} isValidRepo
       */
      function checkForTfCoreRepo(context) {
        let isValidRepo = false;
        if (context.payload.sender.login == 'copybara-service[bot]') {
          return isValidRepo;
        }
        let repos = CONSTENT_VALUES.GLOBALS.PR_TRIGGER_REPO.split(',');
        if (context.payload.pull_request.html_url.includes(
                CONSTENT_VALUES.GLOBALS.TENSORFLOW_CORE_REPO) &&
            context.payload.pull_request.base.ref.includes('master')) {
          isValidRepo = true;
          console.log("my log check 47")
          return isValidRepo;
        } else if (
            repos.includes(context.payload.repository.name) &&
            context.payload.sender.login != 'copybara-service') {
          console.log('repo is under autoAssignment list of repos.');
          return true;
        }
        return isValidRepo;
      }