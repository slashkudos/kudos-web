Write-Output @"
progress=true
email=$(git config --get user.email)
@slashkudos:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=$env:GITHUB_TOKEN
"@ > ~/.npmrc
