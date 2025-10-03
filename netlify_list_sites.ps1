# List Netlify sites accessible by token
$token = $env:NETLIFY_TOKEN
if (-not $token) {
  Write-Host "Error: NETLIFY_TOKEN environment variable is not set."
  exit 1
}
try {
  $sites = Invoke-RestMethod -Method Get -Uri 'https://api.netlify.com/api/v1/sites' -Headers @{ Authorization = "Bearer $token" }
} catch {
  Write-Host "Failed to list sites:" $_.Exception.Message
  exit 1
}
foreach ($s in $sites) {
  $name = $s.name
  $id = $s.id
  $url = $s.ssl_url
  Write-Host "Site: $name  id: $id  url: $url"
}
