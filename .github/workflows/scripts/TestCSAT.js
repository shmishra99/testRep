module.exports = async ({ github, context }) => {

//   console.log("line 3",github)
//   console.log("kube 4" ,context)

  let logs = await github.rest.actions.downloadJobLogsForWorkflowRun({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    job_id: 4583967721
})
  console.log("logss ",logs)

}