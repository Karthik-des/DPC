import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [calendarData, setCalendarData] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateYears = () => {
    const years = [];
    for (let i = 2020; i <= 2030; i++) {
      years.push(i);
    }
    return years;
  };

  const years = generateYears();

  const generateMonthData = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks = [];
    let currentWeek = [];

    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return {
      month: months[month],
      year: year,
      weeks: weeks
    };
  };

  useEffect(() => {
    const data = [];
    for (let i = 0; i < 3; i++) {
      let month = currentMonth + i;
      let year = currentYear;
      if (month > 11) {
        month = month - 12;
        year = currentYear + 1;
      }
      data.push(generateMonthData(month, year));
    }
    setCalendarData(data);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentMonth, currentYear]);

  const handleDateSelect = (day, month, year) => {
    if (day !== null) {
      const dateStr = `${year}-${month + 1}-${day}`;
      setSelectedDate(dateStr);
    }
  };

  const changeMonth = (monthIndex) => {
    setCurrentMonth(monthIndex);
    setShowMonthPicker(false);
  };

  const changeYear = (year) => {
    if (year >= 2020 && year <= 2030) {
      setCurrentYear(year);
      setShowYearPicker(false);
    }
  };

  const navigateMonth = (direction) => {
    fadeAnim.setValue(0);
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const renderDay = (day, weekIndex, dayIndex, month, year) => {
    if (day === null) {
      return <View key={`empty-${weekIndex}-${dayIndex}`} style={styles.emptyDay} />;
    }

    const dateStr = `${year}-${month + 1}-${day}`;
    const isSelected = selectedDate === dateStr;
    const isToday = new Date().toISOString().split('T')[0] === dateStr;

    return (
      <TouchableOpacity
        key={dateStr}
        style={[
          styles.day,
          isToday && styles.today,
          isSelected && styles.selectedDay,
          styles.dayShadow
        ]}
        onPress={() => handleDateSelect(day, month, year)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.dayText,
          isToday && styles.todayText,
          isSelected && styles.selectedDayText
        ]}>
          {day}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMonthItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.pickerItem}
      onPress={() => changeMonth(index)}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.pickerItemText,
        currentMonth === index && styles.selectedPickerItem
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderYearItem = ({ item }) => (
    <TouchableOpacity
      style={styles.pickerItem}
      onPress={() => changeYear(item)}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.pickerItemText,
        currentYear === item && styles.selectedPickerItem
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E6F0FA" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#09C912" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan Your Journey</Text>
        <View style={styles.placeholder} />
      </View>
      
      <Animated.View style={[styles.monthSelector, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
          <Text style={styles.navButtonText}>{'<'}</Text>
        </TouchableOpacity>
        
        <View style={styles.monthYearDisplay}>
          <TouchableOpacity onPress={() => setShowMonthPicker(true)}>
            <Text style={styles.monthYearText}>{months[currentMonth]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowYearPicker(true)}>
            <Text style={styles.monthYearText}>{currentYear}</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
          <Text style={styles.navButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <View style={styles.daysHeader}>
        {dayNames.map((day, i) => (
          <Text key={i} style={styles.dayName}>
            {day}
          </Text>
        ))}
      </View>
      
      <ScrollView style={styles.calendarContainer}>
        {calendarData.map((monthData, index) => (
          <Animated.View key={index} style={[styles.monthContainer, { opacity: fadeAnim }]}>
            <Text style={styles.monthTitle}>{monthData.month} {monthData.year}</Text>
            {monthData.weeks.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.week}>
                {week.map((day, dayIndex) => {
                  const monthIndex = months.findIndex(m => m === monthData.month);
                  return renderDay(day, weekIndex, dayIndex, monthIndex, monthData.year);
                })}
              </View>
            ))}
          </Animated.View>
        ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.continueButton, !selectedDate && styles.continueButtonDisabled]}
          disabled={!selectedDate}
          onPress={() => navigation.navigate('PickupTimeScreen', { selectedDate })}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={selectedDate ? ['#09C912', '#07A90A'] : ['#ccc', '#aaa']}
            style={styles.continueGradient}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      
      {/* Month Picker Modal */}
      <Modal
        visible={showMonthPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMonthPicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowMonthPicker(false)}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.pickerContainer, { transform: [{ scale: fadeAnim }] }]}>
              <Text style={styles.pickerTitle}>Select Month</Text>
              <FlatList
                data={months}
                renderItem={renderMonthItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      
      {/* Year Picker Modal */}
      <Modal
        visible={showYearPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowYearPicker(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowYearPicker(false)}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.pickerContainer, { transform: [{ scale: fadeAnim }] }]}>
              <Text style={styles.pickerTitle}>Select Year</Text>
              <FlatList
                data={years}
                renderItem={renderYearItem}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                initialScrollIndex={currentYear - 2020}
                getItemLayout={(data, index) => (
                  {length: 50, offset: 50 * index, index}
                )}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F0FA' },
  header: {
    marginTop: 70,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: { width: 40 },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 16,
  },
  navButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#09C912',
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  monthYearDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  monthYearText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
    letterSpacing: 0.5,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  dayName: {
    fontWeight: '600',
    width: 44,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  calendarContainer: { flex: 1, padding: 16 },
  monthContainer: {
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1E1E1E',
    letterSpacing: 0.5,
  },
  week: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
  day: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 22, backgroundColor: '#FFFFFF' },
  dayShadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  today: { backgroundColor: '#E6F0FA', borderWidth: 1, borderColor: '#09C912' },
  todayText: { color: '#09C912', fontWeight: '700' },
  selectedDay: { backgroundColor: '#09C912' },
  selectedDayText: { color: '#FFFFFF', fontWeight: '700' },
  dayText: { fontSize: 16, color: '#333', fontWeight: '500' },
  emptyDay: { width: 44, height: 44 },
  footer: { padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  continueButton: { borderRadius: 12, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  continueGradient: { paddingVertical: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  continueButtonDisabled: { opacity: 0.6 },
  continueButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16, marginLeft: 8 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    maxHeight: 400,
    width: width * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  pickerTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16, textAlign: 'center', color: '#1E1E1E', letterSpacing: 0.5 },
  pickerItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  pickerItemText: { fontSize: 18, textAlign: 'center', color: '#333', fontWeight: '500' },
  selectedPickerItem: { fontWeight: '700', color: '#09C912' },
});

export default CalendarScreen;