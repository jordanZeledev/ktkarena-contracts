// AUTO-GENERATED FILE — DO NOT EDIT.
// Sources: ktkarena-api/prisma/schema.prisma
//        + ktkarena-api/src/modules/websocket/websocket.types.ts
// Regeneration flow: in ktkarena-api run `npm run generate:contracts`,
// then sync the output here (see README.md — a sync script should copy
// ktkarena-api/src/shared/contracts.ts into this file and bump the version).
export const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const EventThematic = {
  SPORT: 'SPORT',
  POLITICS: 'POLITICS',
  ENTERTAINMENT: 'ENTERTAINMENT',
  BUSINESS: 'BUSINESS',
  TECH: 'TECH',
  OTHER: 'OTHER',
  ESPORTS_GAMING: 'ESPORTS_GAMING',
  CRYPTO: 'CRYPTO',
  SCIENCE_SPACE: 'SCIENCE_SPACE',
  CULTURE_SOCIETY: 'CULTURE_SOCIETY',
} as const;
export type EventThematic = (typeof EventThematic)[keyof typeof EventThematic];

export const EventResolutionType = {
  AUTO: 'AUTO',
  SEMI_AUTO: 'SEMI_AUTO',
  MANUAL: 'MANUAL',
} as const;
export type EventResolutionType =
  (typeof EventResolutionType)[keyof typeof EventResolutionType];

export const EventResolutionStatus = {
  PENDING: 'PENDING',
  FETCHING: 'FETCHING',
  SUGGESTED: 'SUGGESTED',
  AUTO_RESOLVED: 'AUTO_RESOLVED',
  MANUALLY_RESOLVED: 'MANUALLY_RESOLVED',
  DISPUTED: 'DISPUTED',
  CANCELLED: 'CANCELLED',
} as const;
export type EventResolutionStatus =
  (typeof EventResolutionStatus)[keyof typeof EventResolutionStatus];

export const QuestionType = {
  WINNER: 'WINNER',
  YES_NO: 'YES_NO',
  OVER_UNDER: 'OVER_UNDER',
  FIRST_TO: 'FIRST_TO',
  QUALIFIED: 'QUALIFIED',
} as const;
export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

export const EventStatus = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  POOL_PHASE: 'POOL_PHASE',
  CLOSED: 'CLOSED',
  RESOLVED: 'RESOLVED',
  CANCELLED: 'CANCELLED',
} as const;
export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

export const BetStatus = {
  PENDING: 'PENDING',
  MATCHED: 'MATCHED',
  POOLED: 'POOLED',
  WON: 'WON',
  LOST: 'LOST',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const;
export type BetStatus = (typeof BetStatus)[keyof typeof BetStatus];

export const MatchStatus = {
  ACTIVE: 'ACTIVE',
  RESOLVED: 'RESOLVED',
  CANCELLED: 'CANCELLED',
} as const;
export type MatchStatus = (typeof MatchStatus)[keyof typeof MatchStatus];

export const TransactionType = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
  BET_PLACED: 'BET_PLACED',
  BET_CANCELLED: 'BET_CANCELLED',
  BET_REFUNDED: 'BET_REFUNDED',
  WIN_PAYOUT: 'WIN_PAYOUT',
  COMMISSION: 'COMMISSION',
  REFERRAL_BONUS: 'REFERRAL_BONUS',
  BONUS: 'BONUS',
  SHOP_PURCHASE: 'SHOP_PURCHASE',
} as const;
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

export const ReferralStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  EXPIRED: 'EXPIRED',
} as const;
export type ReferralStatus =
  (typeof ReferralStatus)[keyof typeof ReferralStatus];

export const ShopItemType = {
  GIF_PACK: 'GIF_PACK',
  BADGE: 'BADGE',
  AVATAR_FRAME: 'AVATAR_FRAME',
  EMOTE: 'EMOTE',
} as const;
export type ShopItemType = (typeof ShopItemType)[keyof typeof ShopItemType];

