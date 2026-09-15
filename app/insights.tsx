import * as React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '../components/Text';
import { Container } from '../components/Container';
import { RightRailLayout } from '../components/RightRailLayout';
import { ScreenHeader } from '../components/ScreenHeader';
import { useColors } from '../lib/theme';
import { spacing } from '../constants/theme';

/**
 * Industry Insights & Reports. Mirrors what AED already publishes so the app
 * reads as AED's own, not a generic feed. Report rows are placeholders in this
 * POC: the live versions would read from the AED portal.
 */
type Report = {
  title: string;
  blurb: string;
  cadence: string;
  forthcoming?: boolean;
};

const REPORTS: Report[] = [
  {
    title: 'Cost of Doing Business Report',
    blurb: 'Balance sheet, income and expense, performance by sales volume, employee metrics.',
    cadence: 'Annual',
  },
  {
    title: 'Cost of Doing Business Rental Companion',
    blurb: 'The rental side of the business, benchmarked against the main study.',
    cadence: 'Annual',
  },
  {
    title: 'Cross-Industry Compensation & Benefits Report',
    blurb: 'Salary and benefits by role, to support recruiting and retention.',
    cadence: 'Annual',
  },
  {
    title: 'Business Outlook Report',
    blurb: 'North American market forecast, commissioned from Off-Highway Research.',
    cadence: 'Quarterly',
  },
  {
    title: 'State Equipment Dealer Law Book',
    blurb: 'State by state rules governing manufacturer and dealer relationships.',
    cadence: 'Updated',
  },
  {
    title: 'Contracts Report',
    blurb: 'Forming, maintaining and terminating manufacturer agreements.',
    cadence: 'Updated',
  },
  {
    title: 'AI Companion Report',
    blurb:
      'Which dealership work AI agents can do today, how accurately, and at what cost, measured against the human baseline AED already publishes.',
    cadence: '2027 Edition',
    forthcoming: true,
  },
];

export default function InsightsScreen() {
  const colors = useColors();

  return (
    <RightRailLayout>
      <Container>
        <ScreenHeader title="Industry Insights & Reports" />

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
            Connects to the AED portal. Reports below are placeholders in this preview.
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: spacing.xl }}>
          {REPORTS.map((r) => (
            <Pressable
              key={r.title}
              style={{
                marginHorizontal: spacing.md,
                marginBottom: spacing.sm,
                padding: spacing.md,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: r.forthcoming ? colors.accent : colors.border,
                backgroundColor: r.forthcoming ? colors.accentSubtle : colors.surface,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <Text style={{ fontWeight: '700', fontSize: 15, color: colors.text, flex: 1 }}>
                  {r.title}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 0.6,
                    color: r.forthcoming ? colors.accent : colors.textMuted,
                  }}
                >
                  {r.cadence.toUpperCase()}
                </Text>
              </View>
              <Text style={{ color: colors.textSecondary, fontSize: 13, lineHeight: 19 }}>
                {r.blurb}
              </Text>
              {r.forthcoming ? (
                <Text style={{ color: colors.accent, fontSize: 12, marginTop: spacing.xs, fontWeight: '600' }}>
                  Proposed. AED and SPARK Applied Research.
                </Text>
              ) : null}
            </Pressable>
          ))}
        </ScrollView>
      </Container>
    </RightRailLayout>
  );
}
