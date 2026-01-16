# 后台会员通知管理 API 接口文档

## 基础信息

**Base URL**: `/admin/member_notice`

**认证方式**: JWT Token (Backend)

**请求头**:
```
Authorization: Bearer {backend-jwt-token}
Content-Type: application/json
```

---

## 接口列表

### 1. 获取通知列表（分页）

获取会员通知的分页列表，支持搜索和筛选。

**接口地址**: `GET /admin/member_notice/list`

**权限代码**: `member:notice:list`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| page | integer | 否 | 页码，默认1 |
| page_size | integer | 否 | 每页数量，默认10 |
| title | string | 否 | 标题关键词搜索 |
| type | integer | 否 | 通知类型：1=通知, 2=公告 |
| member_id | integer | 否 | 会员ID筛选 |
| start_time | string | 否 | 开始时间（格式：Y-m-d H:i:s） |
| end_time | string | 否 | 结束时间（格式：Y-m-d H:i:s） |

**请求示例**:
```bash
GET /admin/member_notice/list?page=1&page_size=20&type=1&title=系统
```

**响应示例**:
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "data": [
            {
                "id": 1,
                "title": "系统维护通知",
                "type": 1,
                "type_text": "通知",
                "content": "系统将于今晚22:00进行维护，预计1小时",
                "member_id": 123,
                "click_num": 15,
                "created_by": 1,
                "updated_by": 0,
                "remark": "重要通知",
                "created_at": "2025-11-06 10:30:00",
                "updated_at": "2025-11-06 10:30:00"
            }
        ],
        "total": 100,
        "current_page": 1,
        "per_page": 20,
        "last_page": 5
    }
}
```

---

### 2. 获取通知详情

获取指定通知的详细信息。

**接口地址**: `GET /admin/member_notice/{id}`

**权限代码**: `member:notice:detail`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | integer | 是 | 通知ID |

**请求示例**:
```bash
GET /admin/member_notice/123
```

**响应示例**:
```json
{
    "code": 200,
    "message": "success",
    "data": {
        "id": 123,
        "title": "系统维护通知",
        "type": 1,
        "type_text": "通知",
        "content": "系统将于今晚22:00进行维护，预计1小时",
        "member_id": 456,
        "click_num": 15,
        "created_by": 1,
        "updated_by": 0,
        "remark": "重要通知",
        "created_at": "2025-11-06 10:30:00",
        "updated_at": "2025-11-06 10:30:00"
    }
}
```

---

### 3. 创建单个通知

创建一条发送给特定会员或所有会员的通知。

**接口地址**: `POST /admin/member_notice`

**权限代码**: `member:notice:create`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 通知标题，最大200字符 |
| type | integer | 是 | 通知类型：1=通知, 2=公告 |
| content | string | 是 | 通知内容 |
| member_id | integer | 否 | 会员ID，0表示全体会员，不传则为单个会员 |
| remark | string | 否 | 备注信息，最大500字符 |

**请求示例**:
```json
{
    "title": "账户余额变动通知",
    "type": 1,
    "content": "您的账户余额增加了100元",
    "member_id": 123,
    "remark": "充值通知"
}
```

**响应示例**:
```json
{
    "code": 200,
    "message": "通知创建成功",
    "data": {
        "id": 456,
        "title": "账户余额变动通知",
        "type": 1,
        "content": "您的账户余额增加了100元",
        "member_id": 123,
        "click_num": 0,
        "created_by": 1,
        "remark": "充值通知",
        "created_at": "2025-11-06 14:30:00",
        "updated_at": "2025-11-06 14:30:00"
    }
}
```

---

### 4. 批量创建通知

批量创建通知，发送给多个指定会员。

**接口地址**: `POST /admin/member_notice/batch`

**权限代码**: `member:notice:create`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 通知标题，最大200字符 |
| type | integer | 是 | 通知类型：1=通知, 2=公告 |
| content | string | 是 | 通知内容 |
| member_ids | array | 是 | 会员ID数组，至少1个 |
| remark | string | 否 | 备注信息，最大500字符 |

**请求示例**:
```json
{
    "title": "活动通知",
    "type": 2,
    "content": "本周五将举办线上活动，欢迎参加",
    "member_ids": [123, 456, 789],
    "remark": "营销活动"
}
```

**响应示例**:
```json
{
    "code": 200,
    "message": "成功创建 3 条通知",
    "data": {
        "count": 3
    }
}
```

---

### 5. 发送全体通知（广播）

发送通知给所有会员（member_id 自动设置为 0）。

**接口地址**: `POST /admin/member_notice/broadcast`

**权限代码**: `member:notice:broadcast`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 通知标题，最大200字符 |
| type | integer | 是 | 通知类型：1=通知, 2=公告 |
| content | string | 是 | 通知内容 |
| remark | string | 否 | 备注信息，最大500字符 |

**请求示例**:
```json
{
    "title": "系统升级公告",
    "type": 2,
    "content": "系统将于今晚22:00-23:00进行升级维护，期间服务暂停",
    "remark": "重要公告"
}
```

**响应示例**:
```json
{
    "code": 200,
    "message": "全体通知发送成功",
    "data": {
        "id": 789,
        "title": "系统升级公告",
        "type": 2,
        "content": "系统将于今晚22:00-23:00进行升级维护，期间服务暂停",
        "member_id": 0,
        "click_num": 0,
        "created_by": 1,
        "remark": "重要公告",
        "created_at": "2025-11-06 15:30:00",
        "updated_at": "2025-11-06 15:30:00"
    }
}
```

**特别说明**:
- `member_id = 0` 表示全体会员
- 所有在线会员将通过 WebSocket 实时收到通知
- 离线会员登录后可通过API查询到该通知

---

### 6. 更新通知

更新指定通知的信息。

**接口地址**: `PUT /admin/member_notice/{id}`

**权限代码**: `member:notice:update`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | integer | 是 | 通知ID |

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 否 | 通知标题，最大200字符 |
| type | integer | 否 | 通知类型：1=通知, 2=公告 |
| content | string | 否 | 通知内容 |
| remark | string | 否 | 备注信息，最大500字符 |

**请求示例**:
```json
{
    "title": "系统维护通知（已更新）",
    "content": "系统维护时间调整为今晚23:00-24:00"
}
```

**响应示例**:
```json
{
    "code": 200,
    "message": "更新成功",
    "data": null
}
```

---

### 7. 删除单个通知

删除指定的通知（软删除）。

**接口地址**: `DELETE /admin/member_notice/{id}`

**权限代码**: `member:notice:delete`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | integer | 是 | 通知ID |

**请求示例**:
```bash
DELETE /admin/member_notice/123
```

**响应示例**:
```json
{
    "code": 200,
    "message": "删除成功",
    "data": null
}
```

---

### 8. 批量删除通知

批量删除多条通知（软删除）。

**接口地址**: `DELETE /admin/member_notice/batch`

**权限代码**: `member:notice:delete`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| ids | array | 是 | 通知ID数组，至少1个 |

**请求示例**:
```json
{
    "ids": [123, 456, 789]
}
```

**响应示例**:
```json
{
    "code": 200,
    "message": "删除成功",
    "data": {
        "deleted_count": 3
    }
}
```

---

## 数据字典

### 通知类型 (type)

| 值 | 说明 | 描述 |
|----|------|------|
| 1 | 通知 | 普通通知消息 |
| 2 | 公告 | 系统公告 |

### 会员ID (member_id)

| 值 | 说明 |
|----|------|
| 0 | 全体会员（广播） |
| > 0 | 特定会员ID |

---

## 通知推送机制

### 1. 创建通知流程

```
后台创建通知 → 保存到数据库
            ↓
         推送到消息队列
            ↓
      队列消费者处理
            ↓
    WebSocket 实时推送给在线会员
