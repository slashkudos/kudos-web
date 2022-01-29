#!/usr/bin/env pwsh

<#
    .SYNOPSIS
    Queries AWS Amplify for the deployment status of a given Amplify app.
#>

[CmdletBinding()]
Param(
    [Parameter(Mandatory=$true)]
    [string]$AppId,

    [Parameter(Mandatory=$true)]
    [string]$BranchName,

    [Parameter(Mandatory=$true)]
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
Write-Host "Waiting for job to complete..." -NoNewLine

$jobId = $jobSummary.jobId

do {
    $job = $(aws amplify get-job --app-id $AppId --branch-name $BranchName --job-id $jobId) | ConvertFrom-Json
    $jobSummary = $job.job.summary
    $endTime = $jobSummary.endTime
    Write-Host "." -NoNewLine
    Start-Sleep -Seconds 1
} while ($endTime -eq $null)

Write-Host ""
Write-Host "Job finished with status $($jobSummary.status)"
