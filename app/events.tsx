import * as React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '../components/Text';
import { Container } from '../components/Container';
import { RightRailLayout } from '../components/RightRailLayout';
import { ScreenHeader } from '../components/ScreenHeader';
import { useColors } from '../lib/theme';
import { spacing } from '../constants/theme';

/**
 * Upcoming Events and Educational Seminars.
 *
 * The point of this screen in the POC: every event carries a discussion that
 * runs BEFORE and AFTER the date. AED's stated problem is that engagement is
 * strong inside the room and disappears either side of it.
 */
type Ev = {
  title: string;
  when: string;
  where: string;
  kind: 'Summit' | 'Seminar' | 'Committee';
  threadCount: number;
  featured?: boolean;
};

const EVENTS: Ev[] = [
  {
    title: 'AED Summit 2027',
    when: 'January 25 to 27, 2027',
    where: 'Three days, the whole industry',
    kind: 'Summit',
    threadCount: 128,
    featured: true,
  },
  {
    title: 'Emerging Leaders monthly call',
    when: 'First Tuesday, monthly',
    where: 'Video',
    kind: 'Committee',
    threadCount: 34,
  },
  {
    title: 'Rental operations seminar',
    when: 'October 2026',
    where: 'Regional',
    kind: 'Seminar',
    threadCount: 12,
  },
  {
    title: 'Parts and service management',
    when: 'November 2026',
    where: 'Regional',
    kind: 'Seminar',
    threadCount: 9,
  },
  {
    title: 'Dealer sales training',
    when: 'On site, by request',
    where: 'Your dealership',
    kind: 'Seminar',
    threadCount: 6,
  },
];

export default function EventsScreen() {
  const colors = useColors();
  const router = useRouter();

  return (
    <RightRailLayout>
      <Container>
        <ScreenHeader title="Events & Seminars" />

        <View
          style={{
            marginHorizontal: spacing.md,
            marginBottom: spacing.md,
            padding: spacing.sm,
            borderRadius: 8,
            backgroundColor: colors.accentSubtle,
            borderWidth: 1,
            borderColor: colors.accentMuted,
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
          }}
        >
          <Ionicons name="link-outline" size={15} color={colors.accent} />
          <Text style={{ color: colors.textSecondary, fontSize: 12, flex: 1 }}>
            Registration connects to the AED portal. Listings below are placeholders.
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
          {EVENTS.map((e) => (
            <View
              key={e.title}
              style={{
                marginHorizontal: spacing.md,
                marginBottom: spacing.sm,
                padding: spacing.md,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: e.featured ? colors.accent : colors.border,
                backgroundColor: e.featured ? colors.accentSubtle : colors.surface,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '700',
                  letterSpacing: 0.6,
                  color: colors.accent,
                  marginBottom: 4,
                }}
              >
                {e.kind.toUpperCase()}
              </Text>
              <Text style={{ fontWeight: '700', fontSize: 16, color: colors.text }}>{e.title}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>
                {e.when} · {e.where}
              </Text>

              <Pressable
                onPress={() => router.push('/groups')}
                style={{
                  marginTop: spacing.sm,
                  paddingVertical: 8,
                  paddingHorizontal: spacing.sm,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.border,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  alignSelf: 'flex-start',
                }}
              >
                <Ionicons name="chatbubbles-outline" size={15} color={colors.accent} />
                <Text style={{ color: colors.text, fontSize: 13, fontWeight: '600' }}>
                  Discussion
                </Text>
                <Text style={{ color: colors.textMuted, fontSize: 13 }}>{e.threadCount}</Text>
              </Pressable>

              <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: spacing.xs }}>
                Runs before and after the date, so the conversation does not stop when the room empties.
              </Text>
            </View>
          ))}
        </ScrollView>
      </Container>
    </RightRailLayout>
  );
}
