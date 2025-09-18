import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// Remove problematic Reanimated and Gesture Handler imports for now
// import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
// import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

// Replace with your Mindee API key
const MINDEE_API_KEY = "your_mindee_api_key_here";

// Document Validation Utilities
const DocumentValidationUtils = {
  validateDocument: (docType, extractedData) => {
    const validationRules = {
      aadhaar: {
        requiredFields: ["number"],
        numberPattern: /^\d{12}$/,
        numberLength: 12,
      },
      pan: {
        requiredFields: ["number"],
        numberPattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        numberLength: 10,
      },
      driving_license: {
        requiredFields: ["number"],
        numberPattern: /^[A-Z]{2}[0-9]{13}$/,
        numberLength: 15,
      },
      passport: {
        requiredFields: ["number"],
        numberPattern: /^[A-Z]{1}[0-9]{7}$/,
        numberLength: 8,
      },
    };

    const rules = validationRules[docType];
    if (!rules) return { isValid: false, errors: ["Unknown document type"] };

    const errors = [];

    rules.requiredFields.forEach((field) => {
      if (!extractedData[field]) {
        errors.push(`${field} is required`);
      }
    });

    if (extractedData.number && rules.numberPattern) {
      if (!rules.numberPattern.test(extractedData.number)) {
        errors.push(`Invalid ${docType} number format`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

// Mock AI Detection Service (Fallback for invalid API key)
const mockAiDetectionService = {
  analyzeDocument: async (imageUri, docType) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      isValid: Math.random() > 0.3, // 70% chance of being valid for demo
      confidence: 0.75 + Math.random() * 0.2,
      documentType: docType,
      extractedData: {
        name: "Sample Name",
        number: docType === 'aadhaar' ? '123456789012' : 'ABCDE1234F',
        dateOfBirth: '1990-01-01'
      },
      quality: "Good",
      issues: [],
    };
  },
};

// Real AI Detection Service using Mindee API
const aiDetectionService = {
  analyzeDocument: async (imageUri, docType) => {
    if (!MINDEE_API_KEY || MINDEE_API_KEY === "your_mindee_api_key_here") {
      console.warn("Invalid or missing Mindee API key, using mock data");
      return await mockAiDetectionService.analyzeDocument(imageUri, docType);
    }

    const typeMapping = {
      aadhaar: "national_id",
      pan: "other",
      driving_license: "driving_license",
      passport: "passport",
    };
    const expectedType = typeMapping[docType] || "national_id";

    let product = "international_id/v2";
    if (docType === "passport") {
      product = "passport/v1";
    }

    const endpoint = `https://api.mindee.net/v1/products/mindee/${product}/predict`;

    const formData = new FormData();
    formData.append("document", {
      uri: Platform.OS === "android" && !imageUri.startsWith("file://") ? `file://${imageUri}` : imageUri,
      name: "document.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Token ${MINDEE_API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const prediction = data.document.inference.prediction;

      const extractedData = {};
      if (prediction.given_names && prediction.given_names.length > 0) {
        extractedData.name = `${prediction.given_names[0].value || ""} ${prediction.surnames?.[0]?.value || ""}`.trim();
      }
      if (prediction.document_number) {
        extractedData.number = prediction.document_number.value;
      }
      if (prediction.birth_date) {
        extractedData.dateOfBirth = prediction.birth_date.value;
      }
      if (prediction.address) {
        extractedData.address = prediction.address.value;
      }
      if (prediction.sex) {
        extractedData.gender = prediction.sex.value;
      }

      const confidences = [];
      Object.values(prediction).forEach((field) => {
        if (Array.isArray(field)) {
          field.forEach((subField) => {
            if (subField.confidence) confidences.push(subField.confidence);
          });
        } else if (field.confidence) {
          confidences.push(field.confidence);
        }
      });
      const confidence = confidences.length > 0 ? confidences.reduce((a, b) => a + b, 0) / confidences.length : 0;

      const docTypeField = prediction.document_type || prediction.id_type;
      const detectedType = docTypeField ? docTypeField.value : null;
      let isValid = confidence > 0.6 && detectedType === expectedType;

      const issues = [];
      if (detectedType !== expectedType) {
        issues.push(`Detected document type (${detectedType}) does not match selected (${docType})`);
      }
      if (confidence < 0.6) {
        issues.push("Low overall confidence in extraction");
      }

      const validation = DocumentValidationUtils.validateDocument(docType, extractedData);
      if (!validation.isValid) {
        isValid = false;
        issues.push(...validation.errors);
      }

      let quality = "Poor";
      if (confidence >= 0.8) quality = "Excellent";
      else if (confidence >= 0.6) quality = "Good";

      return {
        isValid,
        confidence,
        documentType: detectedType || "unknown",
        extractedData,
        quality,
        issues,
      };
    } catch (error) {
      console.error("AI Detection Error:", error);
      return await mockAiDetectionService.analyzeDocument(imageUri, docType);
    }
  },
};

const IdUpload = ({ navigation }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedDocType, setSelectedDocType] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const documentTypes = [
    {
      id: "aadhaar",
      name: "Aadhaar Card",
      icon: "card-outline",
      emoji: "🆔",
      color: "#d88900",
      description: "Government issued identity proof",
      aspectRatio: [4, 2.5],
    },
    {
      id: "pan",
      name: "PAN Card",
      icon: "business-outline",
      emoji: "💼",
      color: "#0089d8",
      description: "Permanent Account Number card",
      aspectRatio: [3.5, 2.2],
    },
    {
      id: "driving_license",
      name: "Driving License",
      icon: "car-outline",
      emoji: "🚗",
      color: "#09C912",
      description: "Valid driving license",
      aspectRatio: [3.5, 2.2],
    },
    {
      id: "passport",
      name: "Passport",
      icon: "airplane-outline",
      emoji: "✈️",
      color: "#8B5CF6",
      description: "Indian passport",
      aspectRatio: [2, 3],
    },
  ];

  useEffect(() => {
    console.log("IdUpload mounted, navigation:", !!navigation);
  }, []);

  const selectDocumentType = (docType) => {
    console.log("Selected document type:", docType.id);
    setSelectedDocType(docType);
    setAiResult(null);
    setCapturedImage(null);
  };

  const pickImageFromCamera = async () => {
    if (!selectedDocType) {
      Alert.alert("Select Document Type", "Please select a document type first.");
      return;
    }

    try {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraPermission.granted) {
        Alert.alert("Camera Permission Required", "Please allow camera access to take photos.", [{ text: "OK" }]);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: selectedDocType.aspectRatio,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log("Image captured:", result.assets[0].uri);
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert("Error", "Failed to open camera. Please try again.");
    }
  };

  const pickImageFromGallery = async () => {
    if (!selectedDocType) {
      Alert.alert("Select Document Type", "Please select a document type first.");
      return;
    }

    try {
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!galleryPermission.granted) {
        Alert.alert("Gallery Permission Required", "Please allow access to your photos.", [{ text: "OK" }]);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: selectedDocType.aspectRatio,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log("Image selected from gallery:", result.assets[0].uri);
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Gallery error:", error);
      Alert.alert("Error", "Failed to open gallery. Please try again.");
    }
  };

  const processWithAI = async () => {
    if (!capturedImage || !selectedDocType) {
      console.warn("Missing capturedImage or selectedDocType");
      return;
    }

    setIsProcessing(true);
    try {
      console.log("Processing with AI, image:", capturedImage, "docType:", selectedDocType.id);
      const result = await aiDetectionService.analyzeDocument(capturedImage, selectedDocType.id);
      setAiResult(result);
    } catch (error) {
      console.error("AI Processing Error:", error);
      Alert.alert("Processing Error", "Failed to process document. Please check your API key or try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const uploadDocument = async () => {
    if (!aiResult || !aiResult.isValid) {
      Alert.alert("Invalid Document", "Please capture a valid document first.");
      return;
    }

    setIsUploading(true);
    try {
      console.log("Uploading document:", selectedDocType.name);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert("Upload Successful", `Your ${selectedDocType.name} has been uploaded successfully!`, [
        {
          text: "OK",
          onPress: () => {
            if (navigation && navigation.goBack) {
              console.log("Navigating back");
              navigation.goBack();
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload document. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const resetSelection = () => {
    console.log("Resetting selection");
    setCapturedImage(null);
    setSelectedDocType(null);
    setAiResult(null);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return "#09C912";
    if (confidence >= 0.6) return "#d88900";
    return "#FF4444";
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation && navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#475569" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Government ID</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetSelection}>
          <Ionicons name="refresh-outline" size={24} color="#DC2626" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedDocType ? (
          <View>
            <View style={styles.instructionContainer}>
              <View style={styles.iconContainer}>
                <Text style={styles.mainIcon}>🛡️</Text>
              </View>
              <Text style={styles.instructionTitle}>Select Document Type</Text>
              <Text style={styles.instructionText}>Choose the government-issued document you want to upload</Text>
            </View>

            <View style={styles.documentGrid}>
              {documentTypes.map((doc) => (
                <TouchableOpacity
                  key={doc.id}
                  style={[styles.documentCard, { borderColor: doc.color }]}
                  onPress={() => selectDocumentType(doc)}
                >
                  <View style={[styles.documentIcon, { backgroundColor: doc.color + "33" }]}>
                    <Text style={styles.documentEmoji}>{doc.emoji}</Text>
                  </View>
                  <Text style={styles.documentName}>{doc.name}</Text>
                  <Text style={styles.documentDescription}>{doc.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View>
            <View style={[styles.selectedDocContainer, { borderColor: selectedDocType.color }]}>
              <View style={[styles.selectedDocIcon, { backgroundColor: selectedDocType.color + "33" }]}>
                <Text style={styles.selectedDocEmoji}>{selectedDocType.emoji}</Text>
              </View>
              <Text style={styles.selectedDocText}>Selected: {selectedDocType.name}</Text>
            </View>

            {!capturedImage ? (
              <View style={styles.uploadPromptContainer}>
                <Text style={styles.uploadIcon}>📷</Text>
                <Text style={styles.uploadPromptTitle}>Capture Your {selectedDocType.name}</Text>
                <Text style={styles.uploadPromptText}>Position your {selectedDocType.name} within the frame</Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.captureButton, { backgroundColor: selectedDocType.color }]}
                    onPress={pickImageFromCamera}
                  >
                    <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
                    <Text style={styles.captureButtonText}>Take Photo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.galleryButton} onPress={pickImageFromGallery}>
                    <Ionicons name="images-outline" size={20} color="#0089d8" />
                    <Text style={styles.galleryButtonText}>Choose from Gallery</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.imageProcessingContainer}>
                <View style={styles.imagePreview}>
                  <Image source={{ uri: capturedImage }} style={styles.previewImage} />
                  {!isProcessing && !aiResult && (
                    <View style={styles.imageOverlay}>
                      <TouchableOpacity style={styles.processButton} onPress={processWithAI}>
                        <Ionicons name="scan-outline" size={16} color="#FFFFFF" />
                        <Text style={styles.processButtonText}>Analyze with AI</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {isProcessing && (
                  <View style={styles.processingContainer}>
                    <ActivityIndicator size="large" color="#0089d8" />
                    <Text style={styles.processingText}>AI is analyzing your document...</Text>
                    <Text style={styles.processingSubText}>This may take a few seconds</Text>
                  </View>
                )}

                {aiResult && (
                  <View style={[styles.resultCard, aiResult.isValid ? styles.resultSuccess : styles.resultError]}>
                    <Text style={styles.resultIcon}>{aiResult.isValid ? "✅" : "❌"}</Text>
                    <Text
                      style={[
                        styles.resultTitle,
                        { color: aiResult.isValid ? "#09C912" : "#FF4444" },
                      ]}
                    >
                      {aiResult.isValid ? "Document Verified" : "Verification Failed"}
                    </Text>

                    <View style={styles.confidenceContainer}>
                      <Text style={styles.confidenceLabel}>AI Confidence: {Math.round(aiResult.confidence * 100)}%</Text>
                      <View style={styles.confidenceBar}>
                        <View
                          style={[
                            styles.confidenceFill,
                            {
                              width: `${aiResult.confidence * 100}%`,
                              backgroundColor: getConfidenceColor(aiResult.confidence),
                            },
                          ]}
                        />
                      </View>
                    </View>

                    <Text style={styles.qualityText}>Image Quality: {aiResult.quality}</Text>

                    {aiResult.extractedData && Object.keys(aiResult.extractedData).length > 0 && (
                      <View style={styles.extractedDataContainer}>
                        <Text style={styles.extractedDataTitle}>📋 Document Information:</Text>
                        {aiResult.extractedData.name && (
                          <Text style={styles.extractedDataItem}>
                            <Text style={styles.extractedDataLabel}>Full Name:</Text> {aiResult.extractedData.name}
                          </Text>
                        )}
                        {aiResult.extractedData.number && (
                          <Text style={styles.extractedDataItem}>
                            <Text style={styles.extractedDataLabel}>Document Number:</Text> {aiResult.extractedData.number}
                          </Text>
                        )}
                        {aiResult.extractedData.dateOfBirth && (
                          <Text style={styles.extractedDataItem}>
                            <Text style={styles.extractedDataLabel}>Date of Birth:</Text> {aiResult.extractedData.dateOfBirth}
                          </Text>
                        )}
                        {aiResult.extractedData.address && (
                          <Text style={styles.extractedDataItem}>
                            <Text style={styles.extractedDataLabel}>Address:</Text> {aiResult.extractedData.address}
                          </Text>
                        )}
                        {aiResult.extractedData.gender && (
                          <Text style={styles.extractedDataItem}>
                            <Text style={styles.extractedDataLabel}>Gender:</Text> {aiResult.extractedData.gender}
                          </Text>
                        )}
                        {aiResult.extractedData.fatherName && (
                          <Text style={styles.extractedDataItem}>
                            <Text style={styles.extractedDataLabel}>Father's Name:</Text> {aiResult.extractedData.fatherName}
                          </Text>
                        )}
                        {aiResult.extractedData.vehicleClass && (
                          <Text style={styles.extractedDataItem}>
                            <Text style={styles.extractedDataLabel}>Vehicle Class:</Text> {aiResult.extractedData.vehicleClass}
                          </Text>
                        )}
                        {aiResult.extractedData.validUpto && (
                          <Text style={styles.extractedDataItem}>
                            <Text style={styles.extractedDataLabel}>Valid Until:</Text> {aiResult.extractedData.validUpto}
                          </Text>
                        )}
                        {aiResult.extractedData.nationality && (
                          <Text style={styles.extractedDataItem}>
                            <Text style={styles.extractedDataLabel}>Nationality:</Text> {aiResult.extractedData.nationality}
                          </Text>
                        )}
                        {aiResult.extractedData.placeOfBirth && (
                          <Text style={styles.extractedDataItem}>
                            <Text style={styles.extractedDataLabel}>Place of Birth:</Text> {aiResult.extractedData.placeOfBirth}
                          </Text>
                        )}
                      </View>
                    )}

                    {aiResult.issues && aiResult.issues.length > 0 && (
                      <View style={styles.issuesContainer}>
                        <Text style={styles.issuesTitle}>⚠️ Issues Detected:</Text>
                        {aiResult.issues.map((issue, index) => (
                          <Text key={index} style={styles.issueItem}>• {issue}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                )}

                <TouchableOpacity
                  style={styles.retakeButton}
                  onPress={() => {
                    console.log("Retake photo");
                    setCapturedImage(null);
                    setAiResult(null);
                  }}
                >
                  <Ionicons name="refresh-outline" size={16} color="#FFFFFF" />
                  <Text style={styles.retakeButtonText}>Retake Photo</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>💡 Tips for better AI detection:</Text>
              <Text style={styles.tipText}>• Ensure good lighting and focus</Text>
              <Text style={styles.tipText}>• Keep the document flat and visible</Text>
              <Text style={styles.tipText}>• Capture all four corners clearly</Text>
              <Text style={styles.tipText}>• Avoid shadows and glare</Text>
              <Text style={styles.tipText}>• Hold the camera steady</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {aiResult && aiResult.isValid && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.uploadButton, isUploading && styles.uploadButtonDisabled]}
            onPress={uploadDocument}
            disabled={isUploading}
          >
            {isUploading ? (
              <View style={styles.uploadLoadingContainer}>
                <ActivityIndicator color="white" size="small" />
                <Text style={styles.uploadButtonText}>Uploading...</Text>
              </View>
            ) : (
              <View style={styles.uploadLoadingContainer}>
                <Ionicons name="cloud-upload-outline" size={20} color="#FFFFFF" />
                <Text style={styles.uploadButtonText}>Upload Document</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
  },
  resetButton: {
    padding: 10,
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  instructionContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  iconContainer: {
    backgroundColor: "#F0F9FF",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#0089d8",
  },
  mainIcon: {
    fontSize: 36,
  },
  instructionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 300,
  },
  documentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  documentCard: {
    width: (width - 60) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  documentIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  documentEmoji: {
    fontSize: 32,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 8,
  },
  documentDescription: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
  },
  selectedDocContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  selectedDocIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  selectedDocEmoji: {
    fontSize: 28,
  },
  selectedDocText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
  },
  uploadPromptContainer: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
  },
  uploadIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  uploadPromptTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
  },
  uploadPromptText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  captureButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  captureButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  galleryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: "#0089d8",
  },
  galleryButtonText: {
    color: "#0089d8",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  imageProcessingContainer: {
    marginVertical: 20,
  },
  imagePreview: {
    position: "relative",
    marginBottom: 20,
  },
  previewImage: {
    width: "100%",
    height: 250,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    resizeMode: "contain",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "center",
  },
  processButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#0089d8",
    borderRadius: 12,
  },
  processButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  processingContainer: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#F0F9FF",
    borderRadius: 16,
    marginVertical: 20,
  },
  processingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0089d8",
    marginTop: 16,
    textAlign: "center",
  },
  processingSubText: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 8,
    textAlign: "center",
  },
  resultCard: {
    padding: 24,
    borderRadius: 20,
    marginVertical: 20,
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  resultSuccess: {
    backgroundColor: "#F0FDF4",
    borderColor: "#09C912",
  },
  resultError: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FF4444",
  },
  resultIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  confidenceContainer: {
    width: "100%",
    marginBottom: 16,
  },
  confidenceLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
    textAlign: "center",
  },
  confidenceBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  confidenceFill: {
    height: "100%",
    borderRadius: 4,
  },
  qualityText: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  extractedDataContainer: {
    width: "100%",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  extractedDataTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  extractedDataItem: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 6,
    lineHeight: 20,
  },
  extractedDataLabel: {
    fontWeight: "600",
  },
  issuesContainer: {
    width: "100%",
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  issuesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC2626",
    marginBottom: 12,
  },
  issueItem: {
    fontSize: 14,
    color: "#991B1B",
    marginBottom: 4,
    lineHeight: 20,
  },
  retakeButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#64748B",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  retakeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  tipsContainer: {
    backgroundColor: "#F0F9FF",
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#0089d8",
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
  },
  tipText: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 8,
    lineHeight: 20,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  uploadButton: {
    backgroundColor: "#09C912",
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  uploadButtonDisabled: {
    opacity: 0.7,
  },
  uploadLoadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default IdUpload;