export const ShopItemRarity = {
  COMMON: 'COMMON',
  RARE: 'RARE',
  EPIC: 'EPIC',
  LEGENDARY: 'LEGENDARY',
} as const;
export type ShopItemRarity =
  (typeof ShopItemRarity)[keyof typeof ShopItemRarity];

export const ShopItemCurrency = {
  KTK: 'KTK',
  XP_UNLOCK: 'XP_UNLOCK',
  HYBRID: 'HYBRID',
} as const;
export type ShopItemCurrency =
  (typeof ShopItemCurrency)[keyof typeof ShopItemCurrency];

export const FriendshipStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  BLOCKED: 'BLOCKED',
} as const;
export type FriendshipStatus =
  (typeof FriendshipStatus)[keyof typeof FriendshipStatus];

export const ChallengeStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
} as const;
export type ChallengeStatus =
  (typeof ChallengeStatus)[keyof typeof ChallengeStatus];

export const UserReportCategory = {
  SPAM: 'SPAM',
  HARASSMENT: 'HARASSMENT',
  OFFENSIVE: 'OFFENSIVE',
  IMPERSONATION: 'IMPERSONATION',
  SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY',
  MINOR_AT_RISK: 'MINOR_AT_RISK',
  OTHER: 'OTHER',
} as const;
export type UserReportCategory =
  (typeof UserReportCategory)[keyof typeof UserReportCategory];

export const UserReportStatus = {
  PENDING: 'PENDING',
  REVIEWING: 'REVIEWING',
  ACTIONED: 'ACTIONED',
  DISMISSED: 'DISMISSED',
} as const;
export type UserReportStatus =
  (typeof UserReportStatus)[keyof typeof UserReportStatus];

