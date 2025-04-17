# 下载 Excel 所需库（如果未安装）
if (-not (Get-Module -ListAvailable -Name ImportExcel)) {
    Install-Module -Name ImportExcel -Force -Scope CurrentUser
}

# 定义文件路径
$excelPath = Join-Path $PSScriptRoot "xw.xlsx"
$outputDir = Join-Path $PSScriptRoot "newdata"

# 创建输出目录
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

# 读取 Excel 第一个 Sheet 的第 5 列
$data = Import-Excel -Path $excelPath -WorksheetName (Get-ExcelSheetInfo -Path $excelPath)[0].Name

# 遍历每一行，提取第 5 列
$index = 1
foreach ($row in $data) {
    $url = $row.PSObject.Properties[4].Value -replace '^\s+|\s+$', ''  # 第5列 + trim
    if ($url -and $url -match '^https?://') {
        try {
            $ext = [System.IO.Path]::GetExtension($url).Split('?')[0]
            $fileName = Join-Path $outputDir "$index$ext"
            Invoke-WebRequest -Uri $url -OutFile $fileName -ErrorAction Stop
            Write-Host "Downloaded: $fileName"
            $index++
        }
        catch {
            Write-Warning "Failed to download: $url"
        }
    }
}
