# 下载 ImportExcel 模块（如果尚未安装）
if (-not (Get-Module -ListAvailable -Name ImportExcel)) {
    Install-Module -Name ImportExcel -Force -Scope CurrentUser
}

# 记录开始时间
$startTime = Get-Date

# 定义路径
$excelPath = Join-Path $PSScriptRoot "xw.xlsx"
$outputDir = Join-Path $PSScriptRoot "newdata"
$logPath = Join-Path $outputDir "log.txt"

# 创建输出目录
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

# 创建日志文件（如果不存在）
if (-not (Test-Path $logPath)) {
    New-Item -ItemType File -Path $logPath | Out-Null
}

# 打印并记录开始读取 Excel
$readStartMsg = "Start reading Excel: $excelPath"
Write-Host $readStartMsg -ForegroundColor Cyan
Add-Content -Path $logPath -Value $readStartMsg

# 读取 Excel 第一个 Sheet 的第 5 列
$data = Import-Excel -Path $excelPath -WorksheetName (Get-ExcelSheetInfo -Path $excelPath)[0].Name

# 打印并记录读取成功
$readSuccessMsg = "Excel read success, total rows: $($data.Count)"
Write-Host $readSuccessMsg -ForegroundColor Cyan
Add-Content -Path $logPath -Value $readSuccessMsg

# 初始化计数器
$index = 1
$successCount = 0
$failCount = 0

# 遍历每一行
foreach ($row in $data) {
    # 打印每一行的所有属性
    $row.PSObject.Properties | ForEach-Object {
        Write-Host "Property Name: $($_.Name), Value: $($_.Value)"
    }

    $url = $row.PSObject.Properties[4].Value  # Trim 第5列

    # 检查原始值
    Write-Host "Raw Value: '$($row.PSObject.Properties[4].Value)'" -ForegroundColor Cyan

    # 使用正则去除所有的空白字符
    $url = $row.PSObject.Properties[4].Value -replace '\s+', ''

    # 打印当前 URL
    $urlMsg = "Processing URL: $url"
    Write-Host $urlMsg -ForegroundColor Yellow
    Add-Content -Path $logPath -Value $urlMsg

    if ($url -and $url -match '^https?://') {
        Write-Host "Downloading: $url" -ForegroundColor Green
        Add-Content -Path $logPath -Value "Downloading: $url"

        try {
            $ext = [System.IO.Path]::GetExtension($url).Split('?')[0]
            if (-not $ext) { $ext = ".jpg" }  # 如果没有扩展名，默认用 .jpg
            $fileName = Join-Path $outputDir "$index$ext"

            Invoke-WebRequest -Uri $url -OutFile $fileName -UseBasicParsing -ErrorAction Stop

            Write-Host "Downloaded: $fileName" -ForegroundColor Green
            Add-Content -Path $logPath -Value "Downloaded: $fileName"
            $successCount++
            $index++
        }
        catch {
            Write-Host "Failed to download: $url" -ForegroundColor Red
            Add-Content -Path $logPath -Value "Failed to download: $url"
            $failCount++
        }
    } else {
        Write-Host "Invalid or empty URL: $url" -ForegroundColor DarkGray
        Add-Content -Path $logPath -Value "Invalid or empty URL: $url"
        continue
    }
}

# 输出并记录总耗时
$duration = (Get-Date) - $startTime
$durationText = "Total time: $($duration.TotalSeconds) seconds"
$summary = "`nTotal success: $successCount, failed: $failCount`n$durationText"

Write-Host $summary -ForegroundColor Green
Add-Content -Path $logPath -Value $summary
