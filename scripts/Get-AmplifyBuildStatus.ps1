#!/usr/bin/env pwsh

<#
    .SYNOPSIS
    Queries AWS Amplify for the deployment status of a given Amplify app.
#>

[CmdletBinding()]
Param(
  [Parameter(Mandatory = $true)]
  [string]$AppId,

  [Parameter(Mandatory = $true)]
  [string]$BranchName,

  [Parameter(Mandatory = $true)]
  [string]$CommitId
)

Write-Host "Finding deployment for commit $CommitId"
do {
  $latestJob = $(aws amplify list-jobs --app-id $AppId --branch-name $BranchName --max-items 1) | ConvertFrom-Json
  $jobSummary = $latestJob.jobSummaries[0]
  $jobCommitId = $jobSummary.commitId
  Start-Sleep -Seconds 1
} while ($jobCommitId -ne $CommitId)

Write-Host "Job $($jobSummary.jobId) is deploying this commit"

$jobId = $jobSummary.jobId

do {
  Write-Host "Checking job status..."
  $jobRaw = $(aws amplify get-job --app-id $AppId --branch-name $BranchName --job-id $jobId) 
  $job = $jobRaw | ConvertFrom-Json
  $innerJob = $job.job

  $innerJob.steps | ForEach-Object {
    $step = $_
    Write-Host "$($step.stepName): $($step.status)"
  }

  $jobSummary = $innerJob.summary
  $endTime = $jobSummary.endTime
  if(!$endTime) {
    Start-Sleep -Seconds 5
  }
} while ($null -eq $endTime)

Write-Host "Job finished with status $($jobSummary.status)"

if (-not $($jobSummary.status -like "SUCCEED")) {
  exit 1
}
