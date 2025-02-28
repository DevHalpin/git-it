#!/usr/bin/env node

const exec = require('child_process').exec

// check that they performed a merge
// check there is not username named branch

exec('git reflog -10', function(err, stdout, stdrr) {
  const ref = stdout.trim()
  let user = ""
  
  if (ref.match("merge")) console.log("Branch has been merged!")
  else console.log("No merge in the history.")
  
  exec('git config user.username', function(err, stdout, stdrr) {
    user = stdout.trim()
    
    exec('git branch', function(err, stdout, stdrr) {
      branches = stdout.trim()
      branchName = "add-"+user
           
      if (branches.match(branchName)) console.log("Uh oh, branch is still there.")
      else return console.log("Branch deleted!")
    })
  })
})