export const NotificationType = {
  FRIEND_REQUEST: 'FRIEND_REQUEST',
  FRIEND_ACCEPTED: 'FRIEND_ACCEPTED',
  GROUP_INVITE: 'GROUP_INVITE',
  CHALLENGE_RECEIVED: 'CHALLENGE_RECEIVED',
  CHALLENGE_ACCEPTED: 'CHALLENGE_ACCEPTED',
  CHALLENGE_DECLINED: 'CHALLENGE_DECLINED',
  CHALLENGE_EXPIRED: 'CHALLENGE_EXPIRED',
  BET_MATCHED: 'BET_MATCHED',
  BET_WON: 'BET_WON',
  BET_LOST: 'BET_LOST',
  BET_REFUNDED: 'BET_REFUNDED',
  BET_MATCHED_P2P: 'BET_MATCHED_P2P',
  BET_MATCHED_AGGREGATED: 'BET_MATCHED_AGGREGATED',
  BET_MATCHED_CASCADE: 'BET_MATCHED_CASCADE',
  BET_PARTIALLY_MATCHED: 'BET_PARTIALLY_MATCHED',
  BET_POOLED: 'BET_POOLED',
  BET_QUEUED: 'BET_QUEUED',
  BET_CAPPED: 'BET_CAPPED',
  BET_REDIRECTED_POOL: 'BET_REDIRECTED_POOL',
  BET_QUEUE_MATCHED: 'BET_QUEUE_MATCHED',
  BET_WON_P2P: 'BET_WON_P2P',
  BET_WON_POOL: 'BET_WON_POOL',
  BET_POOL_REFUNDED: 'BET_POOL_REFUNDED',
  EVENT_STARTING_SOON: 'EVENT_STARTING_SOON',
  EVENT_RESOLVED: 'EVENT_RESOLVED',
  ACHIEVEMENT_UNLOCKED: 'ACHIEVEMENT_UNLOCKED',
  MISSION_COMPLETED: 'MISSION_COMPLETED',
  LEVEL_UP: 'LEVEL_UP',
  WELCOME: 'WELCOME',
  EVENT_NEW_FAVORITE: 'EVENT_NEW_FAVORITE',
  EVENT_POPULAR: 'EVENT_POPULAR',
  EVENT_CLOSING_SOON: 'EVENT_CLOSING_SOON',
  FRIEND_BET_PLACED: 'FRIEND_BET_PLACED',
  RANKING_OVERTAKEN: 'RANKING_OVERTAKEN',
  GROUP_MEMBER_WON: 'GROUP_MEMBER_WON',
  PREDICTION_CORRECT_NUDGE: 'PREDICTION_CORRECT_NUDGE',
  PREDICTION_STREAK_NUDGE: 'PREDICTION_STREAK_NUDGE',
  PREDICTION_WEEKLY_SUMMARY: 'PREDICTION_WEEKLY_SUMMARY',
  PREDICTION_BADGE_NUDGE: 'PREDICTION_BADGE_NUDGE',
  MISSION_DAILY_AVAILABLE: 'MISSION_DAILY_AVAILABLE',
  MISSION_ALMOST_DONE: 'MISSION_ALMOST_DONE',
  ACHIEVEMENT_NEAR: 'ACHIEVEMENT_NEAR',
  STREAK_DANGER: 'STREAK_DANGER',
  LEVEL_UP_NEAR: 'LEVEL_UP_NEAR',
  REENGAGEMENT_2D: 'REENGAGEMENT_2D',
  REENGAGEMENT_5D: 'REENGAGEMENT_5D',
  REENGAGEMENT_7D: 'REENGAGEMENT_7D',
  REENGAGEMENT_14D_BONUS: 'REENGAGEMENT_14D_BONUS',
  REENGAGEMENT_30D: 'REENGAGEMENT_30D',
  ADMIN_BROADCAST: 'ADMIN_BROADCAST',
  PREDICTION_TIER_PROMOTED: 'PREDICTION_TIER_PROMOTED',
  SHOP_ITEM_UNLOCKED: 'SHOP_ITEM_UNLOCKED',
  SHOP_NEW_ITEM: 'SHOP_NEW_ITEM',
  SHOP_LIMITED_ENDING: 'SHOP_LIMITED_ENDING',
  NEW_FOLLOWER: 'NEW_FOLLOWER',
  FEED_POST_LIKED: 'FEED_POST_LIKED',
  FEED_POST_COMMENTED: 'FEED_POST_COMMENTED',
  FEED_POST_REPOSTED: 'FEED_POST_REPOSTED',
} as const;
export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export const NotificationScheduleStatus = {
  PENDING: 'PENDING',
  SENT: 'SENT',
  READ: 'READ',
  SKIPPED: 'SKIPPED',
  FAILED: 'FAILED',
} as const;
export type NotificationScheduleStatus =
  (typeof NotificationScheduleStatus)[keyof typeof NotificationScheduleStatus];

export const MissionType = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
} as const;
export type MissionType = (typeof MissionType)[keyof typeof MissionType];

export const MissionAction = {
  LOGIN: 'LOGIN',
  PLACE_BET: 'PLACE_BET',
  WIN_BET: 'WIN_BET',
  CLAIM_DAILY_REWARD: 'CLAIM_DAILY_REWARD',
  REFER_FRIEND: 'REFER_FRIEND',
} as const;
export type MissionAction = (typeof MissionAction)[keyof typeof MissionAction];

export const ReactionType = {
  EMOJI: 'EMOJI',
  GIF: 'GIF',
  SONIC_STICKER: 'SONIC_STICKER',
} as const;
export type ReactionType = (typeof ReactionType)[keyof typeof ReactionType];

export const LogSeverity = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL',
} as const;
export type LogSeverity = (typeof LogSeverity)[keyof typeof LogSeverity];

export const ReviewStatus = {
  PENDING: 'PENDING',
  DISMISSED: 'DISMISSED',
  ACTIONED: 'ACTIONED',
} as const;
export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];

