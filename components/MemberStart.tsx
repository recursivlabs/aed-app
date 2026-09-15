import * as React from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from './Text';
import { useColors } from '../lib/theme';
import { useAuth } from '../lib/auth';
import { useCommunities } from '../lib/hooks';
import { spacing, radius } from '../constants/theme';

/**
 * The member cold start.
 *
 * A new member's feed is empty on day one, and a generic "follow people to
 * fill your feed" panel asks them to do work before they have been given any
 * reason to. That is the first impression this app cannot afford.
 *
 * So the empty feed is not empty: it is the orientation screen. It leads with
 * the one action that pays off immediately (join your committees), then shows
 * the things an AED member already values — the size of the vetted network,
 * the Summit date, and the benchmarking they already pay for.
 */

const STATS = [
  { n: '600', label: 'Dealer members' },
  { n: '200', label: 'Manufacturers' },
  { n: '200', label: 'Service providers' },
];

export function MemberStart() {
  const colors = useColors();
  const router = useRouter();
  const { sdk } = useAuth();
  const { communities } = useCommunities(100, { memberOnly: false });
  const [joining, setJoining] = React.useState<Record<string, boolean>>({});
  const [joined, setJoined] = React.useState<Record<string, boolean>>({});

  const groups = (communities || []).slice(0, 8);

  const join = React.useCallback(async (id: string) => {
    if (!sdk || joining[id]) return;
    setJoining((s) => ({ ...s, [id]: true }));
    try {
      await sdk.communities.join(id);
      setJoined((s) => ({ ...s, [id]: true }));
    } catch {
      // Leave the button in its resting state; the row is still tappable.
    } finally {
      setJoining((s) => ({ ...s, [id]: false }));
    }
  }, [sdk, joining]);

  const card = {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
  } as const;

  return (
    <View style={{ padding: spacing.md, gap: spacing.md }}>
      {/* Orientation */}
      <View style={{ gap: spacing.xs, paddingHorizontal: spacing.xs }}>
        <Text variant="h2" color={colors.text}>Welcome to AED Connect</Text>
        <Text variant="body" color={colors.textSecondary} style={{ lineHeight: 22 }}>
          The members-only network for equipment distribution. Your feed fills as you
          join committees and follow the people you do business with.
        </Text>
      </View>

      {/* The vetted network, which is what members actually pay for */}
      <View style={[card, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        {STATS.map((s) => (
          <View key={s.label} style={{ alignItems: 'center', flex: 1 }}>
            <Text variant="h2" color={colors.accent} style={{ fontSize: 24 }}>{s.n}</Text>
            <Text variant="caption" color={colors.textSecondary} align="center">{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Primary action: join committees */}
      <View style={[card, { gap: spacing.sm }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <Ionicons name="people-outline" size={18} color={colors.accent} />
          <Text variant="h3" color={colors.text} style={{ fontSize: 16 }}>Join your committees</Text>
        </View>
        <Text variant="caption" color={colors.textSecondary}>
          Pick the markets and brands you work in. Their posts start appearing here.
        </Text>

        <View style={{ gap: spacing.xs, marginTop: spacing.xs }}>
          {groups.map((g: any) => {
            const isMember = g.is_member === true || joined[g.id];
            return (
              <View
                key={g.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderSubtle,
                }}
              >
                <Pressable
                  onPress={() => router.push(`/community/${g.id}` as any)}
                  style={{ flex: 1 }}
                >
                  <Text variant="body" color={colors.text}>{g.name}</Text>
                  <Text variant="caption" color={colors.textMuted}>
                    {g.member_count || 0} members · {g.post_count || 0} posts
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => join(g.id)}
                  disabled={isMember}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: spacing.md,
                    borderRadius: radius.full,
                    borderWidth: 1,
                    borderColor: isMember ? colors.border : colors.accent,
                    backgroundColor: isMember ? 'transparent' : colors.accent,
                  }}
                >
                  <Text
                    variant="caption"
                    color={isMember ? colors.textMuted : colors.textOnAccent}
                    style={{ fontWeight: '600' }}
                  >
                    {isMember ? 'Joined' : joining[g.id] ? '…' : 'Join'}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        <Pressable onPress={() => router.push('/groups' as any)} style={{ paddingTop: spacing.xs }}>
          <Text variant="caption" color={colors.accent}>See all committees</Text>
        </Pressable>
      </View>

      {/* Two things every member already cares about */}
      <View style={{ flexDirection: 'row', gap: spacing.md, flexWrap: 'wrap' }}>
        <Pressable
          onPress={() => router.push('/events' as any)}
          style={[card, { flex: 1, minWidth: 220, gap: 4 }]}
        >
          <Ionicons name="calendar-outline" size={18} color={colors.accent} />
          <Text variant="h3" color={colors.text} style={{ fontSize: 15 }}>AED Summit 2027</Text>
          <Text variant="caption" color={colors.textSecondary}>
            January 25 to 27. The discussion runs here before and after the show.
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/insights' as any)}
          style={[card, { flex: 1, minWidth: 220, gap: 4 }]}
        >
          <Ionicons name="bar-chart-outline" size={18} color={colors.accent} />
          <Text variant="h3" color={colors.text} style={{ fontSize: 15 }}>Benchmarking</Text>
          <Text variant="caption" color={colors.textSecondary}>
            Cost of Doing Business and five more reports, with the numbers behind them.
          </Text>
        </Pressable>
      </View>

      {/* Directory: the asset members join for */}
      <Pressable onPress={() => router.push('/(tabs)/discover' as any)} style={[card, { gap: 4 }]}>
        <Ionicons name="search-outline" size={18} color={colors.accent} />
        <Text variant="h3" color={colors.text} style={{ fontSize: 15 }}>Find a decision maker</Text>
        <Text variant="caption" color={colors.textSecondary}>
          Search the member directory by region, market and company size, then message
          them directly. Everyone here is a vetted AED member.
        </Text>
      </Pressable>
    </View>
  );
}
