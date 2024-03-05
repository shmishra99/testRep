/*
Copyright 2024 Google LLC. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/


/**
 * Invoked from gemma_identifer.yaml file to add a 
 * label to the issues and PRs for which have gemma keyword present.
 * @param {!Object.<string,!Object>} github contains pre defined functions.
 *  context Information about the workflow run.
 * @return {null}
 */
module.exports = async ({ github, context }) => {
    // console.log("Github...",github)
    // console.log("context...",context)
    const issue_title = context.payload.issue.title 
    const issue_discription =context.payload.issue.body
    const issue_number = context.issue.number ?? context.payload.issue.number;
    const labelToAdd = 'Gemma'
    if(issue_title.toLowerCase().indexOf('gemma') !=-1 || issue_title.toLowerCase().indexOf('gemma') !=-1 ){

        github.rest.issues.addLabels({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: context.issue.number,
            labels:[labelToAdd]
        })

    }

};