export const TierLevel = {
  DISCOVERY: 'DISCOVERY',
  STANDARD: 'STANDARD',
  PREMIUM: 'PREMIUM',
  ELITE: 'ELITE',
  INSTITUTIONAL: 'INSTITUTIONAL',
} as const;
export type TierLevel = (typeof TierLevel)[keyof typeof TierLevel];

export const TierStatus = {
  GREEN: 'GREEN',
  YELLOW: 'YELLOW',
  ORANGE: 'ORANGE',
  RED: 'RED',
} as const;
export type TierStatus = (typeof TierStatus)[keyof typeof TierStatus];

export const MatchSource = {
  INTRA_TIER: 'INTRA_TIER',
  CASCADE_UP: 'CASCADE_UP',
  CASCADE_DOWN: 'CASCADE_DOWN',
  CHALLENGE: 'CHALLENGE',
} as const;
export type MatchSource = (typeof MatchSource)[keyof typeof MatchSource];

export const PoolParticipationStatus = {
  ACTIVE: 'ACTIVE',
  WON: 'WON',
  LOST: 'LOST',
  REFUNDED: 'REFUNDED',
} as const;
export type PoolParticipationStatus =
  (typeof PoolParticipationStatus)[keyof typeof PoolParticipationStatus];

export const QueueStatus = {
  WAITING: 'WAITING',
  PARTIALLY_MATCHED: 'PARTIALLY_MATCHED',
  FULLY_MATCHED: 'FULLY_MATCHED',
  POOLED: 'POOLED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
} as const;
export type QueueStatus = (typeof QueueStatus)[keyof typeof QueueStatus];

export const CascadeMode = {
  DISABLED: 'DISABLED',
  AUTO: 'AUTO',
  MANUAL: 'MANUAL',
} as const;
export type CascadeMode = (typeof CascadeMode)[keyof typeof CascadeMode];

export const PoolAcceptance = {
  NEVER: 'NEVER',
  IF_NEEDED: 'IF_NEEDED',
  ALWAYS: 'ALWAYS',
} as const;
export type PoolAcceptance =
  (typeof PoolAcceptance)[keyof typeof PoolAcceptance];

export const XPReason = {
  BET_PLACED: 'BET_PLACED',
  BET_WON: 'BET_WON',
  BET_WON_HIGH_ODDS: 'BET_WON_HIGH_ODDS',
  DAILY_FIRST_BET: 'DAILY_FIRST_BET',
  MISSION_COMPLETED: 'MISSION_COMPLETED',
  REFERRAL_SIGNUP: 'REFERRAL_SIGNUP',
  REFERRAL_FIRST_BET: 'REFERRAL_FIRST_BET',
  WIN_STREAK_BONUS: 'WIN_STREAK_BONUS',
  EMAIL_VERIFIED: 'EMAIL_VERIFIED',
  TWO_FACTOR_ENABLED: 'TWO_FACTOR_ENABLED',
  PROFILE_COMPLETED: 'PROFILE_COMPLETED',
  LEVEL_UP_BONUS: 'LEVEL_UP_BONUS',
  ADMIN_GRANT: 'ADMIN_GRANT',
  ACHIEVEMENT_UNLOCKED: 'ACHIEVEMENT_UNLOCKED',
  GROUP_CREATED: 'GROUP_CREATED',
  GROUP_INVITE_ACCEPTED: 'GROUP_INVITE_ACCEPTED',
  DAILY_LOGIN: 'DAILY_LOGIN',
  PREDICTION_MADE: 'PREDICTION_MADE',
  PREDICTION_CORRECT: 'PREDICTION_CORRECT',
  SOCIAL_FRIEND_BET: 'SOCIAL_FRIEND_BET',
  GROUP_BET_WON: 'GROUP_BET_WON',
  WEEKLY_CHALLENGE: 'WEEKLY_CHALLENGE',
  FEED_PRONOSTIC: 'FEED_PRONOSTIC',
  FEED_SHARE_BET: 'FEED_SHARE_BET',
  FEED_COMMENT: 'FEED_COMMENT',
} as const;
export type XPReason = (typeof XPReason)[keyof typeof XPReason];

