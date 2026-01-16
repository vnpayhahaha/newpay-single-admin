# 会员通知管理模块

## 概述

会员通知管理模块用于管理系统向会员发送的通知和公告，支持单个通知、批量通知和全体广播功能。

## 功能特性

### 核心功能

- ✅ **通知列表管理** - 查看和管理所有通知记录
- ✅ **单个通知** - 向指定会员或全体会员发送单条通知
- ✅ **批量通知** - 向多个指定会员批量发送通知
- ✅ **广播通知** - 向所有会员发送广播通知
- ✅ **通知编辑** - 编辑已发送的通知内容
- ✅ **通知删除** - 删除通知记录（软删除）
- ✅ **搜索筛选** - 支持标题、类型、会员ID、时间范围筛选
- ✅ **权限控制** - 细粒度的权限管理

### 通知类型

1. **通知 (type=1)** - 用于个人消息、交易通知、账户变动等
2. **公告 (type=2)** - 用于系统公告、活动通知、维护通知等

### 接收范围

- **指定会员** - 发送给单个或多个特定会员
- **全体会员** - 广播给所有会员 (member_id = 0)

## 目录结构

```
src/modules/member/views/MemberNotice/
├── Index.vue                           # 主页面组件
└── components/
    ├── GetTableColumns.tsx            # 表格列配置
    ├── GetSearchItems.tsx             # 搜索项配置
    └── GetFormItems.tsx               # 表单项配置（单个/批量/广播）

src/modules/member/api/
└── MemberNotice.ts                    # API接口定义
```

## API 接口

### 基础接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/admin/member_notice/list` | GET | 获取通知列表（分页） |
| `/admin/member_notice/{id}` | GET | 获取通知详情 |
| `/admin/member_notice` | POST | 创建单个通知 |
| `/admin/member_notice/batch` | POST | 批量创建通知 |
| `/admin/member_notice/broadcast` | POST | 发送全体通知（广播） |
| `/admin/member_notice/{id}` | PUT | 更新通知 |
| `/admin/member_notice/{id}` | DELETE | 删除单个通知 |
| `/admin/member_notice/batch` | DELETE | 批量删除通知 |

### 数据结构

**MemberNoticeVo**
```typescript
interface MemberNoticeVo {
  id: number                 // 通知ID
  title: string              // 通知标题
  type: number               // 通知类型：1=通知, 2=公告
  type_text?: string         // 类型文本（后端返回）
  content: string            // 通知内容
  member_id: number          // 会员ID，0表示全体会员
  click_num: number          // 查看次数
  created_by: number         // 创建人ID
  updated_by: number         // 更新人ID
  remark?: string            // 备注
  created_at: string         // 创建时间
  updated_at: string         // 更新时间
}
```

## 权限配置

| 权限代码 | 说明 | 关联功能 |
|----------|------|----------|
| `member:notice:list` | 查看通知列表 | 列表查询 |
| `member:notice:detail` | 查看通知详情 | 详情查询 |
| `member:notice:create` | 创建通知 | 单个通知、批量通知 |
| `member:notice:update` | 更新通知 | 编辑通知 |
| `member:notice:delete` | 删除通知 | 删除通知 |
| `member:notice:broadcast` | 发送全体通知 | 广播通知 |

## 使用说明

### 1. 创建单个通知

1. 点击"创建通知"按钮
2. 填写通知标题、类型、内容
3. 指定接收会员ID（0表示全体会员）
4. 可选填写备注信息
5. 点击确定完成创建

### 2. 批量通知

1. 点击"批量通知"按钮
2. 填写通知标题、类型、内容
3. 在"接收会员"输入框中输入会员ID列表
   - 支持逗号分隔：`123,456,789`
   - 支持换行分隔
4. 点击确定，系统将为每个会员创建一条通知

### 3. 广播通知

1. 点击"广播通知"按钮
2. 填写通知标题、类型、内容
3. 系统提示"此通知将发送给所有会员"
4. 点击确定完成广播
5. 通知的 `member_id` 自动设置为 0

### 4. 编辑通知

1. 在表格操作列点击"编辑"按钮
2. 修改通知信息
3. 点击确定保存更改

### 5. 删除通知

- **单个删除**: 点击操作列的"删除"按钮
- **批量删除**: 勾选多条记录后，点击"删除"按钮

### 6. 搜索筛选

支持以下筛选条件：
- 通知标题关键词搜索
- 通知类型筛选（通知/公告）
- 会员ID精确搜索
- 创建时间范围筛选

## 使用场景

### 场景1：会员充值通知

```typescript
// 会员充值成功后，自动发送通知
{
  title: "充值成功",
  type: 1,
  content: "您已成功充值100元，当前余额：500元",
  member_id: 123,
  remark: "充值通知"
}
```

### 场景2：VIP会员活动通知

```typescript
// 向所有VIP会员发送活动通知
{
  title: "VIP专属活动",
  type: 2,
  content: "本周末VIP会员专享优惠活动",
  member_ids: [101, 102, 103, 104],
  remark: "VIP营销活动"
}
```

### 场景3：系统维护公告

```typescript
// 发送全站系统维护公告
{
  title: "系统维护公告",
  type: 2,
  content: "系统将于今晚22:00-23:00进行维护，请提前做好准备",
  remark: "重要公告"
}
```

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

## WebSocket 推送机制

### 推送流程

```
后台创建通知 → 保存到数据库
            ↓
         推送到消息队列
            ↓
      队列消费者处理
            ↓
    WebSocket 实时推送给在线会员
```

### 推送规则

- **个人通知** (`member_id > 0`): 只推送给指定会员
- **全体广播** (`member_id = 0`): 推送给所有在线会员
- **离线会员**: 登录后可通过客户端API查询到未读通知

### WebSocket 推送格式

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

## 注意事项

1. **权限配置**: 确保后台管理员具备相应的权限才能操作
2. **数据验证**:
   - 标题最大200字符
   - 内容最大1000字符
   - 备注最大500字符
3. **软删除**: 删除操作为软删除，数据仍保留在数据库中
4. **批量会员ID**: 输入时注意格式，支持逗号或换行分隔
5. **全体广播**: `member_id = 0` 表示全体会员，谨慎使用

## 技术栈

- **前端框架**: Vue 3 + TypeScript
- **UI组件**: Element Plus
- **表格组件**: MaProTable
- **表单组件**: MaForm
- **状态管理**: Vue Composition API
- **HTTP请求**: useHttp hook

## 配合客户端 API

会员端可以通过以下 API 查询和管理自己的通知：

- `GET /api/member_notice/list` - 获取通知列表
- `GET /api/member_notice/unread_count` - 获取未读数量
- `POST /api/member_notice/{id}/read` - 标记单个已读
- `POST /api/member_notice/batch_read` - 批量标记已读
- `GET /api/member_notice/{id}` - 获取通知详情

详细说明请参考 **客户端会员通知API接口文档**。

## 更新日志

详见 [CHANGELOG.md](./CHANGELOG.md)

---

**维护者**: Development Team
**最后更新**: 2025-11-06
**版本**: v1.0.0
