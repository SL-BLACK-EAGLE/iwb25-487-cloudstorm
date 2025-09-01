import React from "react"
import {View, Text, TouchableOpacity, ScrollView, Image} from "react-native"
import {Ionicons} from "@expo/vector-icons"
import {LinearGradient} from "expo-linear-gradient"
import {router} from "expo-router"

const shadow = {
    shadowColor: "#8CB9ED",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
    elevation: 8,
}

const InfoRow = ({label, value}: { label: string; value?: string }) => (
    <View className="flex-row items-start mb-2">
        <Ionicons name="ellipse" size={6} color="#fff" style={{marginTop: 6, marginRight: 8}}/>
        <Text className="text-white text-sm">
            <Text className="font-medium">{label}</Text>
            {value ? <Text className="font-normal"> {value}</Text> : null}
        </Text>
    </View>
)

const Card: React.FC<React.PropsWithChildren<{ colors: string[]; className?: string }>> = ({
                                                                                               colors,
                                                                                               children,
                                                                                               className,
                                                                                           }) => (
    <View className={`rounded-2xl overflow-hidden ${className || ""}`} style={shadow}>
        <LinearGradient
            colors={colors}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{padding: 16}}
        >
            {/* soft top highlight */}
            <LinearGradient
                colors={["rgba(255,255,255,0.18)", "transparent"]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{position: "absolute", left: 0, right: 0, top: 0, height: 28}}
            />
            {children}
        </LinearGradient>
    </View>
)

const WaterSupply = () => {
    return (
        <View className="flex-1 bg-slate-100">
            {/* Header */}
            <View className="relative">
                <View style={{height: 100, overflow: "hidden"}}>
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
                        <Ionicons name="chevron-back" size={24} color="white"/>
                    </TouchableOpacity>
                    <View className="absolute left-0 right-0 mt-6 items-center">
                        <Text className="text-white text-base font-semibold">Water Supply</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 24}}>
                <View className="items-center mb-6">
                    <Image
                        source={require("../../assets/images/flood.png")}
                        resizeMode="cover"
                        className="w-50 h-40 rounded-xl"
                    />
                </View>

                <Card colors={["#3F83F8", "#06B6D4"]} className="mb-6">
                    <Text className="text-white text-lg font-semibold mb-4">
                        Providing water supply for your home.
                    </Text>

                    <InfoRow label="isActive:" value="Yes / No"/>
                    <InfoRow label="requiresDocuments:" value="Yes / No"/>
                    <InfoRow label="avgProcessingTime:" value="—"/>
                    <InfoRow label="cost:" value="3000"/>
                    <InfoRow label="allowsOnlineBooking:" value="Yes / No"/>
                    <InfoRow label="requiredDocuments:" value="Yes / No"/>
                    <InfoRow label="officeLocation:" value="23/49, Western Park, Kalagedihena"/>
                </Card>

                <Card colors={["#3F83F8", "#2563EB"]}>
                    <View className="mb-3 self-start bg-white/20 px-3 py-1 rounded-md">
                        <Text className="text-white font-semibold">Contact Information</Text>
                    </View>

                    <InfoRow label="Phone Number:" value="+94 XXX XXX XXX"/>
                    <InfoRow label="Email:" value="—"/>
                    <InfoRow label="Website:" value="—"/>
                    <InfoRow label="Address:" value="—"/>
                </Card>
            </ScrollView>
        </View>
    )
}

export default WaterSupply
