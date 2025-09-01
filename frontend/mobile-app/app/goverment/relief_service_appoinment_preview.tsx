import React, { useMemo, useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
    Pressable,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useLocalSearchParams, router } from "expo-router"

const shadow = {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
}

const FieldRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
    <View
        className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-3 flex-row items-center justify-between"
        style={shadow}
    >
        <Text className="text-gray-600">{label}</Text>
        <Text className="text-gray-900 font-medium ml-4" numberOfLines={1}>
            {value && String(value).trim().length ? value : "-"}
        </Text>
    </View>
)

const ReliefServiceAppointmentsPreview: React.FC = () => {
    const params = useLocalSearchParams<{
        appointmentDate?: string | string[]
        time?: string | string[]
        status?: string | string[]
        priority?: string | string[]
        documentType?: string | string[]
        note?: string | string[]
        imageUri?: string | string[]
    }>()

    const pick = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v) ?? ""

    const appointmentDate = useMemo(() => pick(params.appointmentDate), [params])
    const time           = useMemo(() => pick(params.time), [params])
    const status         = useMemo(() => pick(params.status), [params])
    const priority       = useMemo(() => pick(params.priority), [params])
    const documentType   = useMemo(() => pick(params.documentType), [params])
    const note           = useMemo(() => pick(params.note), [params])
    const imageUri       = useMemo(() => pick(params.imageUri), [params])

    const [previewOpen, setPreviewOpen] = useState(false)

    return (
        <View className="flex-1 bg-gray-100">
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
                            Relief Service Appointments — Preview
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
                <Text className="text-gray-700 text-base font-medium mb-2">Doc Image</Text>
                {imageUri ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setPreviewOpen(true)}
                        className="w-24 h-24 rounded-lg overflow-hidden mb-4"
                        style={{ borderWidth: 2, borderColor: "#D1D5DB", backgroundColor: "#fff", ...shadow }}
                    >
                        <Image source={{ uri: imageUri }} resizeMode="cover" style={{ width: "100%", height: "100%" }} />
                    </TouchableOpacity>
                ) : (
                    <View
                        className="w-24 h-24 rounded-lg items-center justify-center mb-4"
                        style={{ borderWidth: 2, borderColor: "#D1D5DB", backgroundColor: "#fff", ...shadow }}
                    >
                        <Ionicons name="image-outline" size={26} color="#666" />
                    </View>
                )}
                <Text className="text-gray-500 text-xs mb-4">
                    Tap the image to preview (read-only).
                </Text>

                <FieldRow label="Appointment Date" value={appointmentDate} />
                <FieldRow label="Time" value={time} />
                <FieldRow label="Status" value={status} />
                <FieldRow label="Priority" value={priority} />
                <FieldRow label="Document Type" value={documentType} />

                <Text className="text-gray-700 text-base font-medium mt-4 mb-2">Note</Text>
                <View
                    className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-8"
                    style={shadow}
                >
                    <Text className="text-gray-900">
                        {note && note.trim().length ? note : "-"}
                    </Text>
                </View>

                <View className="flex-row gap-4 mb-12">
                    <TouchableOpacity
                        className="flex-1 bg-transparent border-2 border-blue-500 rounded-lg py-4 items-center"
                        onPress={() => router.back()}
                    >
                        <Text className="text-blue-500 text-lg font-semibold">Back to edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex-1 bg-blue-500 rounded-lg py-4 items-center"
                        onPress={() => router.push('/goverment/user_relief_service_appointment')}
                    >
                        <Text className="text-white text-lg font-semibold">Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal transparent visible={previewOpen} animationType="fade" onRequestClose={() => setPreviewOpen(false)}>
                <Pressable style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)" }} onPress={() => setPreviewOpen(false)}>
                    {imageUri ? (
                        <Image
                            source={{ uri: imageUri }}
                            resizeMode="contain"
                            style={{ width: "100%", height: "100%" }}
                        />
                    ) : null}
                </Pressable>
            </Modal>
        </View>
    )
}

export default ReliefServiceAppointmentsPreview
