#!/bin/bash

# 目标仓库
REPO_URL="https://github.com/chendianWeprotalk/showroom-ui.git"
REPO_NAME=$(basename -s .git $REPO_URL) # 获取仓库名称
LOG_FILE="$(pwd)/shell_log.txt"

# 记录日志
log() {
    echo -e "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# 执行命令并最多重试两次
execute_with_retry() {
    local cmd="$1"
    local attempt=0
    local max_attempts=3

    while [[ $attempt -lt $max_attempts ]]; do
        if eval "$cmd"; then
            log "SUCCESS: $cmd"
            return 0
        else
            log "FAILURE: $cmd (Attempt $((attempt + 1))/$max_attempts)"
            ((attempt++))
            sleep 2 # 等待2秒后重试
        fi
    done
    return 1
}

log "=== Script started ==="

# 1. 克隆仓库（如果不存在）
if [[ ! -d "$REPO_NAME" ]]; then
    log "Cloning repository: $REPO_URL"
    execute_with_retry "git clone $REPO_URL"
else
    log "Repository already exists: $REPO_NAME"
fi

# 2. 进入仓库目录
cd "$REPO_NAME" || {
    log "Failed to enter directory $REPO_NAME"
    exit 1
}

# 3. 切换到 qa 分支
execute_with_retry "git checkout qa"

# 4. 拉取最新代码
execute_with_retry "git pull"

# 5. 安装依赖
execute_with_retry "npm install"

# 6. 构建项目
execute_with_retry "npm run build"

log "=== Script completed ==="
