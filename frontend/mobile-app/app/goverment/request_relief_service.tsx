import React, { useState } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Form = {
    name: string
    description: string
    address: string
    mobile: string
    category: string
    department: string
    urgencyLevel: string
    date: string
}

const categories = ["Water Supply", "Power Supply", "Medical Aid", "Food Supply"]
const urgencyLevels = ["Low", "Medium", "High", "Urgent"]

const RequestReliefServices: React.FC = () => {
    const [formData, setFormData] = useState<Form>({
        name: "Hasindu Gunathilaka",
        description: "",
        address: "23/48 Nirambawa",
        mobile: "0701446541",
        category: "Water Supply",
        department: "Water Department",
        urgencyLevel: "Urgent",
        date: "2025/12/05",
    })

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
    const [showUrgencyDropdown, setShowUrgencyDropdown] = useState(false)
    const [charCount, setCharCount] = useState(0)

    const [dateOpen, setDateOpen] = useState(false)
    const onConfirmDate = (d: Date) => {
        const yyyy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, "0")
        const dd = String(d.getDate()).padStart(2, "0")
        setFormData(prev => ({ ...prev, date: `${yyyy}/${mm}/${dd}` }))
        setDateOpen(false)
    }

    const handleDescriptionChange = (text: string) => {
        if (text.length <= 500) {
            setFormData(prev => ({ ...prev, description: text }))
            setCharCount(text.length)
        }
    }

    return (
        <View className="flex-1 bg-[#E8F5FB]">
            <View className="relative">
                <View style={{ height: 100, overflow: "hidden" }}>
                    <Image
                        source={require("../../assets/images/donation_type_top_bg.png")}
                        resizeMode="stretch"
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: "110%",
                            height: 100,
                            alignSelf: "center",
                        }}
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
                            Request Relief Services
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-6 py-6"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className="mb-4">
                    <Text className="text-gray-700 text-sm font-medium mb-2">Name</Text>
                    <TextInput
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
                        value={formData.name}
                        onChangeText={name => setFormData(prev => ({ ...prev, name }))}
                        placeholder="Enter your name"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-gray-700 text-sm font-medium mb-2">
                        Description:
                    </Text>
                    <TextInput
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800 h-24"
                        value={formData.description}
                        onChangeText={handleDescriptionChange}
                        placeholder="Enter description"
                        multiline
                        textAlignVertical="top"
                    />
                    <Text className="text-gray-500 text-xs mt-1 text-right">
                        {charCount}/500 characters
                    </Text>
                </View>

                <View className="mb-4">
                    <Text className="text-gray-700 text-sm font-medium mb-2">Address</Text>
                    <TextInput
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
                        value={formData.address}
                        onChangeText={address => setFormData(prev => ({ ...prev, address }))}
                        placeholder="Enter your address"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-gray-700 text-sm font-medium mb-2">Mobile:</Text>
                    <TextInput
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
                        value={formData.mobile}
                        onChangeText={mobile => setFormData(prev => ({ ...prev, mobile }))}
                        placeholder="Enter mobile number"
                        keyboardType="phone-pad"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-gray-700 text-sm font-medium mb-2">
                        Category:
                    </Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                        onPress={() => setShowCategoryDropdown(v => !v)}
                    >
                        <Text className="text-gray-800">{formData.category}</Text>
                        <Ionicons name="chevron-down" size={20} color="#666" />
                    </TouchableOpacity>
                    {showCategoryDropdown && (
                        <View className="bg-white border border-gray-200 rounded-lg mt-1">
                            {categories.map(opt => (
                                <TouchableOpacity
                                    key={opt}
                                    className="px-4 py-3 border-b border-gray-100"
                                    onPress={() => {
                                        setFormData(prev => ({ ...prev, category: opt }))
                                        setShowCategoryDropdown(false)
                                    }}
                                >
                                    <Text className="text-gray-800">{opt}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View className="mb-4">
                    <Text className="text-gray-700 text-sm font-medium mb-2">
                        Disaster Image:
                    </Text>
                    <TouchableOpacity className="bg-white border-2 border-dashed border-blue-300 rounded-lg p-8 items-center justify-center">
                        <View className="bg-blue-500 rounded-full w-12 h-12 items-center justify-center mb-2">
                            <Ionicons name="add" size={24} color="#fff" />
                        </View>
                        <Text className="text-gray-500 text-xs">
                            Tap to add an image (JPG/PNG, max 5MB)
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="mb-4">
                    <Text className="text-gray-700 text-sm font-medium mb-2">
                        Department:
                    </Text>
                    <TextInput
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
                        value={formData.department}
                        onChangeText={department =>
                            setFormData(prev => ({ ...prev, department }))
                        }
                        placeholder="Enter department"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-gray-700 text-sm font-medium mb-2">
                        Urgency Level:
                    </Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                        onPress={() => setShowUrgencyDropdown(v => !v)}
                    >
                        <Text className="text-gray-800">{formData.urgencyLevel}</Text>
                        <Ionicons name="chevron-down" size={20} color="#666" />
                    </TouchableOpacity>
                    {showUrgencyDropdown && (
                        <View className="bg-white border border-gray-200 rounded-lg mt-1">
                            {urgencyLevels.map(level => (
                                <TouchableOpacity
                                    key={level}
                                    className="px-4 py-3 border-b border-gray-100"
                                    onPress={() => {
                                        setFormData(prev => ({ ...prev, urgencyLevel: level }))
                                        setShowUrgencyDropdown(false)
                                    }}
                                >
                                    <Text className="text-gray-800">{level}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View className="mb-6">
                    <Text className="text-gray-700 text-sm font-medium mb-2">Date:</Text>
                    <TouchableOpacity
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                        onPress={() => setDateOpen(true)}
                    >
                        <Text className="text-gray-800">{formData.date}</Text>
                        <Ionicons name="calendar-outline" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    className="bg-blue-500 rounded-lg py-4 items-center mb-6"
                    onPress={() =>
                        router.push({
                            pathname: "/goverment/verify_detail",
                            params: { payload: JSON.stringify(formData) },
                        })
                    }
                >
                    <Text className="text-white text-base font-semibold">Preview and send</Text>
                </TouchableOpacity>


                <View className="h-8" />
            </ScrollView>

            <DateTimePickerModal
                isVisible={dateOpen}
                mode="date"
                onConfirm={onConfirmDate}
                onCancel={() => setDateOpen(false)}
            />
        </View>
    )
}

export default RequestReliefServices