export const GroupVisibility = {
  PRIVATE: 'PRIVATE',
  SEMI_PRIVATE: 'SEMI_PRIVATE',
} as const;
export type GroupVisibility =
  (typeof GroupVisibility)[keyof typeof GroupVisibility];

export const GroupMemberRole = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
} as const;
export type GroupMemberRole =
  (typeof GroupMemberRole)[keyof typeof GroupMemberRole];

export const GroupInvitationStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  EXPIRED: 'EXPIRED',
} as const;
export type GroupInvitationStatus =
  (typeof GroupInvitationStatus)[keyof typeof GroupInvitationStatus];

export const GroupActivityType = {
  MEMBER_JOINED: 'MEMBER_JOINED',
  MEMBER_LEFT: 'MEMBER_LEFT',
  MEMBER_BANNED: 'MEMBER_BANNED',
  BET_PLACED: 'BET_PLACED',
  BET_MATCHED: 'BET_MATCHED',
  BET_WON: 'BET_WON',
  BET_LOST: 'BET_LOST',
  RANKING_CHANGE: 'RANKING_CHANGE',
  GROUP_CREATED: 'GROUP_CREATED',
  GROUP_UPDATED: 'GROUP_UPDATED',
  SEASON_STARTED: 'SEASON_STARTED',
  SEASON_ENDED: 'SEASON_ENDED',
  CHALLENGE_SENT: 'CHALLENGE_SENT',
} as const;
export type GroupActivityType =
  (typeof GroupActivityType)[keyof typeof GroupActivityType];

export const ExperimentStatus = {
  DRAFT: 'DRAFT',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  CONCLUDED: 'CONCLUDED',
  CANCELLED: 'CANCELLED',
} as const;
export type ExperimentStatus =
  (typeof ExperimentStatus)[keyof typeof ExperimentStatus];

export const GroupMessageType = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  SYSTEM: 'SYSTEM',
  VOICE_MESSAGE: 'VOICE_MESSAGE',
  EVENT_SHARE: 'EVENT_SHARE',
  SONIC_STICKER: 'SONIC_STICKER',
} as const;
export type GroupMessageType =
  (typeof GroupMessageType)[keyof typeof GroupMessageType];

export const PredictionResult = {
  PENDING: 'PENDING',
  CORRECT: 'CORRECT',
  INCORRECT: 'INCORRECT',
  CANCELLED: 'CANCELLED',
} as const;
export type PredictionResult =
  (typeof PredictionResult)[keyof typeof PredictionResult];

export const EventSuggestionStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
  RESULT_READY: 'RESULT_READY',
  RESOLVED: 'RESOLVED',
} as const;
export type EventSuggestionStatus =
  (typeof EventSuggestionStatus)[keyof typeof EventSuggestionStatus];

export const EventChatMessageType = {
  TEXT: 'TEXT',
  STICKER: 'STICKER',
  SYSTEM: 'SYSTEM',
  SONIC_STICKER: 'SONIC_STICKER',
} as const;
export type EventChatMessageType =
  (typeof EventChatMessageType)[keyof typeof EventChatMessageType];

export const DirectMessageType = {
  TEXT: 'TEXT',
  STICKER: 'STICKER',
  SONIC_STICKER: 'SONIC_STICKER',
  EVENT_SHARE: 'EVENT_SHARE',
  CHALLENGE: 'CHALLENGE',
  VOICE_MESSAGE: 'VOICE_MESSAGE',
  IMAGE: 'IMAGE',
  SYSTEM: 'SYSTEM',
} as const;
export type DirectMessageType =
  (typeof DirectMessageType)[keyof typeof DirectMessageType];

export const SonicStickerReportStatus = {
  PENDING: 'PENDING',
  DISMISSED: 'DISMISSED',
  ACTIONED: 'ACTIONED',
} as const;
export type SonicStickerReportStatus =
  (typeof SonicStickerReportStatus)[keyof typeof SonicStickerReportStatus];

