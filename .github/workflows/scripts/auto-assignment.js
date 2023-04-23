const CONSTENT_VALUES = require('./constant');

module.exports = async ({ github, context }) =>  {
    const issueNumber = context.payload.issue.number;
    const assigneesList = CONSTENT_VALUES.MODULE.ASSIGNEES;
    console.log("assignee list",assigneesList)
    console.log("entered auto assignment for this issue:  ", issueNumber);
    if (!assigneesList.length) {
      console.log('No assignees found for this repo.');
      return;
    }
    let noOfAssignees = assigneesList.length;
    let selection = issueNumber % noOfAssignees;
    let assigneeForIssue = assigneesList[selection]

      console.log(
        'issue Number =', issueNumber + ', assigning issue to:',
        assigneeForIssue);
      return github.rest.issues.addAssignees({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        assignees:[assigneeForIssue] 

    });

  }

   