```

### 2. 推送规则

- **个人通知** (`member_id > 0`): 只推送给指定会员
- **全体广播** (`member_id = 0`): 推送给所有在线会员
- **离线会员**: 登录后可通过客户端API查询到未读通知

### 3. WebSocket 推送格式

当通知创建后，在线会员会通过 WebSocket 收到以下格式的实时消息：

```json
{
    "type": "notice",
    "data": {
        "id": 123,
        "title": "系统通知",
        "type": 1,
        "content": "您有一条新消息",
        "created_at": "2025-11-06 10:30:00"
    },
    "timestamp": 1699999999
}
```

---

## 权限说明

后台管理员需要具备以下权限才能操作对应的接口：

| 权限代码 | 说明 | 关联接口 |
|----------|------|----------|
| `member:notice:list` | 查看通知列表 | GET /list |
| `member:notice:detail` | 查看通知详情 | GET /{id} |
| `member:notice:create` | 创建通知 | POST /, POST /batch |
| `member:notice:update` | 更新通知 | PUT /{id} |
| `member:notice:delete` | 删除通知 | DELETE /{id}, DELETE /batch |
| `member:notice:broadcast` | 发送全体通知 | POST /broadcast |

---

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 401 | 未授权（Token 无效或过期） |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 422 | 参数验证失败 |
| 500 | 服务器内部错误 |

**错误响应示例**:
```json
{
    "code": 422,
    "message": "title 字段是必填的",
    "data": null
}
```

---

## 使用场景示例

### 场景1：发送个人通知

当会员完成充值后，系统自动发送通知：

```json
POST /admin/member_notice
{
    "title": "充值成功",
    "type": 1,
    "content": "您已成功充值100元，当前余额：500元",
    "member_id": 123
}
```

### 场景2：批量通知VIP会员

向所有VIP会员发送活动通知：

```json
POST /admin/member_notice/batch
{
    "title": "VIP专属活动",
    "type": 2,
    "content": "本周末VIP会员专享优惠活动",
    "member_ids": [101, 102, 103, 104]
}
```

### 场景3：系统维护公告

发送全站系统维护公告：

```json
POST /admin/member_notice/broadcast
{
    "title": "系统维护公告",
    "type": 2,
    "content": "系统将于今晚22:00-23:00进行维护，请提前做好准备"
}
```

### 场景4：查询特定会员的通知

查询会员ID为123的所有通知：

```bash
GET /admin/member_notice/list?member_id=123&page=1&page_size=20
```

---

## 最佳实践

### 1. 通知内容编写

- ✅ 标题简洁明了，不超过30字
- ✅ 内容表达清晰，重点突出
- ✅ 包含必要的时间、金额等关键信息
- ✅ 使用礼貌、专业的语气

### 2. 通知类型选择

- **通知 (type=1)**: 用于个人消息、交易通知、账户变动等
- **公告 (type=2)**: 用于系统公告、活动通知、维护通知等

### 3. 批量操作建议

- 批量创建时，建议每批不超过1000个会员
- 大量通知建议分批发送，避免系统压力过大
- 使用 `remark` 字段记录通知来源，便于追踪

### 4. 全体广播注意事项

- 全体广播会推送给所有在线会员，请谨慎使用
- 重要公告建议提前测试，确保内容准确无误
- 避免频繁发送广播，影响用户体验

---

## 配合客户端 API

会员端可以通过以下 API 查询和管理自己的通知：

- `GET /api/member_notice/list` - 获取通知列表
- `GET /api/member_notice/unread_count` - 获取未读数量
- `POST /api/member_notice/{id}/read` - 标记单个已读
- `POST /api/member_notice/batch_read` - 批量标记已读
- `GET /api/member_notice/{id}` - 获取通知详情

详细说明请参考 **客户端会员通知API接口文档**。

---

## 技术支持

如有问题，请联系技术支持团队。

**文档版本**: v1.0
**更新日期**: 2025-11-06