export const FeedPostType = {
  PRONOSTIC: 'PRONOSTIC',
  BET_HIGHLIGHT: 'BET_HIGHLIGHT',
  HOT_EVENT: 'HOT_EVENT',
  REPOST: 'REPOST',
} as const;
export type FeedPostType = (typeof FeedPostType)[keyof typeof FeedPostType];

export const AlertRuleType = {
  DAU_DROP: 'DAU_DROP',
  ERROR_RATE: 'ERROR_RATE',
  FRAUD_PENDING: 'FRAUD_PENDING',
  QUEUE_DEPTH: 'QUEUE_DEPTH',
  API_LATENCY_P95: 'API_LATENCY_P95',
} as const;
export type AlertRuleType = (typeof AlertRuleType)[keyof typeof AlertRuleType];

export const AlertSeverity = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL',
} as const;
export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity];

export const AlertStatus = {
  UNREAD: 'UNREAD',
  ACKNOWLEDGED: 'ACKNOWLEDGED',
  RESOLVED: 'RESOLVED',
} as const;
export type AlertStatus = (typeof AlertStatus)[keyof typeof AlertStatus];

export const WebhookType = {
  SLACK: 'SLACK',
  DISCORD: 'DISCORD',
} as const;
export type WebhookType = (typeof WebhookType)[keyof typeof WebhookType];

export const WebhookSeverityThreshold = {
  CRITICAL: 'CRITICAL',
  WARNING: 'WARNING',
  INFO: 'INFO',
  OFF: 'OFF',
} as const;
export type WebhookSeverityThreshold =
  (typeof WebhookSeverityThreshold)[keyof typeof WebhookSeverityThreshold];

// === WebSocket (Socket.IO) — noms d’événements ===
// Source: src/modules/websocket/websocket.types.ts.
// Les clients DOIVENT référencer ces constantes — jamais de littéraux.
// Canal de cotes live : le nom canonique est WsEvent.EVENT_ODDS_UPDATE
// ('event:odds_update').

