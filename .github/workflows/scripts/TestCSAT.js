
const csat = require('./CSAT.js');

module.exports = async ({ github, context }) => {

  let date = new Date();
  let totalMilliSeconds = date.getTime();
  let minutes = 30
  let millisecondsToSubtract = minutes * 60 * 1000;
  let closeTime = totalMilliSeconds-millisecondsToSubtract
  let ISOCloseTime = closeTime.toISOString() 
  //  closeTime = closeTime.slice(0, 19)+ 'Z'
  let closeTimeIssues  = await github.rest.issues.listForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state:"closed", 
    labels:"stale",
    since:ISOCloseTime
  });

 let ISSUESLIST = closeTimeIssues.data

 for(let i=0;i<ISSUESLIST.length;i++){      
  let comments = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: ISSUESLIST[i].number
  });
 
  let strCom = JSON.stringify(comments)
  if(strCom.indexOf('Are you satisfied with the resolution of your issue?') == -1){
       console.log("not found")
       context.payload.issue = {}
       context.issue.number = ISSUESLIST[i].number
       context.payload.issue.labels = ISSUESLIST[i].labels
       context.payload.issue.html_url = ISSUESLIST[i].number
       console.log("line 61",context)
       csat({github, context})
  }
 }
}