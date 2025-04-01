#!/bin/bash

# 配置参数
SECRET="mysecret" # 与代码中的SECRET保持一致
PORT=3001
PAYLOAD='{"ref": "refs/heads/qa", "repository": {"name": "showroom-ui", "full_name": "chendianWeprotalk/showroom-ui"}, "pusher": {"name": "test-user", "email": "test@example.com"}, "commits": [{"id": "abc123", "message": "Test commit"}]}'

# 确保 PAYLOAD 是单行无换行的
PAYLOAD=$(echo "$PAYLOAD" | tr -d '\n')

# 生成 HMAC-SHA256 签名
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" | sed 's/^.* //')

# 输出调试信息
echo "Payload: $PAYLOAD"
echo "Signature: sha256=$SIGNATURE"

# 发送测试请求
curl -v -X POST "http://localhost:$PORT/github-webhook" \
  -H "Content-Type: application/json" \
  -H "X-Hub-Signature-256: sha256=$SIGNATURE" \
  -d "$PAYLOAD"
