const CONSTENT_VALUES = require('./constant');

module.exports = async ({ github, context }) =>  {
    const issueNumber = context.payload.issue.number;
    const assigneesList = CONSTENT_VALUES.MODULE.ASSIGNEES;

    console.log("entered auto assignment for this issue:  ", issueNumber);
    if (!assignees.length) {
      console.log('No assignees found for this repo.');
      return;
    }
    let noOfAssignees = assigneesList.length;
    let selection = issueNumber % noOfAssignees;
    let assigneeForIssue = assigneesList[selection]

      console.log(
        'issue Number =', issueNumber + ', assigning issue to:',
        assigneeForIssue);
      const addAssigneeParams = context.issue({ assignees: [assigneeForIssue] });
      return context.octokit.issues.addAssignees(addAssigneeParams);

  }

     /**
       * Determines correct issue assignee
       * @param {number} index
       * @param {number} assignees
       * @return {number}
       */
     async function getIndex(index, assignees) {
        const i = 0;
        let number = store.get(index);

        if (number) {
          const latest = parseInt(number) + 1;
          if (latest >= assignees) {
            store.put(index, '0');
            return i;
          }

          store.put(index, latest);
          return latest;
        } else {
          store.put(index, '0');
          return i;
        }
      }