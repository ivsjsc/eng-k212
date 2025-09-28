# List Netlify sites accessible by token
$token = 'nfp_3Ud36VpRWAh1pbBFAwCLvPicoaDuX5DM090b'
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
