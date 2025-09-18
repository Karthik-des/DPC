import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFD',
    marginTop:20,
  },

  // Top Header (like RidePlan)
  header: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',

  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  placeholder: {
    width: 40,
    height: 40,
  },

  // Scroll View
  scrollView: {
    flex: 1,
  },

  // Profile Main Card
  profileMainCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16, // Adjusted marginTop to prevent overlap
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 16,
  },

  profileAvatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },

  avatarGradientRing: {
    width: 112,
    height: 112,
    borderRadius: 56,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarInner: {
    width: 106,
    height: 106,
    borderRadius: 53,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarLetter: {
    fontSize: 42,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -1,
  },

  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  onlineInnerDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
  },

  // Verification Badges
  verificationBadges: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },

  trustRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },

  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  trustText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },

  badgePending: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  badgePendingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 6,
  },

  badgeNew: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  badgeNewText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3B82F6',
    marginLeft: 6,
  },

  // Action Buttons
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },

  primaryActionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#09C912',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },

  btnGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  primaryBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },

  secondaryActionBtn: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#09C912',
  },

  secondaryBtnText: {
    color: '#09C912',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },

  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },

  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },

  // Section Cards
  sectionCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  sectionIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },

  // About Section
  aboutText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
  },

  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },

  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },

  // Verification List
  verificationList: {
    gap: 12,
  },

  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 14,
    borderRadius: 16,
  },

  verIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  verIconPending: {
    backgroundColor: '#FEF3C7',
  },

  verIconSuccess: {
    backgroundColor: '#D1FAE5',
  },

  verItemContent: {
    flex: 1,
  },

  verItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },

  verItemStatus: {
    fontSize: 13,
    color: '#6B7280',
  },

  verStatusBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  verStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },

  // Empty State
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },

  emptyIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9CA3AF',
    marginBottom: 8,
  },

  emptyDescription: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
  },

  // Info List
  infoList: {
    gap: 12,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  infoIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  infoLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#4B5563',
  },

  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },

  // Report Section
  reportSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },

  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: '#FEF2F2',
  },

  reportText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },

  bottomSpacer: {
    height: 32,
  },
});

export default styles;


