import React, { useState } from "react"
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
    TouchableWithoutFeedback,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import {router} from "expo-router";

type Notice = {
    id: number
    title: string
    timestamp: string
    description: string
    image: any
}

const NotificationsScreen = () => {
    const notifications: Notice[] = [
        {
            id: 1,
            title: "Flooding in Rathnapura (Watapotha)",
            timestamp: "2025.07.10  3:45 PM",
            description:
                "Nature's fury knows no bounds—a clash between raging storms and relentless heat leaves the land scarred and lifeless. This event reminds us of the fragile balance we depend on.",
            image: require("../../assets/images/flood.png"),
        },
        {
            id: 2,
            title: "Flooding in Rathnapura (Watapotha)",
            timestamp: "2025.07.10  3:45 PM",
            description:
                "Heavy rainfall has caused rapid water rise in low-lying areas. Residents are advised to seek higher ground and avoid flooded roads.",
            image: require("../../assets/images/flood.png"),
        },
        {
            id: 3,
            title: "Flooding in Rathnapura (Watapotha)",
            timestamp: "2025.07.10  3:45 PM",
            description:
                "Emergency teams are deployed. Keep phones charged and follow official alerts for evacuation routes and shelters.",
            image: require("../../assets/images/flood.png"),
        },
        {
            id: 4,
            title: "Flooding in Rathnapura (Watapotha)",
            timestamp: "2025.07.10  3:45 PM",
            description:
                "River levels continue to fluctuate. Please assist elderly neighbors and avoid unnecessary travel.",
            image: require("../../assets/images/flood.png"),
        },
    ]

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Notice | null>(null)

    const openModal = (n: Notice) => {
        setSelected(n)
        setOpen(true)
    }
    const closeModal = () => setOpen(false)

    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: "#EAF6FF" }}>
            <View className="relative">
                <View style={{  height: 100,  overflow: "hidden" }}>
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
                        <Ionicons name="chevron-back" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="absolute left-0 right-0 mt-6 items-center">
                        <Text className="text-white text-base font-semibold">Notifications</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-4"
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    {notifications.map((n, idx) => (
                        <TouchableOpacity
                            key={n.id}
                            onPress={() => openModal(n)}
                            className="bg-white rounded-2xl px-4 py-3 border border-gray-100"
                            style={{
                                marginBottom: 16,
                                shadowColor: "#000",
                                shadowOpacity: 0.12,
                                shadowRadius: 8,
                                shadowOffset: { width: 0, height: 4 },
                                elevation: 4,
                                ...(idx === 0 ? { marginTop: 8 } : null),
                            }}
                            activeOpacity={0.8}
                        >
                            <View className="flex-row items-start">
                                <View
                                    className="w-10 h-10 rounded-xl items-center justify-center mr-4"
                                    style={{ backgroundColor: "#FFF4CC" }}
                                >
                                    <Ionicons name="notifications" size={20} color="#F59E0B" />
                                </View>

                                <View className="flex-1">
                                    <View className="flex-row items-start justify-between">
                                        <Text className="text-gray-800 font-medium text-sm pr-2" numberOfLines={1}>
                                            {n.title}
                                        </Text>
                                        <Text className="text-gray-500 text-[11px]">{n.timestamp}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <Modal
                visible={open}
                transparent
                animationType="fade"
                statusBarTranslucent
                onRequestClose={closeModal}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
                    </TouchableWithoutFeedback>

                    <View
                        className="rounded-3xl bg-white border"
                        style={{
                            width: "100%",
                            maxWidth: 420,
                            borderColor: "#C7E0FF",
                            paddingBottom: 12,
                            shadowColor: "#000",
                            shadowOpacity: 0.18,
                            shadowRadius: 18,
                            shadowOffset: { width: 0, height: 10 },
                            elevation: 12,
                        }}
                    >
                        <View className="flex-row items-center justify-between px-4 pt-3">
                            <Ionicons name="notifications" size={18} color="#F59E0B" />
                            <Text className="text-gray-500 text-[11px]">{selected?.timestamp}</Text>
                            <TouchableOpacity onPress={closeModal} hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}>
                                <Ionicons name="close" size={18} color="#111827" />
                            </TouchableOpacity>
                        </View>

                        <View className="px-4 pb-4">
                            {selected?.image ? (
                                <Image
                                    source={selected.image}
                                    resizeMode="cover"
                                    style={{ width: "100%", height: 140, borderRadius: 14, marginTop: 8 }}
                                />
                            ) : null}

                            <Text className="text-gray-900 font-semibold text-base mt-3">
                                {selected?.title}
                            </Text>

                            <LinearGradient
                                colors={["#10B981", "#059669"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ borderRadius: 18, paddingVertical: 14, paddingHorizontal: 14, marginTop: 10 }}
                            >
                                <Text className="text-white text-sm leading-relaxed">
                                    {selected?.description}
                                </Text>
                            </LinearGradient>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default NotificationsScreen
