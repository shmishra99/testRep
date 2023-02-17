module.exports = async ({github,context}) => {  
        
    console.log('entered unmark for issueid = ', context.payload.issue.number);
    console.log('issue author is ', context.payload.issue.user.login);
    console.log('issue latest commenter is ', context.payload.sender.login);

    if (context.payload.issue.state !== 'closed' &&
      context.payload.issue.user.login == context.payload.sender.login) {
      let labelRM = []
      for (const label of context.payload.issue.labels) {
        if (label.name.includes("stale")) {
          console.log("Adding label to remove List: stale")
          labelRM.push("stale")
         
        }

        if (label.name.includes("stat:awaiting response")) {         
          console.log("Adding label to remove List: stat:awaiting response")
          labelRM.push("awaiting response")
        }

     
      }
       console.log("Labels to remove :" , labelRM)
       await github.rest.issues.setLabels({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        labels:labelRM
        
      })

    }


}