import React, {useMemo, useState} from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
    Pressable,
    Platform,
} from "react-native"
import {SafeAreaView} from "react-native-safe-area-context"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import {Ionicons} from "@expo/vector-icons"
import {LinearGradient} from "expo-linear-gradient"
import {router} from "expo-router"
import DateTimePickerModal from "react-native-modal-datetime-picker";

type KeyOfForm =
    | "title" | "category" | "priority" | "location" | "address" | "description"
    | "date" | "durationFrom" | "durationTo" | "volunteersMin" | "volunteersMax"
    | "skills" | "safetyRequirements" | "contactName" | "contactPhone" | "contactEmail"
    | "taskStatus"

const categories = ["Cleanup", "Medical", "Food", "Shelter", "Logistics"]
const priorities = ["Low", "Medium", "High", "Critical"]
const statuses = ["Pending", "Accepted", "In Progress", "Verification", "Completed"]

const shadow = {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
    elevation: 4,
}

const AddNewTask: React.FC = () => {
    const insets = useSafeAreaInsets()

    const [formData, setFormData] = useState<Record<KeyOfForm, string>>({
        title: "", category: "", priority: "", location: "", address: "",
        description: "", date: "", durationFrom: "", durationTo: "",
        volunteersMin: "", volunteersMax: "", skills: "", safetyRequirements: "",
        contactName: "", contactPhone: "", contactEmail: "", taskStatus: "",
    })
    const setField = (field: KeyOfForm, value: string) =>
        setFormData(prev => ({...prev, [field]: value}))

    const [pickerOpen, setPickerOpen] =
        useState<null | { field: KeyOfForm; mode: "date" | "time" }>(null)
    const onPick = (date: Date) => {
        if (!pickerOpen) return
        const {field, mode} = pickerOpen
        if (mode === "date") {
            const d = date.toLocaleDateString(undefined, {year: "numeric", month: "2-digit", day: "2-digit"})
            setField(field, d)
        } else {
            const t = date.toLocaleTimeString(undefined, {hour: "2-digit", minute: "2-digit"})
            setField(field, t)
        }
        setPickerOpen(null)
    }

    const [dropdown, setDropdown] =
        useState<null | { field: KeyOfForm; options: string[] }>(null)
    const openDropdown = (field: KeyOfForm, options: string[]) => setDropdown({field, options})
    const selectOption = (value: string) => {
        if (!dropdown) return
        setField(dropdown.field, value)
        setDropdown(null)
    }

    const canSubmit = useMemo(
        () =>
            formData.title &&
            formData.category &&
            formData.priority &&
            formData.date &&
            formData.durationFrom &&
            formData.durationTo &&
            formData.taskStatus,
        [formData]
    )

    return (
        <SafeAreaView className="flex-1" style={{backgroundColor: "#EAF6FF"}}>
            <View className="relative">
                <View style={{height: 100, overflow: "hidden"}}>
                    <Image
                        source={require("../../assets/images/donation_type_top_bg.png")}
                        resizeMode="stretch"
                        style={{position: "absolute", left: 0, right: 0, bottom: 0, width: "110%", height: 100}}
                    />
                </View>
                <View className="absolute left-0 right-0 top-0 px-4 pt-6">
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={24} color="#fff"/>
                    </TouchableOpacity>
                    <View className="absolute left-0 right-0 mt-6 items-center">
                        <Text className="text-white text-base font-semibold">Add New Task</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-6 pt-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: insets.bottom + 120}}
            >
                <FieldLabel>Title</FieldLabel>
                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800 mb-5"
                    value={formData.title}
                    onChangeText={v => setField("title", v)}
                    placeholder="Enter task title"
                />

                <FieldLabel>Category</FieldLabel>
                <SelectInput
                    value={formData.category}
                    placeholder="Select category"
                    onPress={() => openDropdown("category", categories)}
                />

                <FieldLabel className="mt-4">Priority</FieldLabel>
                <SelectInput
                    value={formData.priority}
                    placeholder="Select priority"
                    onPress={() => openDropdown("priority", priorities)}
                />

                <FieldLabel className="mt-4">Location</FieldLabel>
                <View className="bg-white border border-blue-200 rounded-lg px-4 py-3 flex-row items-center mb-5"
                      style={shadow}>
                    <TextInput
                        className="flex-1 text-gray-800"
                        value={formData.location}
                        onChangeText={v => setField("location", v)}
                        placeholder="Enter location"
                    />
                    <Ionicons name="location-outline" size={20} color="#6B7280"/>
                </View>

                <FieldLabel>Address</FieldLabel>
                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800 mb-5"
                    value={formData.address}
                    onChangeText={v => setField("address", v)}
                    placeholder="Enter address"
                />

                <FieldLabel>Description</FieldLabel>
                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800 mb-5"
                    value={formData.description}
                    onChangeText={v => setField("description", v)}
                    placeholder="Enter task description"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />

                <FieldLabel>Date</FieldLabel>
                <SelectInput
                    value={formData.date}
                    placeholder="Select date"
                    rightIcon="calendar-outline"
                    onPress={() => setPickerOpen({field: "date", mode: "date"})}
                />

                <FieldLabel className="mt-4">Duration</FieldLabel>
                <View className="flex-row mb-5">
                    <Pressable
                        onPress={() => setPickerOpen({field: "durationFrom", mode: "time"})}
                        className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-3 mr-3"
                        style={shadow}
                    >
                        <Text className="text-xs text-gray-600 mb-1">From</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className={formData.durationFrom ? "text-gray-800" : "text-gray-400"}>
                                {formData.durationFrom || "Start time"}
                            </Text>
                            <Ionicons name="time-outline" size={18} color="#6B7280"/>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => setPickerOpen({field: "durationTo", mode: "time"})}
                        className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-3"
                        style={shadow}
                    >
                        <Text className="text-xs text-gray-600 mb-1">To</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className={formData.durationTo ? "text-gray-800" : "text-gray-400"}>
                                {formData.durationTo || "End time"}
                            </Text>
                            <Ionicons name="time-outline" size={18} color="#6B7280"/>
                        </View>
                    </Pressable>
                </View>

                <FieldLabel>Volunteers</FieldLabel>
                <View className="flex-row mb-5">
                    <View className="flex-1 mr-3">
                        <Text className="text-gray-600 text-xs mb-1">Min</Text>
                        <TextInput
                            className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-800"
                            value={formData.volunteersMin}
                            onChangeText={v => setField("volunteersMin", v)}
                            placeholder="Min"
                            keyboardType="numeric"
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="text-gray-600 text-xs mb-1">Max</Text>
                        <TextInput
                            className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-800"
                            value={formData.volunteersMax}
                            onChangeText={v => setField("volunteersMax", v)}
                            placeholder="Max"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <FieldLabel>Skills</FieldLabel>
                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800 mb-5"
                    value={formData.skills}
                    onChangeText={v => setField("skills", v)}
                    placeholder="Required skills"
                />

                <FieldLabel>Safety Requirements</FieldLabel>
                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800 mb-5"
                    value={formData.safetyRequirements}
                    onChangeText={v => setField("safetyRequirements", v)}
                    placeholder="Safety requirements"
                />

                <FieldLabel>Contact Person</FieldLabel>
                <Text className="text-gray-600 text-xs mb-1">Name</Text>
                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800 mb-3"
                    value={formData.contactName}
                    onChangeText={v => setField("contactName", v)}
                    placeholder="Contact person name"
                />
                <Text className="text-gray-600 text-xs mb-1">Phone</Text>
                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800 mb-3"
                    value={formData.contactPhone}
                    onChangeText={v => setField("contactPhone", v)}
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                />
                <Text className="text-gray-600 text-xs mb-1">Email</Text>
                <TextInput
                    className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-gray-800 mb-5"
                    value={formData.contactEmail}
                    onChangeText={v => setField("contactEmail", v)}
                    placeholder="Email address"
                    keyboardType="email-address"
                />

                <FieldLabel>Task Status</FieldLabel>
                <SelectInput
                    value={formData.taskStatus}
                    placeholder="Select status"
                    onPress={() => openDropdown("taskStatus", statuses)}
                />
            </ScrollView>

            <View
                style={{
                    paddingHorizontal: 24,
                    paddingTop: 8,
                    paddingBottom: insets.bottom + 12,
                    backgroundColor: "#EAF6FF",
                }}
            >
                <TouchableOpacity
                    disabled={!canSubmit}
                    activeOpacity={0.9}
                    className="rounded-xl overflow-hidden"
                    onPress={() => console.log("Add Task →", formData)}
                    style={{opacity: canSubmit ? 1 : 0.6}}
                >
                    <LinearGradient
                        colors={["#3B82F6", "#2563EB"]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{paddingVertical: 14, borderRadius: 12}}
                    >
                        <Text className="text-white text-center text-lg font-semibold">Add Task</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <Modal transparent visible={!!dropdown} animationType="fade" onRequestClose={() => setDropdown(null)}>
                <Pressable style={{flex: 1, backgroundColor: "rgba(0,0,0,0.35)"}} onPress={() => setDropdown(null)}/>
                <View
                    style={{
                        backgroundColor: "white",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        ...shadow,
                    }}
                >
                    {dropdown?.options.map(opt => (
                        <TouchableOpacity key={opt} className="py-3" onPress={() => selectOption(opt)}>
                            <Text className="text-gray-800 text-base">{opt}</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={{height: Platform.OS === "ios" ? 18 : 8}}/>
                </View>
            </Modal>

            <DateTimePickerModal
                isVisible={!!pickerOpen}
                mode={pickerOpen?.mode ?? "date"}
                onConfirm={onPick}
                onCancel={() => setPickerOpen(null)}
                display={Platform.OS === "ios" ? "inline" : "default"}
            />
        </SafeAreaView>
    )
}

const FieldLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({children, className}) => (
    <Text className={`text-gray-700 text-sm font-medium mb-2 ${className ?? ""}`.trim()}>{children}</Text>
)

const SelectInput: React.FC<{
    value?: string
    placeholder: string
    onPress: () => void
    rightIcon?: keyof typeof Ionicons.glyphMap
}> = ({value, placeholder, onPress, rightIcon = "chevron-down-outline"}) => (
    <Pressable
        onPress={onPress}
        className="bg-white border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between mb-5"
        style={shadow}
    >
        <Text className={value ? "text-gray-800" : "text-gray-400"}>{value || placeholder}</Text>
        <Ionicons name={rightIcon} size={20} color="#6B7280"/>
    </Pressable>
)

export default AddNewTask
