
const CONSTENT_VALUES = require('./constant')

module.exports = async ({ github, context }) => {
    const issue = context.payload.issue.html_url
    let base_url = ''
    console.log('Github event: issue_closed for issue =', issue)
    if (checkForCsatRepo(context)) {
        for (const label of context.payload.issue.labels) {
            if (label.name.includes(CONSTENT_VALUES.GLOBALS.LABELS.BUG) ||
                label.name.includes(CONSTENT_VALUES.GLOBALS.LABELS.BUG_INSTALL) ||
                label.name.includes(CONSTENT_VALUES.GLOBALS.LABELS.TYPE_PERFORMANCE) ||
                label.name.includes(CONSTENT_VALUES.GLOBALS.LABELS.TYPE_OTHER) ||
                label.name.includes(CONSTENT_VALUES.GLOBALS.LABELS.TYPE_SUPPORT) ||
                label.name.includes(CONSTENT_VALUES.GLOBALS.LABELS.TYPE_DOCS_BUG)) {
                console.log(`label-${label.name}, posting CSAT survey for issue =${issue}`)
               
                if (context.repo.repo.includes('mediapipe'))
                    base_url = CONSTENT_VALUES.MODULE.CSAT.MEDIA_PIPE_BASE_URL;
                else
                    base_url = CONSTENT_VALUES.MODULE.CSAT.BASE_URL;
                const yesCsat =
                    (CONSTENT_VALUES.MODULE.CSAT.YES)
                        .link(
                            base_url + CONSTENT_VALUES.MODULE.CSAT.SATISFACTION_PARAM +
                            CONSTENT_VALUES.MODULE.CSAT.YES + CONSTENT_VALUES.MODULE.CSAT.ISSUEID_PRAM + issue)
                const noCsat =
                    (CONSTENT_VALUES.MODULE.CSAT.NO)
                        .link(
                            base_url + CONSTENT_VALUES.MODULE.CSAT.SATISFACTION_PARAM +
                            CONSTENT_VALUES.MODULE.CSAT.NO + CONSTENT_VALUES.MODULE.CSAT.ISSUEID_PRAM + issue)
                const comment = CONSTENT_VALUES.MODULE.CSAT.MSG + '\n' + yesCsat + '\n' + noCsat + '\n'

                await github.rest.issues.createComment({
                    issue_number: context.issue.number,
                    owner: context.repo.owner,
                    repo: context.repo.repo,
                    body: comment
                })
                return 
            }
        }
    }

}


function checkForCsatRepo(context) {
    let repos = CONSTENT_VALUES.MODULE.CSAT.CSAT_INCLUDES_REPO.split(',');
    if (repos.includes(context.repo.repo)) {
      console.log('repo is under CSAT list of repos');
      return true;
    }
    return false;
  }