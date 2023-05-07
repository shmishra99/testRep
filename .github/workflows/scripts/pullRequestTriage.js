
const CONSTENT_VALUES = require('./constant')

/*
Invoked from staleCSAT.js and CSAT.yaml file to 
Post survey link in closed issue.
*/


module.exports = async ({ github, context }) => {
    const size = context.payload.pull_request.additions +
        context.payload.pull_request.deletions;
    let labelsToAdd = '';
    if (size < 9) {
        labelsToAdd = 'size:XS';
    } else if (size < 49) {
        labelsToAdd = 'size:S';
    } else if (size < 249) {
        labelsToAdd = 'size:M'
    } else if (size < 999) {
        labelsToAdd = 'size:L';
    } else {
        labelsToAdd = 'size:XL';
    }
    // const assign = context.issue({ assignees: ['gbaned'] });
    let columnCardId = 4025673;

    await Promise
        .allSettled([
            github.rest.issues.addLabels({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.issue.number,
                labels:labelsToAdd
            }),
            github.rest.issues.addAssignees({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.issue.number,
                assignees: ['shmishr99']
            }),

            github.rest.projects.createCard({
                column_id: columnCardId,
                content_type: 'PullRequest',
                content_id: context.issue.number
            })
        ])
        .then((result) => {
            console.log(result.status);
        });
}