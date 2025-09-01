import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import * as ImagePicker from "expo-image-picker"
import { router } from "expo-router"

const ReliefServiceAppointments = () => {
  const [appointmentDate, setAppointmentDate] = useState("")
  const [time, setTime] = useState("")
  const [status, setStatus] = useState("")
  const [priority, setPriority] = useState("")
  const [documentType, setDocumentType] = useState("")
  const [note, setNote] = useState("")
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showDocTypeDropdown, setShowDocTypeDropdown] = useState(false)

  // Image picked from gallery (preview + send to next screen)
  const [docImageUri, setDocImageUri] = useState<string | null>(null)

  // ----- Date picker -----
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const openDatePicker = () => setDatePickerVisible(true)
  const closeDatePicker = () => setDatePickerVisible(false)
  const onConfirmDate = (d: Date) => {
    const formatted =
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    setAppointmentDate(formatted)
    closeDatePicker()
  }

  // ----- Time picker -----
  const [timePickerVisible, setTimePickerVisible] = useState(false)
  const openTimePicker = () => setTimePickerVisible(true)
  const closeTimePicker = () => setTimePickerVisible(false)
  const onConfirmTime = (d: Date) => {
    const formatted = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setTime(formatted)
    closeTimePicker()
  }

  // Options
  const statusOptions = ["Pending", "Confirmed", "Cancelled", "Completed"]
  const priorityOptions = ["Low", "Medium", "High", "Critical"]
  const docTypeOptions = ["ID Card", "Utility Bill", "Medical Certificate", "Other"]

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") return
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.9,
    })
    if (!result.canceled) {
      setDocImageUri(result.assets[0].uri)
    }
  }

  const handlePreviewAndSend = () => {
    router.push({
      pathname: "/goverment/relief_service_appoinment_preview",
      params: {
        appointmentDate,
        time,
        status,
        priority,
        documentType,
        note,
        imageUri: docImageUri ?? "",
      },
    })
  }

  return (
      <View className="flex-1 bg-gray-100">
        {/* Header */}
        <View className="relative">
          <View style={{ height: 100, overflow: "hidden" }}>
            <Image
                source={require("../../assets/images/donation_type_top_bg.png")}
                resizeMode="stretch"
                style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "110%", height: 100 }}
            />
          </View>

          <View className="absolute left-0 right-0 top-0 mt-4 px-4 pt-6">
            <TouchableOpacity
                className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View className="absolute left-0 right-0 mt-6 items-center">
              <Text className="text-white text-base font-semibold">
                Relief Service Appointments
              </Text>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
          {/* Appointment Date */}
          <View className="mb-4">
            <Text className="text-gray-700 text-base font-medium mb-2">Appointment Date:</Text>
            <Pressable onPress={openDatePicker} className="relative">
              <TextInput
                  value={appointmentDate}
                  editable={false}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 pr-12"
                  placeholder="Select date"
                  placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity onPress={openDatePicker} className="absolute right-3 top-3">
                <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
            </Pressable>
          </View>

          {/* Time */}
          <View className="mb-4">
            <Text className="text-gray-700 text-base font-medium mb-2">Time:</Text>
            <Pressable onPress={openTimePicker} className="relative">
              <TextInput
                  value={time}
                  editable={false}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 pr-12"
                  placeholder="Select time"
                  placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity onPress={openTimePicker} className="absolute right-3 top-3">
                <Ionicons name="time-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
            </Pressable>
          </View>

          {/* Status */}
          <View className="mb-4">
            <Text className="text-gray-700 text-base font-medium mb-2">Status:</Text>
            <TouchableOpacity
                onPress={() => setShowStatusDropdown(!showStatusDropdown)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
            >
              <Text className="text-gray-700">{status || "Select status"}</Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
            {showStatusDropdown && (
                <View className="bg-white border border-gray-300 rounded-lg mt-1 overflow-hidden">
                  {statusOptions.map((option) => (
                      <TouchableOpacity
                          key={option}
                          onPress={() => {
                            setStatus(option)
                            setShowStatusDropdown(false)
                          }}
                          className="px-4 py-3 border-b border-gray-200 last:border-b-0"
                      >
                        <Text className="text-gray-700">{option}</Text>
                      </TouchableOpacity>
                  ))}
                </View>
            )}
          </View>

          {/* Priority */}
          <View className="mb-4">
            <Text className="text-gray-700 text-base font-medium mb-2">Priority:</Text>
            <TouchableOpacity
                onPress={() => setShowPriorityDropdown(!showPriorityDropdown)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
            >
              <Text className="text-gray-700">{priority || "Select priority"}</Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
            {showPriorityDropdown && (
                <View className="bg-white border border-gray-300 rounded-lg mt-1 overflow-hidden">
                  {priorityOptions.map((option) => (
                      <TouchableOpacity
                          key={option}
                          onPress={() => {
                            setPriority(option)
                            setShowPriorityDropdown(false)
                          }}
                          className="px-4 py-3 border-b border-gray-200 last:border-b-0"
                      >
                        <Text className="text-gray-700">{option}</Text>
                      </TouchableOpacity>
                  ))}
                </View>
            )}
          </View>

          {/* Document Type */}
          <View className="mb-4">
            <Text className="text-gray-700 text-base font-medium mb-2">Document Type:</Text>
            <TouchableOpacity
                onPress={() => setShowDocTypeDropdown(!showDocTypeDropdown)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
            >
              <Text className="text-gray-700">{documentType || "Select document type"}</Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
            {showDocTypeDropdown && (
                <View className="bg-white border border-gray-300 rounded-lg mt-1 overflow-hidden">
                  {docTypeOptions.map((option) => (
                      <TouchableOpacity
                          key={option}
                          onPress={() => {
                            setDocumentType(option)
                            setShowDocTypeDropdown(false)
                          }}
                          className="px-4 py-3 border-b border-gray-200 last:border-b-0"
                      >
                        <Text className="text-gray-700">{option}</Text>
                      </TouchableOpacity>
                  ))}
                </View>
            )}
          </View>

          {/* Doc Image */}
          <View className="mb-4">
            <Text className="text-gray-700 text-base font-medium mb-2">Doc Image:</Text>

            {docImageUri ? (
                <Image
                    source={{ uri: docImageUri }}
                    style={{ width: 96, height: 96, borderRadius: 8 }}
                    className="bg-white border border-gray-300"
                />
            ) : (
                <TouchableOpacity
                    onPress={handleImageUpload}
                    className="bg-white border-2 border-dashed border-blue-300 rounded-lg p-6 items-center justify-center"
                >
                  <View className="bg-blue-500 rounded-full w-12 h-12 items-center justify-center mb-2">
                    <Ionicons name="add" size={24} color="white" />
                  </View>
                  <Text className="text-gray-600">Upload image</Text>
                </TouchableOpacity>
            )}

            <Text className="text-gray-500 text-xs mt-2">
              Supports JPG / PNG, max 5MB
            </Text>
          </View>

          {/* Add Note */}
          <View className="mb-6">
            <Text className="text-gray-700 text-base font-medium mb-2">Add Note:</Text>
            <View className="relative">
              <TextInput
                  value={note}
                  onChangeText={setNote}
                  multiline
                  numberOfLines={4}
                  maxLength={150}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 h-24"
                  placeholder=""
              />
              <Text className="absolute bottom-2 right-3 text-gray-400 text-xs">
                {note.length}/150 characters
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handlePreviewAndSend} className="bg-blue-500 rounded-lg py-4 items-center mb-8">
            <Text className="text-white text-lg font-semibold">Preview and send</Text>
          </TouchableOpacity>

          <View className="h-14"/>
        </ScrollView>

        <DateTimePickerModal
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={onConfirmDate}
            onCancel={closeDatePicker}
            display={Platform.OS === "ios" ? "inline" : "default"}
        />

        <DateTimePickerModal
            isVisible={timePickerVisible}
            mode="time"
            onConfirm={onConfirmTime}
            onCancel={closeTimePicker}
            display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      </View>
  )
}

export default ReliefServiceAppointments
