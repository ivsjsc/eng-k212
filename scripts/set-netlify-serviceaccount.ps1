param(
  [string]$ServiceAccountPath = 'C:\Users\nbi29\Downloads\service-account.json',
  [string]$SiteId = '6e0595c5-9794-4ad4-a628-30a32003cf66'
)

Write-Host "Encoding service account from: $ServiceAccountPath"
if (-not (Test-Path $ServiceAccountPath)) {
  Write-Error "Service account file not found: $ServiceAccountPath"
  exit 2
}

$raw = Get-Content -LiteralPath $ServiceAccountPath -Raw
$enc = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($raw))

Write-Host "Linking local folder to Netlify site ID: $SiteId"
netlify link --id $SiteId

Write-Host "Setting SERVICE_ACCOUNT_JSON (secret) on Netlify site"
# Write base64 to temp file and use CLI to set from file to avoid quoting issues
$tmp = [System.IO.Path]::GetTempFileName()
Set-Content -Path $tmp -Value $enc -Encoding Ascii
try {
  # Use --secret and specify production context
  netlify env:set SERVICE_ACCOUNT_JSON "$(Get-Content -Raw -Path $tmp)" --secret --context production
} finally {
  Remove-Item -Path $tmp -ErrorAction SilentlyContinue
}

Write-Host "Done. Trigger a deploy from Netlify UI or push a commit to apply the new secret to functions."