export const WsEvent = {
  NOTIFICATION_NEW: 'notification:new',
  NOTIFICATION_COUNT: 'notification:count',
  BET_MATCHED: 'bet:matched',
  BET_STATUS_CHANGED: 'bet:status_changed',
  CHAT_MESSAGE: 'chat:message',
  CHAT_REACTION: 'chat:reaction',
  EVENT_ODDS_UPDATE: 'event:odds_update',
  EVENT_RESOLVED: 'event:resolved',
  EVENT_NEW: 'event:new',
  EVENT_STATUS_CHANGED: 'event:status_changed',
  EVENT_POOL_PHASE_IMMINENT: 'event:pool_phase_imminent',
  EVENT_POOL_PHASE_STARTED: 'event:pool_phase_started',
  EVENT_POOL_PHASE_COMPLETED: 'event:pool_phase_completed',
  EVENT_BETTING_LOCKED: 'event:betting_locked',
  BET_POOL_PHASE_ACCEPTED: 'bet:pool_phase_accepted',
  BET_POOL_PHASE_REFUNDED: 'bet:pool_phase_refunded',
  WALLET_BALANCE_UPDATE: 'wallet:balance_update',
  XP_GAINED: 'xp:gained',
  ACHIEVEMENT_UNLOCKED: 'achievement:unlocked',
  LEADERBOARD_UPDATE: 'leaderboard:update',
  EVENT_CHAT_MESSAGE: 'event_chat:message',
  EVENT_CHAT_REACTION: 'event_chat:reaction',
  EVENT_CHAT_ONLINE_COUNT: 'event_chat:online_count',
  EVENT_CHAT_TYPING: 'event_chat:typing',
  EVENT_CHAT_HISTORY: 'event_chat:history',
  EVENT_CHAT_ERROR: 'event_chat:error',
  EVENT_CHAT_RESOLVED: 'event_chat:resolved',
  EVENT_CHAT_MOMENTUM: 'event_chat:momentum',
  EVENT_CHAT_BET_TICKER: 'event_chat:bet_ticker',
  EVENT_CHAT_MILESTONE: 'event_chat:milestone',
  DM_MESSAGE: 'dm:message',
  DM_MESSAGE_DELETED: 'dm:message_deleted',
  DM_MESSAGE_UPDATED: 'dm:message_updated',
  DM_READ: 'dm:read',
  DM_TYPING: 'dm:typing',
  DM_DELIVERED: 'dm:delivered',
  DM_MESSAGE_REACTION: 'dm:message_reaction',
  DM_MESSAGE_TRANSCRIBED: 'dm:message_transcribed',
  DM_CONVERSATION_UPDATED: 'dm:conversation_updated',
  DM_UNREAD_COUNT: 'dm:unread_count',
  SSTK_CONVERSION_COMPLETE: 'sstk:conversion_complete',
  SSTK_CONVERSION_FAILED: 'sstk:conversion_failed',
  FEED_NEW_POST: 'feed:new_post',
  FEED_REACTION: 'feed:reaction',
  FEED_COMMENT: 'feed:comment',
  GROUP_MESSAGE: 'group:message',
  GROUP_MESSAGE_DELETED: 'group:message_deleted',
  GROUP_MESSAGE_PINNED: 'group:message_pinned',
  GROUP_MESSAGE_UNPINNED: 'group:message_unpinned',
  GROUP_MESSAGE_REACTION: 'group:message_reaction',
  GROUP_BET_PLACED: 'group:bet_placed',
  GROUP_BET_RESOLVED: 'group:bet_resolved',
  GROUP_MEMBER_JOINED: 'group:member_joined',
  GROUP_MEMBER_LEFT: 'group:member_left',
  GROUP_READ: 'group:read',
  CALL_INCOMING: 'call:incoming',
  CALL_RINGING: 'call:ringing',
  CALL_ACCEPTED: 'call:accepted',
  CALL_REJECTED: 'call:rejected',
  CALL_ENDED: 'call:ended',
  CALL_ERROR: 'call:error',
  CALL_OFFER: 'call:offer',
  CALL_ANSWER: 'call:answer',
  CALL_ICE_CANDIDATE: 'call:ice-candidate',
} as const;
export type WsEvent = (typeof WsEvent)[keyof typeof WsEvent];

export const WsClientEvent = {
  JOIN_EVENT: 'join:event',
  LEAVE_EVENT: 'leave:event',
  JOIN_MATCH: 'join:match',
  LEAVE_MATCH: 'leave:match',
  PING: 'ping',
  ODDS_LOBBY_JOIN: 'odds_lobby:join',
  ODDS_LOBBY_LEAVE: 'odds_lobby:leave',
  SEND_CHAT_MESSAGE: 'event_chat:send',
  TOGGLE_CHAT_REACTION: 'event_chat:toggle_reaction',
  CHAT_TYPING: 'event_chat:typing',
  DM_SEND: 'dm:send',
  DM_READ: 'dm:read',
  DM_TYPING: 'dm:typing',
  DM_DELIVERED: 'dm:delivered',
  CALL_INITIATE: 'call:initiate',
  CALL_ACCEPT: 'call:accept',
  CALL_REJECT: 'call:reject',
  CALL_HANGUP: 'call:hangup',
  CALL_OFFER: 'call:offer',
  CALL_ANSWER: 'call:answer',
  CALL_ICE_CANDIDATE: 'call:ice-candidate',
} as const;
export type WsClientEvent = (typeof WsClientEvent)[keyof typeof WsClientEvent];

/** @deprecated Alias de compat émis en doublon du nom canonique —
 * ne pas utiliser pour du neuf. Retrait suivi dans DEPRECATION.md. */
export const WS_LEGACY_ODDS_UPDATE = 'odds:update';
