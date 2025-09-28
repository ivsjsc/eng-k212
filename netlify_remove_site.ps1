# Remove Netlify NextJS plugin (if any) and trigger deploy with clear cache for specific site
$token = 'nfp_3Ud36VpRWAh1pbBFAwCLvPicoaDuX5DM090b'
$siteId = '4e3ed67e-0d5f-4168-8a3d-34c755868180'

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
if (-not $nextPlugin) { Write-Host 'No NextJS plugin found. Skipping uninstall.' } else {
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
