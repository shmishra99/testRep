
const CONSTENT_VALUES = require('./constant')

/*
Invoked from staleCSAT.js and CSAT.yaml file to 
Post survey link in closed issue.
*/


module.exports = async ({ github, context }) => {
    const issue = context.payload.issue.html_url;
    console.log('Github event: issue_closed for issue = ', issue);
    console.log("Owner of the repo = ", context.payload.repository.owner.login)

    for (let i = 1; i < 3; i++) {
      const issueDetails = await github.rest.issues.listForRepo({
        owner: context.payload.repository.owner.login,
        repo: context.payload.repository.name,
        per_page: 100,    
        state: "closed",
        page: i,
      });

      const listIssues = issueDetails.data;
      for (let i = 0; i < listIssues.length; i++) {
        const issue = listIssues[i];

        issue.closed_at
        let issueClose = new Date(issue.closed_at);
        let currentEpoch = new Date();
        let timeDiff = currentEpoch - issueClose
        let diffInDays = timeDiff / (1000 * 60 * 60 * 24)
        
        if(diffInDays > 0)
            continue

        const issueComments = await github.rest.issues.listComments({
          owner: context.payload.repository.owner.login,
          repo: context.payload.repository.name,
          per_page: 100,
          issue_number: issue.number,

        });
        const commentsList = issueComments.data;
        for (let i = 0; i < commentsList.length; i++) {
          let comment = commentsList[i];
          let commentTime = new Date(comment.created_at);
          let currentEpoch = new Date();
          let timeDiff = currentEpoch - commentTime
          let diffInDays = timeDiff / (1000 * 60 * 60 * 24)
          if (diffInDays > 0 && comment.created_at && comment.body.indexOf(constants.msg) != -1) {
            console.log("issue details udpated for issue number: ", issue.number)
            await github.rest.issues.updateComment({
              owner: context.payload.repository.owner.login,
              repo: context.payload.repository.name,
              comment_id: comment.id,
              body: constants.msg + '\n' + "Yes" + '\n' + "No" + '\n'
            });
          }
        }
      }
    }





    }




