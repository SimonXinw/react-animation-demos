#!/bin/bash

# 目标仓库
REPO_URL="https://github.com/chendianWeprotalk/showroom-ui.git"
REPO_NAME=$(basename -s .git $REPO_URL) # 获取仓库名称
LOG_FILE="$(pwd)/shell_log.txt"

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # 无颜色

# 记录日志（终端彩色，文件无颜色）
log() {
    local message="$1"
    local color="$2"
    local timestamp="$(date '+%Y-%m-%d %H:%M:%S')"

    # 终端打印彩色
    echo -e "${color}${timestamp} - ${message}${NC}"

    # 记录到文件（去掉颜色）
    echo -e "${timestamp} - ${message}" >>"$LOG_FILE"
}

# 执行命令，失败则终止并重试
execute_with_retry() {
    local cmd="$1"
    local attempt=1
    local max_attempts=3

    while [[ $attempt -le $max_attempts ]]; do
        log "Executing: $cmd" "$GREEN"
        if eval "$cmd"; then
            log "SUCCESS: $cmd" "$GREEN"
            return 0
        else
            log "FAILURE: $cmd (Attempt $attempt/$max_attempts)" "$RED"
            ((attempt++))
            sleep 2 # 等待 2 秒后重试
        fi
    done

    log "ERROR: $cmd failed after $max_attempts attempts. Aborting." "$RED"
    exit 1
}

log "=== Script started ===" "$GREEN"

# 1. 克隆仓库（如果不存在）
if [[ ! -d "$REPO_NAME" ]]; then
    log "Cloning repository: $REPO_URL" "$GREEN"
    execute_with_retry "git clone $REPO_URL"
else
    log "Repository already exists: $REPO_NAME" "$GREEN"
fi

# 2. 进入仓库目录
cd "$REPO_NAME" || {
    log "Failed to enter directory $REPO_NAME" "$RED"
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

log "=== Script completed successfully ===" "$GREEN"
