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

$attempts = 0
$maxAttempts = 60 * 5 # 5 minutes
$sleep = $false
Write-Host "Finding deployment for commit $CommitId"
do {
    if ($sleep -eq $true) { Start-Sleep -Seconds 1 }
    $latestJob = $(aws amplify list-jobs --app-id $AppId --branch-name $BranchName --max-items 1) | ConvertFrom-Json
    $jobSummary = $latestJob.jobSummaries[0]
    $jobCommitId = $jobSummary.commitId
    $sleep = $true
    $attempts += 1
} while ($jobCommitId -ne $CommitId -and $attempts -lt $maxAttempts)

Write-Host "Job $($jobSummary.jobId) is deploying this commit"
Write-Host "Waiting for job to complete..." -NoNewLine

$attempts = 0
$maxAttempts = 60 * 15 # 15 minutes
$sleep = $false
do {
    if ($sleep -eq $true) { Start-Sleep -Seconds 1 }
    $latestJob = $(aws amplify list-jobs --app-id $AppId --branch-name $BranchName --max-items 1) | ConvertFrom-Json
    $jobSummary = $latestJob.jobSummaries[0]
    $endTime = $jobSummary.endTime
    Write-Host "." -NoNewLine
    $sleep = $true
    $attempts += 1
} while ($endTime -eq $null -and $attempts -lt $maxAttempts)

Write-Host ""
Write-Host "Job finished with status $($jobSummary.status)"
