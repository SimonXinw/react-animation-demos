$curr = git branch --show-current
git branch | ForEach-Object {
    $branch = $_.Trim()
    if ($branch -ne "* $curr" -and $branch -ne $curr) {
        git branch -D $branch
    }
}