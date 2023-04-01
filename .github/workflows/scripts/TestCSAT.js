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

  let logs  = github.rest.issues.listForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state:"closed",
    labels:"stale"

  });

  // console.log("logs length",logs.data.length)
 
  console.log("logss ",logs)

}