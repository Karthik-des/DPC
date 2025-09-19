import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#64748B',
  },
  
  // Ride type indicator
  rideTypeContainer: {
    marginBottom: 12,
  },
  rideTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  driverRideBadge: {
    backgroundColor: '#09C912', // Green for driver
  },
  userRideBadge: {
    backgroundColor: '#3B82F6', // Blue for user
  },
  rideTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  
  // Ride card style
  rideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  driverRideCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#09C912', // Green for driver
  },
  userRideCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6', // Blue for user
  },
  
  // Blocked ride card
  blockedRideCard: {
    borderWidth: 2,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  
  filterContainer: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
  },
  activeFilterText: {
    color: '#1E293B',
  },
  rideList: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dateTimeContainer: {
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Countdown Container
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  countdownText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
    marginLeft: 6,
  },

  // Enhanced Cancellation Notice
  cancellationNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  
  blockedCancellationNotice: {
    backgroundColor: '#DC2626',
    borderColor: '#991B1B',
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  
  cancellationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
    marginLeft: 6,
    flex: 1,
  },

  // Enhanced Cancellation number display
  cancellationNumberContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  cancellationNumberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 6,
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cancellationNumberText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
    color: '#374151',
    flex: 1,
  },
  cancellationTimeText: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 4,
    fontStyle: 'italic',
    paddingLeft: 4,
  },
  
  // Enhanced blocked account support button
  blockedAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
    shadowColor: '#EF4444',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  blockedAccountButtonText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
    marginHorizontal: 6,
    textAlign: 'center',
  },
  
  routeContainer: {
    marginBottom: 12,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fromDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#09C912',
    marginRight: 12,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: '#E2E8F0',
    marginLeft: 4,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '500',
    flex: 1,
  },
  
  // Ride Info Container
  rideInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  rideInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rideInfoText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  costText: {
    color: '#09C912',
    fontWeight: '600',
  },
  
  // Driver Info Container (for completed rides)
  driverInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverInfoText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 6,
    fontWeight: '500',
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverRatingText: {
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 2,
    fontWeight: '600',
  },
  
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default styles;