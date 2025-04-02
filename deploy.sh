#!/bin/bash

# 设置 Git 凭证缓存助手为 cache， 避免反复输入账号密码
git config --global credential.helper cache

# 设置 Git 凭证缓存的超时时间为 10 年（约 315360000 秒，这里你写的 360000000 秒也可以，接近 11 年）
git config --global credential.helper "cache --timeout=315360000"

echo "Git 凭证缓存已成功设置为约 10 年。"

# 目标仓库
REPO_URL="git@github.com:chendianWeprotalk/showroom-ui.git"
REPO_NAME=$(basename -s .git "$REPO_URL") # 获取仓库名称
LOG_FILE="$(pwd)/shell_log.txt"
DEPLOY_DIR="$(pwd)" # deploy.sh 所在目录

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

# 记录脚本开始时间
START_TIME=$(date +%s%3N) # 以毫秒计时
log "=== Script started ===" "$GREEN"

# 执行命令，失败则终止并重试
execute_with_retry() {
    local cmd="$1"
    local sleep_time="${2:-1}" # 默认等待 1 秒
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
            sleep "$sleep_time" # 使用传入的等待时间
        fi
    done

    log "ERROR: $cmd failed after $max_attempts attempts. Aborting." "$RED"
    exit 1
}

# 1. 克隆仓库（如果不存在）
if [[ ! -d "$REPO_NAME" ]]; then
    log "Cloning repository: $REPO_URL" "$GREEN"
    execute_with_retry "git clone $REPO_URL"
else
    log "Repository already exists: $REPO_NAME" "$GREEN"
fi

# 2. 进入仓库目录
execute_with_retry "cd $REPO_NAME" 0

# 3. 切换到 qa 分支
execute_with_retry "git checkout qa"

# 4. 拉取最新代码
execute_with_retry "git pull"

# 5. 安装依赖
execute_with_retry "npm install"

# 6. 构建项目（失败后尝试 npm run build:linux）
execute_with_retry "npm run build:linux"

# 7. 复制 dist 目录到 deploy.sh 所在目录（覆盖已有的 dist）
log "Copying dist to $DEPLOY_DIR" "$GREEN"
rm -rf "$DEPLOY_DIR/dist" # 先删除原 dist 目录
cp -r dist "$DEPLOY_DIR/" # 复制新的 dist

# 计算总执行时间
END_TIME=$(date +%s%3N)
TOTAL_TIME_MS=$((END_TIME - START_TIME))

if [[ $TOTAL_TIME_MS -lt 1000 ]]; then
    TOTAL_TIME="$TOTAL_TIME_MS ms"
elif [[ $TOTAL_TIME_MS -lt 60000 ]]; then
    TOTAL_TIME="$((TOTAL_TIME_MS / 1000)) s"
elif [[ $TOTAL_TIME_MS -lt 3600000 ]]; then
    SECONDS=$((TOTAL_TIME_MS / 1000 % 60))
    MINUTES=$((TOTAL_TIME_MS / 60000))
    TOTAL_TIME="${MINUTES}m ${SECONDS}s"
elif [[ $TOTAL_TIME_MS -lt 86400000 ]]; then
    SECONDS=$((TOTAL_TIME_MS / 1000 % 60))
    MINUTES=$((TOTAL_TIME_MS / 60000 % 60))
    HOURS=$((TOTAL_TIME_MS / 3600000))
    TOTAL_TIME="${HOURS}h ${MINUTES}m ${SECONDS}s"
else
    SECONDS=$((TOTAL_TIME_MS / 1000 % 60))
    MINUTES=$((TOTAL_TIME_MS / 60000 % 60))
    HOURS=$((TOTAL_TIME_MS / 3600000 % 24))
    DAYS=$((TOTAL_TIME_MS / 86400000))
    TOTAL_TIME="${DAYS}d ${HOURS}h ${MINUTES}m ${SECONDS}s"
fi

log "=== Script completed successfully in $TOTAL_TIME ===" "$GREEN"
