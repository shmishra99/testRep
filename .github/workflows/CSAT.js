
module.exports = async ({github,context}) => {
const issue = context.payload.issue.html_url
let base_url = ''
console.log('Github event: issue_closed for issue =', issue)
if (true) {
  console.log("inside if condi")
  for (const label of context.payload.issue.labels) {
     console.log("inside for loop")
    if (label.name.includes('type:bug') ||
      label.name.includes('type:build/install') ||
      label.name.includes('type:support') ||
      label.name.includes('type:others') ||
      label.name.includes('type:docs-bug') ||
      label.name.includes('type:performance') || true) {
      console.log(`label-${label.name}, posting CSAT survey for issue =${issue}`)
      if (context.payload.repository.name.includes('mediapipe'))
        base_url = 'https://docs.google.com/forms/d/e/1FAIpQLScOLT8zeBHummIZFnfr9wqvxYzWD1DAypyvNia5WVIWtFANYg/viewform?'
      else
        base_url = 'https://docs.google.com/forms/d/e/1FAIpQLSfaP12TRhd9xSxjXZjcZFNXPGk4kc1-qMdv3gc6bEP90vY1ew/viewform?'
      const yesCsat =
        ('Yes')
          .link(
          base_url + 'entry.85265664=' +
          'Yes' + '&entry.2137816233=' + issue)
      const noCsat =
        ('No')
          .link(
            base_url +  'entry.85265664=' +
            'No' + '&entry.2137816233=' + issue)
      const bd = 'Are you satisfied with the resolution of your issue?' + '\n' + yesCsat + '\n' + noCsat + '\n'

       await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body:  bd
     })
    }
  }
   console.log("my issue")
}

}