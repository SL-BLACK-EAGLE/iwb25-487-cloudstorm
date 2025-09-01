import React from "react"
import {SafeAreaView, View, Text, TouchableOpacity, ScrollView, Linking, Alert, Image} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

type GradientTuple = readonly [string, string]

interface Service {
  id: number
  title: string
  subtitle: string
  gradient: GradientTuple
  buttonGradient: GradientTuple
  phoneNumber: string
}

const EmergencyContact: React.FC = () => {
  const emergencyServices: Service[] = [
    {
      id: 1,
      title: "Fire & Rescue",
      subtitle: "Get help when you need it most",
      gradient: ["#4F9CFF", "#7A4DFF"],
      buttonGradient: ["#73E0FF", "#0EA5E9"],
      phoneNumber: "110",
    },
    {
      id: 3,
      title: "Ambulance",
      subtitle: "Get help when you need it most",
      gradient: ["#F79BCF", "#F1447A"],
      buttonGradient: ["#FF8FB1", "#EF4444"],
      phoneNumber: "1990",
    },
    {
      id: 2,
      title: "Disaster Management Center",
      subtitle: "Get help when you need it most",
      gradient: ["#6B5BFF", "#3B2E7E"],
      buttonGradient: ["#C084FC", "#6D28D9"],
      phoneNumber: "117",
    },
  ]

  const callNumber = async (num: string) => {
    const url = `tel:${num}`
    const supported = await Linking.canOpenURL(url)
    if (supported) Linking.openURL(url)
    else Alert.alert("Unable to call", "Calling is not supported on this device.")
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
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
                        width: "110%",       // small overscan to avoid edge gaps
                        height: 100,          // tune until it matches your design
                        alignSelf: "center",
                    }}
                />
            </View>

            {/* Back + centered title */}
            <View className="absolute left-0 right-0 top-0 mt-4 px-4 pt-6">
                <TouchableOpacity
                    className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <View className="absolute left-0 right-0 mt-6 items-center">
                    <Text className="text-white text-base font-semibold">Emergency Contacts</Text>
                </View>
            </View>
        </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 28, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6">

            <View className="items-center mb-3">
                <View className="bg-indigo-600/90 px-4 py-2 rounded-full flex-row items-center">
                    <Ionicons name="headset-outline" size={14} color="#fff" style={{ marginRight: 6 }} />
                    <Text className="text-white font-semibold text-xs tracking-wide">CARDIAC EMERGENCY</Text>
                </View>
            </View>

            <LinearGradient
                colors={["#f80000", "#590606"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    borderRadius: 18,
                    padding: 18,
                    width: "80%",
                    alignSelf: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.12,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 6 },
                    elevation: 5,
                    marginBottom: 14,
                    alignItems: "center",
                }}
            >
                <Text className="text-white text-lg font-bold mb-2">Police Emergency</Text>
                <Text className="text-white/90 font-medium mb-4">011-2433333</Text>
                <TouchableOpacity onPress={() => callNumber("0112433333")} activeOpacity={0.9}>
                    <View style={{ backgroundColor: "red", borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20 }}>
                        <Text className="text-white font-semibold">Make a Call</Text>
                    </View>
                </TouchableOpacity>
            </LinearGradient>

            <Text className="text-gray-700 font-semibold text-center mb-4">Main Emergency Contacts</Text>

            <View className="mt-4"> {/* optional top space before the list */}
                {emergencyServices.map((s, idx) => {
                    const isLast = idx === emergencyServices.length - 1
                    return (
                        <LinearGradient
                            key={s.id}
                            colors={s.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                borderRadius: 18,
                                padding: 20,
                                marginBottom: isLast ? 0 : 24,
                                shadowColor: "#000",
                                shadowOpacity: 0.12,
                                shadowRadius: 12,
                                shadowOffset: { width: 0, height: 6 },
                                elevation: 5,
                            }}
                        >
                            <View className="absolute -top-4 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                            <View className="absolute -bottom-6 -left-8 w-20 h-20 bg-white/10 rounded-full" />
                            <View className="absolute top-1/2 right-8 w-10 h-10 bg-white/10 rounded-full" />

                            <View className="relative">
                                <Text className="text-white text-lg font-bold mb-1">{s.title}</Text>
                                <Text className="text-white/90 text-sm mb-8">{s.subtitle}</Text> {/* more space above button */}

                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => callNumber(s.phoneNumber)}
                                    className="self-stretch"
                                >
                                    <LinearGradient
                                        colors={s.buttonGradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{ borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16 }}
                                    >
                                        <Text className="text-white font-semibold text-center">Make a Call</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    )
                })}
            </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EmergencyContact