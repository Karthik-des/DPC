import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Switch,
  RefreshControl,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from './NotificationCss';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    pushNotifications: true,
    rideUpdates: true,
    promotions: true,
    safety: true,
    payment: true,
    sound: true,
    vibration: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [isReloaded, setIsReloaded] = useState(true); // New state to track reload

  // Sample notifications data with single dots
  useEffect(() => {
    setNotifications([
      {
        id: '1',
        type: 'ride',
        icon: 'car',
        title: 'Ride Completed Successfully',
        message: 'Thank you for choosing Bla Bla! Your ride from Indiranagar to MG Road has been completed.',
        time: '2 minutes ago',
        isRead: false,
        priority: 'high',
        color: '#28a745',
        actionButton: 'Rate Driver'
      },
      {
        id: '2',
        type: 'promotion',
        icon: 'gift',
        title: '50% Off on Your Next Ride!',
        message: 'Use code SAVE50 and get 50% discount on your next ride. Valid till tomorrow!',
        time: '1 hour ago',
        isRead: false,
        priority: 'medium',
        color: '#FFD700',
        actionButton: 'Use Code'
      },
      {
        id: '3',
        type: 'safety',
        icon: 'shield-checkmark',
        title: 'Safety Tips Updated',
        message: 'New safety guidelines have been added. Please review them for a safer ride experience.',
        time: '3 hours ago',
        isRead: true,
        priority: 'medium',
        color: '#0089d8',
        actionButton: 'View Tips'
      },
      {
        id: '4',
        type: 'payment',
        icon: 'card',
        title: 'Payment Method Added',
        message: 'Your new payment method has been successfully added to your account.',
        time: '1 day ago',
        isRead: true,
        priority: 'low',
        color: '#17a2b8',
        actionButton: null
      },
      {
        id: '5',
        type: 'ride',
        icon: 'time',
        title: 'Driver Arriving Soon',
        message: 'Your driver will reach the pickup location in 3 minutes. Please be ready.',
        time: '2 days ago',
        isRead: true,
        priority: 'high',
        color: '#fd7e14',
        actionButton: 'Track Driver'
      },
      {
        id: '6',
        type: 'system',
        icon: 'information-circle',
        title: 'App Update Available',
        message: 'New features and improvements are available. Update now for better experience.',
        time: '3 days ago',
        isRead: false,
        priority: 'low',
        color: '#6f42c1',
        actionButton: 'Update Now'
      },
    ]);
    setIsReloaded(true); // Set reload state on initial load
  }, []);

  // Reset isReloaded when navigating back
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsReloaded(false); // Disable dots when navigating back
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIsReloaded(true); // Enable dots on refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const filterNotifications = () => {
    return notifications;
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const deleteNotification = (id) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setNotifications(prev => prev.filter(n => n.id !== id));
            setModalVisible(false);
          }
        }
      ]
    );
  };

  const handleNotificationPress = (notification) => {
    markAsRead(notification.id);
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const handleActionPress = (action, notification) => {
    switch (action) {
      case 'Rate Driver':
        Alert.alert('Rate Driver', 'Redirecting to rating screen.');
        break;
      case 'Use Code':
        Alert.alert('Promo Code', 'Code SAVE50 copied to clipboard.');
        break;
      case 'View Tips':
        navigation.navigate('Safety');
        break;
      case 'Track Driver':
        navigation.navigate('Map');
        break;
      case 'Update Now':
        Alert.alert('Update', 'Redirecting to app store.');
        break;
      default:
        Alert.alert('Action', `${action} pressed`);
    }
    setModalVisible(false);
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveSettings = () => {
    setSettingsModalVisible(false);
    Alert.alert('Settings Saved', 'Your notification preferences have been updated successfully.');
  };

  const NotificationItem = ({ notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !notification.isRead && styles.unreadNotification
      ]}
      onPress={() => handleNotificationPress(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationHeader}>
        <View style={[styles.iconContainer, { backgroundColor: notification.color + '20' }]}>
          <Ionicons name={notification.icon} size={20} color={notification.color} />
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.titleRow}>
            <Text style={[styles.notificationTitle, !notification.isRead && styles.unreadTitle]}>
              {notification.title}
            </Text>
            {!notification.isRead && isReloaded && <View style={styles.unreadDot} />}
          </View>
          <Text style={styles.notificationMessage} numberOfLines={2}>
            {notification.message}
          </Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        <View style={styles.priorityIndicator}>
          {notification.priority === 'high' && !notification.isRead && (
            <View style={[styles.priorityDot, { backgroundColor: '#dc3545' }]} />
          )}
          {notification.priority === 'medium' && !notification.isRead && (
            <View style={[styles.priorityDot, { backgroundColor: '#ffc107' }]} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const SettingItem = ({ title, description, value, onToggle, icon }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={20} color="#0089d8" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: '#0089d8' }}
        thumbColor={value ? '#ffffff' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.simpleHeader}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity 
          onPress={() => setSettingsModalVisible(true)} 
          style={styles.settingsIconButton}
        >
          <Ionicons name="settings" size={24} color="#0089d8" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.notificationsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {filterNotifications().length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySubtitle}>
              No notifications found.
            </Text>
          </View>
        ) : (
          filterNotifications().map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedNotification && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[styles.modalIconContainer, { backgroundColor: selectedNotification.color + '20' }]}>
                    <Ionicons name={selectedNotification.icon} size={24} color={selectedNotification.color} />
                  </View>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.modalTitle}>{selectedNotification.title}</Text>
                <Text style={styles.modalMessage}>{selectedNotification.message}</Text>
                <Text style={styles.modalTime}>{selectedNotification.time}</Text>
                
                <View style={styles.modalActions}>
                  {selectedNotification.actionButton && (
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: selectedNotification.color }]}
                      onPress={() => handleActionPress(selectedNotification.actionButton, selectedNotification)}
                    >
                      <Text style={styles.actionButtonText}>{selectedNotification.actionButton}</Text>
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteNotification(selectedNotification.id)}
                  >
                    <Ionicons name="trash" size={16} color="#dc3545" />
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.settingsModalContent}>
            <View style={styles.settingsModalHeader}>
              <Text style={styles.settingsModalTitle}>Notification Settings</Text>
              <TouchableOpacity onPress={() => setSettingsModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.settingsScrollView}>
              <Text style={styles.settingsGroupTitle}>Notification Types</Text>
              
              <SettingItem
                title="Push Notifications"
                description="Enable all push notifications"
                value={settings.pushNotifications}
                onToggle={() => toggleSetting('pushNotifications')}
                icon="notifications"
              />
              
              <SettingItem
                title="Ride Updates"
                description="Get notified about your ride status"
                value={settings.rideUpdates}
                onToggle={() => toggleSetting('rideUpdates')}
                icon="car"
              />
              
              <SettingItem
                title="Promotions"
                description="Receive promotional offers and discounts"
                value={settings.promotions}
                onToggle={() => toggleSetting('promotions')}
                icon="gift"
              />
              
              <SettingItem
                title="Safety Alerts"
                description="Important safety notifications"
                value={settings.safety}
                onToggle={() => toggleSetting('safety')}
                icon="shield-checkmark"
              />
              
              <SettingItem
                title="Payment Updates"
                description="Payment and billing notifications"
                value={settings.payment}
                onToggle={() => toggleSetting('payment')}
                icon="card"
              />

              <Text style={styles.settingsGroupTitle}>Notification Behavior</Text>
              
              <SettingItem
                title="Sound"
                description="Play sound for notifications"
                value={settings.sound}
                onToggle={() => toggleSetting('sound')}
                icon="volume-high"
              />
              
              <SettingItem
                title="Vibration"
                description="Vibrate for notifications"
                value={settings.vibration}
                onToggle={() => toggleSetting('vibration')}
                icon="phone-portrait"
              />
            </ScrollView>
            
            <View style={styles.settingsModalFooter}>
              <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
                <Text style={styles.saveButtonText}>Save Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default NotificationScreen;