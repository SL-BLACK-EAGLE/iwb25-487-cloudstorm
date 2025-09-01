import React, { useMemo } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams, useRouter } from "expo-router"

type Form = {
    name: string
    description: string
    address: string
    mobile: string
    category: string
    department: string
    urgencyLevel: string
    date?: string
    imageUri?: string
}

const VerifyDetails: React.FC = () => {
    const router = useRouter()
    const params = useLocalSearchParams()

    // Accept either a single JSON payload or separate params
    const formData: Form = useMemo(() => {
        const fallback: Form = {
            name: "",
            description: "",
            address: "",
            mobile: "",
            category: "",
            department: "",
            urgencyLevel: "",
            date: "",
            imageUri: undefined,
        }

        const payload = typeof params.payload === "string" ? params.payload : undefined
        if (payload) {
            try {
                return { ...fallback, ...JSON.parse(payload) }
            } catch {
                // ignore and fall through
            }
        }

        return {
            ...fallback,
            name: (params.name as string) ?? fallback.name,
            description: (params.description as string) ?? fallback.description,
            address: (params.address as string) ?? fallback.address,
            mobile: (params.mobile as string) ?? fallback.mobile,
            category: (params.category as string) ?? fallback.category,
            department: (params.department as string) ?? fallback.department,
            urgencyLevel: (params.urgencyLevel as string) ?? fallback.urgencyLevel,
            date: (params.date as string) ?? fallback.date,
            imageUri: (params.imageUri as string) || undefined,
        }
    }, [params])

    const charCount = (formData.description || "").length

    const shadow = {
        shadowColor: "#8CB9ED",
        shadowOpacity: 0.25,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
    }

    const Field = ({
                       label,
                       value,
                       placeholder,
                       multiline = false,
                   }: {
        label: string
        value?: string
        placeholder?: string
        multiline?: boolean
    }) => (
        <View className="mb-4">
            <Text className="text-gray-700 text-base font-medium mb-2">{label}</Text>
            <TextInput
                value={value}
                editable={false}
                placeholder={placeholder}
                multiline={multiline}
                numberOfLines={multiline ? 6 : 1}
                className={`bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-600 ${multiline ? "h-32" : ""}`}
                textAlignVertical={multiline ? "top" : "center"}
            />
            {multiline && (
                <Text className="text-gray-400 text-xs mt-1 text-right">{charCount}/500 characters</Text>
            )}
        </View>
    )

    return (
        <View className="flex-1 bg-[#E8F5FB]">
            {/* Header with wave */}
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
                        <Text className="text-white text-base font-semibold">Verify Details</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-6 py-6"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 24 }}
            >
                {/* Read-only form (to match your preview look) */}
                <Field label="Name" value={formData.name} />
                <Field label="description :" value={formData.description} multiline />
                <Field label="address" value={formData.address} />
                <Field label="Mobile :" value={formData.mobile} />

                {/* Dropdown-looking (disabled) rows */}
                <View className="mb-4">
                    <Text className="text-gray-700 text-base font-medium mb-2">category :</Text>
                    <View className="bg-white border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between">
                        <Text className="text-gray-600">{formData.category || "-"}</Text>
                        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                    </View>
                </View>

                {/* Disaster image (preview only) */}
                <View className="mb-4">
                    <Text className="text-gray-700 text-base font-medium mb-2">disaster image :</Text>
                    {formData.imageUri ? (
                        <Image
                            source={{ uri: formData.imageUri }}
                            className="w-full h-40 rounded-xl"
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="bg-white border-2 border-dashed border-blue-300 rounded-lg p-6 items-center justify-center">
                            <View className="bg-blue-500 rounded-full w-12 h-12 items-center justify-center mb-2">
                                <Ionicons name="add" size={24} color="white" />
                            </View>
                        </View>
                    )}
                    <Text className="text-gray-500 text-xs mt-2 text-center">
                        Support JPG,PNG formats. MAX 5MB per image
                    </Text>
                </View>

                <Field label="department :" value={formData.department} />

                <View className="mb-8">
                    <Text className="text-gray-700 text-base font-medium mb-2">urgency Level :</Text>
                    <View className="bg-white border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between">
                        <Text className="text-gray-600">{formData.urgencyLevel || "-"}</Text>
                        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                    </View>
                </View>

                {/* Buttons */}
                <View className="flex-row gap-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="flex-1 bg-transparent border-2 border-blue-500 rounded-lg py-4 items-center"
                        activeOpacity={0.85}
                    >
                        <Text className="text-blue-500 text-base font-semibold">Back to edit</Text>
                    </TouchableOpacity>

                    <View style={shadow} className="flex-1 rounded-lg overflow-hidden">
                        <LinearGradient colors={["#60A5FA", "#3B82F6"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                className="py-4 items-center"
                                onPress={() => router.push('/goverment/user_relief_service_requests')}>
                                <Text className="text-white text-base font-semibold">Submit</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
                <View className="h-8" />
            </ScrollView>
        </View>
    )
}

export default VerifyDetails
