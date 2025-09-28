$env:NETLIFY_AUTH_TOKEN = 'nfp_3Ud36VpRWAh1pbBFAwCLvPicoaDuX5DM090b'
$siteId = '675653b26a58276bb7d2f600'

Write-Host "Listing installed plugins for site $siteId..."
$plugins = Invoke-RestMethod -Method Get -Uri "https://api.netlify.com/api/v1/sites/$siteId/plugins" -Headers @{ Authorization = "Bearer $env:NETLIFY_AUTH_TOKEN" }
if (-not $plugins) {
  Write-Host "No plugins returned"
} else {
  foreach ($p in $plugins) {
    Write-Host ("Plugin id: {0}  package: {1}  repo: {2}" -f $p.id, $p.package, ($p.package_name -or $p.package))
  }
}

$nextPlugin = $plugins | Where-Object { ($_.package -eq '@netlify/plugin-nextjs') -or ($_.package_name -eq '@netlify/plugin-nextjs') -or ($_.package -like '*nextjs*') }
if (-not $nextPlugin) {
  Write-Host "No NextJS plugin found. If deploy still fails, check Netlify UI or paste deploy log here."
  return
}

Write-Host "Found NextJS plugin(s):"
foreach ($p in $nextPlugin) {
  Write-Host (" - id: {0}  package: {1}" -f $p.id, $p.package)
}

foreach ($p in $nextPlugin) {
  $pluginId = $p.id
  Write-Host "Uninstalling plugin id $pluginId ..."
  $resp = Invoke-RestMethod -Method Delete -Uri "https://api.netlify.com/api/v1/sites/$siteId/plugins/$pluginId" -Headers @{ Authorization = "Bearer $env:NETLIFY_AUTH_TOKEN" } -ErrorAction Stop
  Write-Host "Uninstalled plugin id $pluginId"
}

Write-Host "Triggering deploy with clear_cache..."
$body = @{ clear_cache = $true } | ConvertTo-Json
$deploy = Invoke-RestMethod -Method Post -Uri "https://api.netlify.com/api/v1/sites/$siteId/builds" -Headers @{ Authorization = "Bearer $env:NETLIFY_AUTH_TOKEN" } -Body $body -ContentType 'application/json'
Write-Host "Deploy triggered. Deploy id: $($deploy.id)"
Write-Host "Done. Watch Netlify Deploy logs in the UI."
