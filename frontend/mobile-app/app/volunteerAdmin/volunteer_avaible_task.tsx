"use client"

import React, { useState } from "react"
import {View, Text, TouchableOpacity, ScrollView, TextInput, Image} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import {router} from "expo-router";

const AvailableTask = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"All" | "URGENT" | "MEDIUM" | "LOW">("All")

  const tasks = [
    { id: 1, title: "Emergency Food Distribution", location: "Downtown Community Center", priority: "URGENT", time: "Today 2-6 PM", volunteers: "8/15 volunteers", postedTime: "2 hours ago" },
    { id: 2, title: "Debris Clean-up",             location: "Regional Hospital",           priority: "MEDIUM", time: "Today 2-6 PM", volunteers: "8/15 volunteers", postedTime: "1 hours ago" },
    { id: 3, title: "Medical Supply Delivery",      location: "Regional Hospital",           priority: "LOW",    time: "Today 2-6 PM", volunteers: "8/15 volunteers", postedTime: "3 hours ago" },
    { id: 4, title: "Water Supply Coordination",    location: "Kurunegala District",         priority: "URGENT", time: "Today 3-7 PM", volunteers: "5/12 volunteers", postedTime: "4 hours ago" },
    { id: 5, title: "Shelter Setup Assistance",     location: "Matara District",             priority: "MEDIUM", time: "Tomorrow 9-5 PM", volunteers: "10/20 volunteers", postedTime: "5 hours ago" },
  ] as const

  const filteredTasks = tasks.filter((t) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch = t.title.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)
    const matchesFilter = selectedFilter === "All" || t.priority === selectedFilter
    return matchesSearch && matchesFilter
  })

  const filters = [
    { label: "All",     value: "All",     color: "#3B82F6" },
    { label: "URGENT",  value: "URGENT",  color: "#EF4444" },
    { label: "MEDIUM",  value: "MEDIUM",  color: "#F59E0B" },
    { label: "LOW",     value: "LOW",     color: "#22C55E" },
  ] as const

  return (
      <View className="flex-1 bg-blue-50">
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
              <Text className="text-white text-base font-semibold">Available Tasks</Text>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1 px-6 mt-4 relative z-10" showsVerticalScrollIndicator={false}>
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-blue-100">
            <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3">
              <Ionicons name="search-outline" size={20} color="#9CA3AF" />
              <TextInput
                  className="flex-1 ml-3 text-gray-700"
                  placeholder="Search Opportunities"
                  placeholderTextColor="#9CA3AF"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
              />
            </View>
          </View>

          <View className="flex-row mb-6" style={{ columnGap: 8 }}>
            {filters.map(f => {
              const active = selectedFilter === f.value
              return (
                  <TouchableOpacity
                      key={f.value}
                      onPress={() => setSelectedFilter(f.value)}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 999,
                        backgroundColor: active ? f.color : "#fff",
                        borderWidth: active ? 0 : 1,
                        borderColor: "#E5E7EB",
                      }}
                  >
                    <Text style={{ color: active ? "#fff" : "#4B5563", fontWeight: "600", fontSize: 13 }}>
                      {f.label}
                    </Text>
                  </TouchableOpacity>
              )
            })}
          </View>

          <View style={{ rowGap: 12, marginBottom: 24 }}>
            {filteredTasks.map(task => (
                <View key={task.id} className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 mr-4">
                      <Text className="text-gray-900 font-semibold text-base mb-1">{task.title}</Text>

                      <View className="flex-row items-center mb-1">
                        <Ionicons name="location-outline" size={14} color="#6B7280" />
                        <Text className="text-gray-600 text-sm ml-1">{task.location}</Text>
                      </View>

                      <Text className="text-gray-600 text-sm mb-1">{task.time}</Text>
                      <Text className="text-gray-600 text-sm mb-1">{task.volunteers}</Text>
                      <Text className="text-gray-500 text-xs">{task.postedTime}</Text>
                    </View>

                    <View className="items-end">
                      <View
                          style={{
                            backgroundColor:
                                task.priority === "URGENT" ? "#EF4444" :
                                    task.priority === "MEDIUM" ? "#F59E0B" : "#22C55E",
                            borderRadius: 999,
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            marginBottom: 8,
                          }}
                      >
                        <Text className="text-white text-xs font-medium">{task.priority}</Text>
                      </View>

                      <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg">
                        <Text className="text-white font-medium text-sm">View Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
            ))}
          </View>

          {filteredTasks.length === 0 && (
              <View className="bg-white rounded-xl p-8">
                <Text className="text-gray-500 text-base text-center">
                  No tasks found matching your criteria.
                </Text>
              </View>
          )}
        </ScrollView>
      </View>
  )
}

export default AvailableTask
