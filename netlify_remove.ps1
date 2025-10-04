# Remove Netlify NextJS plugin (if any) and trigger deploy with clear cache
# WARNING: this script now expects the Netlify API token to be provided via the NETLIFY_TOKEN environment variable.
$token = $env:NETLIFY_TOKEN
if (-not $token) {
  Write-Host "ERROR: NETLIFY_TOKEN environment variable is not set. Please set it to your Netlify API token."
  exit 1
}
$siteId = '675653b26a58276bb7d2f600'

Write-Host "Listing installed plugins for site $siteId..."
try {
  $plugins = Invoke-RestMethod -Method Get -Uri "https://api.netlify.com/api/v1/sites/$siteId/plugins" -Headers @{ Authorization = "Bearer $token" }
} catch {
  Write-Host "Failed to list plugins:" $_.Exception.Message
  exit 2
}

if (!$plugins -or $plugins.Count -eq 0) {
  Write-Host 'No plugins returned'
} else {
  foreach ($p in $plugins) { Write-Host "Plugin id: $($p.id)  package: $($p.package_name -or $p.package)" }
}

$nextPlugin = $plugins | Where-Object { ($_.package -eq '@netlify/plugin-nextjs') -or ($_.package_name -eq '@netlify/plugin-nextjs') -or ($_.package -like '*nextjs*') }
if (-not $nextPlugin) { Write-Host 'No NextJS plugin found. Exiting.'; exit 0 }

Write-Host 'Found NextJS plugin(s):'
$nextPlugin | ForEach-Object { Write-Host (" - id: {0}  package: {1}" -f $_.id, ($_.package_name -or $_.package)) }

foreach ($p in $nextPlugin) {
  $pluginId = $p.id
  Write-Host "Uninstalling plugin id $pluginId ..."
  try {
    Invoke-RestMethod -Method Delete -Uri "https://api.netlify.com/api/v1/sites/$siteId/plugins/$pluginId" -Headers @{ Authorization = "Bearer $token" } -ErrorAction Stop
    Write-Host "Uninstalled plugin id" $pluginId
  } catch {
    Write-Host "Failed to uninstall plugin id" $pluginId ":" $_.Exception.Message
  }
}

Write-Host 'Triggering deploy with clear_cache...'
$body = @{ clear_cache = $true } | ConvertTo-Json
try {
  $deploy = Invoke-RestMethod -Method Post -Uri "https://api.netlify.com/api/v1/sites/$siteId/builds" -Headers @{ Authorization = "Bearer $token" } -Body $body -ContentType 'application/json'
  Write-Host ("Deploy triggered. Deploy id: {0}" -f $deploy.id)
} catch {
  Write-Host "Failed to trigger deploy:" $_.Exception.Message
  exit 3
}
