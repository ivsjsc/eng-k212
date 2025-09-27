# Validate and (optionally) encode a Google service-account.json, then set Netlify env var(s) via Netlify CLI.
# Usage examples:
#   .\netlify-set-serviceaccount.ps1 -Path C:\path\to\service-account.json
#   .\netlify-set-serviceaccount.ps1 -Path C:\path\to\service-account.json -ToBase64
#   .\netlify-set-serviceaccount.ps1 -Path C:\path\to\service-account.json -ToBase64 -SetNetlify -Context Production
# Notes: This script does NOT upload or commit the JSON to git. It only reads from your local filesystem.

param(
  [Parameter(Mandatory=$true)]
  [string]$Path,
  [switch]$ToBase64,
  [switch]$SetNetlify,
  [ValidateSet('Production','Deploy Previews','Branch deploys','Preview Server','Local development (Netlify CLI)')]
  [string]$Context = 'Production'
)

if (-not (Test-Path $Path)) { throw "File not found: $Path" }

$raw = Get-Content -Raw $Path -ErrorAction Stop

try {
  $json = $raw | ConvertFrom-Json -ErrorAction Stop
} catch {
  throw "Invalid JSON in service account file: $Path`n$($_.Exception.Message)"
}

Write-Host "Valid JSON detected. Project ID:" ($json.project_id)
Write-Host "JSON length (chars):" $raw.Length

if ($ToBase64) {
  $encoded = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($raw))
  Write-Host "Base64 length:" $encoded.Length
  Write-Host "--- BEGIN BASE64 ---"
  Write-Host $encoded
  Write-Host "--- END BASE64 ---"
}

if ($SetNetlify) {
  if (-not (Get-Command netlify -ErrorAction SilentlyContinue)) {
    throw "Netlify CLI not found in PATH. Install and 'netlify login' first."
  }

  # Choose value to send
  $value = if ($ToBase64) { $encoded } else { $raw }

  Write-Host "Setting Netlify env var SERVICE_ACCOUNT_JSON for context '$Context'..."
  $cliArgs = @('env:set','SERVICE_ACCOUNT_JSON',$value,'--context',$Context)
  $proc = Start-Process netlify -ArgumentList $cliArgs -NoNewWindow -Wait -PassThru
  if ($proc.ExitCode -ne 0) { throw "Netlify CLI returned exit code $($proc.ExitCode)" }
  Write-Host "Netlify env set completed for context $Context"
}
