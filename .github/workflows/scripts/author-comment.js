module.exports = async ({github,context}) => {  
        
    console.log('entered unmark for issueid = ', context.payload.issue.number);
    console.log('issue author is ', context.payload.issue.user.login);
    console.log('issue latest commenter is ', context.payload.sender.login);

    if (context.payload.issue.state !== 'closed' &&
      context.payload.issue.user.login == context.payload.sender.login) {
      let labelRM = []
      for (const label of context.payload.issue.labels) {
      
        if (label.name.includes("stale")) {
          console.log("Removing label: stale")
          await github.rest.issues.removeLabel({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            name:"stale"
        
          })
         
        }

        if (label.name.includes("stat:awaiting response")) {         
          console.log("Removing label : stat:awaiting response")
          await github.rest.issues.removeLabel({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            name:"stat:awaiting response"
        
          })
        }

     
      }       

    }


}