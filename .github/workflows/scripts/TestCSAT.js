
const csat = require('./CSAT.js');
module.exports = async ({ github, context }) => {

//   console.log("line 3",github)
//   console.log("kube 4" ,context)

//   let logs = await github.rest.actions.downloadJobLogsForWorkflowRun({
//     issue_number: context.issue.number,
//     owner: context.repo.owner,
//     repo: context.repo.repo,
//     job_id: github.job

// })

// let logs =  await github.rest.issues.listEventsForRepo({
    
//     owner: context.repo.owner,
//     repo: context.repo.repo,

//   });
   
 
 let d = new Date("2023-04-01T16:08:04Z").toISOString() ///  

  let obj  = await github.rest.issues.listForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state:"closed",
    labels:"stale",
    since:d

  });

  let ISSUESLIST = obj.data

 for(let i=0;i<ISSUESLIST.length;i++){
        
  let comments = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: ISSUESLIST[i].number
  });
  // console.log("line 42 ",comments)

  let strCom = JSON.stringify(comments)

  if(strCom.indexOf('Are you satisfied with the resolution of your issue?') == -1){
       console.log("not found")
       context.payload = {}  
       context.payload.issue = {}
       context.payload.issue.labels = ISSUESLIST[i].labels
       context.payload.issue.html_url = ISSUESLIST[i].number
       csat(github,context)
       

  }
  else 
     console.log("found")

       
   

 }
  
  // console.log("logs length",logs.data.length)
 
  // console.log("logss ",logs)

}