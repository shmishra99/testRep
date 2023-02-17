module.exports = async ({github,context}) => {  
        
    console.log('entered unmark for issueid = ', context.payload.issue.number);
    console.log('issue author is ', context.payload.issue.user.login);
    console.log('issue latest commenter is ', context.payload.sender.login);

    if (context.payload.issue.state !== 'closed' &&
      context.payload.issue.user.login == context.payload.sender.login) {
      for (const label of context.payload.issue.labels) {
        if (label.name.includes("stalled")) {
          const stalledLabel = context.issue({ name: ['stalled'] });
          console.log("line 12")
          await context.octokit.issues.removeLabel(stalledLabel);
        }
        if (label.name.includes("stat:awaiting response")) {
          const awaitingLabel = context.issue({ name: ['stat:awaiting response'] });
          console.log("line 16")
          await context.octokit.issues.removeLabel(awaitingLabel);
        }
      }
    }


}