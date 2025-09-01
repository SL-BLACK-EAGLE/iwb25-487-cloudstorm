import React, { useMemo, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    ImageBackground,
    Pressable,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const A = {
    // Same assets from previous pages
    header: require("../../assets/images/header-wave.png"),
    back: require("../../assets/icons/Chevron_Left.png"),
    location: require("../../assets/icons/Location.png"),
    add: require("../../assets/icons/Add.png"),
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function AddNewHouse() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Form states
    const [place, setPlace] = useState("");
    const [location, setLocation] = useState("");
    const [locationCoords, setLocationCoords] = useState(null);
    const [parking, setParking] = useState("");
    const [facilities, setFacilities] = useState("");
    const [contact, setContact] = useState("");
    const [duration, setDuration] = useState("");
    const [monthlyFee, setMonthlyFee] = useState("");
    const [housingTypes, setHousingTypes] = useState({
        temporaryApartments: false,
        hostFamilyPlacement: false,
        transitionalHousing: false
    });

    // Keep header wave exact same aspect ratio
    const headerAR = useMemo(() => {
        const src = Image.resolveAssetSource(A.header);
        return src.width / src.height; // w/h
    }, []);

    const handleLocationPress = () => {
        // Navigate to Pin Location screen
        router.push({
            pathname: '/victim/PinYourLocation',
            params: {
                //@ts-ignore
                onLocationSelect: (selectedLocation) => {
                    setLocation(selectedLocation.address);
                    setLocationCoords({
                        //@ts-ignore
                        latitude: selectedLocation.latitude,
                        longitude: selectedLocation.longitude
                    });
                }
            }
        });
    };

    const handleAddNewHouse = () => {
        // Validation
        if (!place || !location || !contact || !duration || !monthlyFee) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }

        // Handle add new house logic here
        const houseData = {
            place,
            location,
            locationCoords,
            parking,
            facilities,
            contact,
            duration,
            monthlyFee,
            housingTypes
        };

        console.log("Add New House Data:", houseData);
        Alert.alert("Success", "New house added successfully!", [
            { text: "OK", onPress: () => router.back() }
        ]);
    };

    const handleHousingTypeChange = (type:any) => {
        setHousingTypes(prev => ({
            ...prev,
            //@ts-ignore
            [type]: !prev[type]
        }));
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F3F5F7]">
            {/* ===== Header (Same as other pages) ===== */}
            <ImageBackground
                source={A.header}
                resizeMode="cover"
                className={'mt-[45px]'}
                style={{
                    width: SCREEN_WIDTH,
                    aspectRatio: headerAR,
                    borderBottomLeftRadius: 28,
                    borderBottomRightRadius: 28,
                }}
            >
                <View
                    style={{
                        paddingTop: 20,
                        paddingBottom: 14,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Pressable
                        onPress={() => router.back()}
                        className="absolute left-4 top-4 h-10 w-10 items-center justify-center"
                        hitSlop={10}
                    >
                        <Image
                            source={A.back}
                            style={{ width: 22, height: 22, tintColor: "#FFFFFF" }}
                        />
                    </Pressable>

                    <Text className="text-white text-[16px] font-semibold">
                        Add New House
                    </Text>
                </View>
            </ImageBackground>

            {/* ===== Body ===== */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
                style={{ flex: 1 }}
            >
                {/* Form Fields */}
                <View className="px-6 mt-8">
                    {/* Place */}
                    <FormInput
                        label="Place :"
                        value={place}
                        onChangeText={setPlace}
                        placeholder="Enter place name"
                    />

                    {/* Location */}
                    <FormInput
                        label="Location :"
                        value={location}
                        onChangeText={setLocation}
                        placeholder="Tap location icon to select location"
                        hasLocationIcon
                        onLocationPress={handleLocationPress}
                        editable={false}
                    />

                    {/* Parking Radio Group */}
                    <RadioGroup
                        label="Parking :"
                        value={parking}
                        onValueChange={setParking}
                        options={["Available", "Unavailable"]}
                    />

                    {/* Facilities */}
                    <FormTextArea
                        label="Facilities :"
                        value={facilities}
                        onChangeText={setFacilities}
                        placeholder="Enter facilities details"
                    />

                    {/* Contact */}
                    <FormInput
                        label="Contact :"
                        value={contact}
                        onChangeText={setContact}
                        placeholder="Enter contact information"
                        keyboardType="phone-pad"
                    />

                    {/* Duration */}
                    <FormInput
                        label="Duration :"
                        value={duration}
                        onChangeText={setDuration}
                        placeholder="Enter duration"
                    />

                    {/* Monthly Fee */}
                    <FormInput
                        label="Monthly Fee :"
                        value={monthlyFee}
                        onChangeText={setMonthlyFee}
                        placeholder="Enter monthly fee"
                        keyboardType="numeric"
                    />

                    {/* Housing Type Checkboxes */}
                    <HousingTypeSection
                        housingTypes={housingTypes}
                        onHousingTypeChange={handleHousingTypeChange}
                    />

                    {/* Photos Section */}
                    <PhotoUploadSection />
                </View>

                {/* Add New House Button */}
                <View className="px-6 mt-6 mb-6">
                    <TouchableOpacity
                        onPress={handleAddNewHouse}
                        className="bg-[#3072BF] py-4 rounded-2xl"
                        style={{
                            shadowColor: "#3072BF",
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.3,
                            shadowRadius: 16,
                            elevation: 8,
                        }}
                    >
                        <Text className="text-white text-[16px] font-semibold text-center">
                            Add New House
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ================= Components ================= */

function FormInput({
                       label,
                       value,
                       onChangeText,
                       placeholder,
                       hasLocationIcon,
                       keyboardType = "default",
                       onLocationPress,
                       editable = true
                   }:any) {
    return (
        <View className="mb-6">
            <Text className="text-[14px] font-medium text-gray-800 mb-3">
                {label}
            </Text>
            <View className="relative">
                {hasLocationIcon && (
                    <TouchableOpacity
                        onPress={onLocationPress}
                        className="absolute right-4 top-0 bottom-0 justify-center z-10"
                        hitSlop={10}
                    >
                        <Image
                            source={A.location}
                            style={{ width: 20, height: 20, tintColor: "#3072BF" }}
                        />
                    </TouchableOpacity>
                )}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    //@ts-ignore
                    keyboardType={keyboardType}
                    editable={editable}
                    className="bg-white px-4 py-4 rounded-xl text-[14px]"
                    style={{
                        borderWidth: 2,
                        borderColor: '#3C8FEF',
                        paddingRight: hasLocationIcon ? 44 : 16,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 3,
                        backgroundColor: editable ? 'white' : '#F9F9F9',
                    }}
                    placeholderTextColor="#9CA3AF"
                />
            </View>
        </View>
    );
}

function FormTextArea({ label, value, onChangeText, placeholder }:any) {
    return (
        <View className="mb-6">
            <Text className="text-[14px] font-medium text-gray-800 mb-3">
                {label}
            </Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                className="bg-white px-4 py-4 rounded-xl text-[14px]"
                style={{
                    borderWidth: 2,
                    borderColor: '#3C8FEF',
                    minHeight: 100,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                }}
                placeholderTextColor="#9CA3AF"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />
        </View>
    );
}

function RadioGroup({ label, value, onValueChange, options }:any) {
    return (
        <View className="mb-6">
            <Text className="text-[14px] font-medium text-gray-800 mb-4">
                {label}
            </Text>
            <View className="flex-row space-x-8 gap-16">
                {options.map((option:any) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => onValueChange(option)}
                        className="flex-row items-center"
                    >
                        <View className="w-6 h-6 border-2 border-[#3C8FEF] rounded-full mr-3 items-center justify-center">
                            {value === option && (
                                <View className="w-3 h-3 bg-[#3C8FEF] rounded-full" />
                            )}
                        </View>
                        <Text className="text-[14px] text-gray-700">{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

function HousingTypeSection({ housingTypes, onHousingTypeChange }:any) {
    const housingOptions = [
        { key: 'temporaryApartments', label: 'Temporary apartments' },
        { key: 'hostFamilyPlacement', label: 'Host family placement' },
        { key: 'transitionalHousing', label: 'Transitional housing' }
    ];

    return (
        <View className="mb-6">
            <Text className="text-[14px] font-medium text-gray-800 mb-4">
                Housing Type:
            </Text>
            <View className="space-y-4">
                {housingOptions.map((option) => (
                    <TouchableOpacity
                        key={option.key}
                        onPress={() => onHousingTypeChange(option.key)}
                        className="flex-row items-center mb-3"
                    >
                        <View
                            className="w-5 h-5 border-2 border-blue-500 mr-3 items-center justify-center"
                            style={{
                                borderRadius: 4,
                                backgroundColor: housingTypes[option.key] ? '#3B82F6' : 'transparent'
                            }}
                        >
                            {housingTypes[option.key] && (
                                <Text className="text-white text-[10px] font-bold">✓</Text>
                            )}
                        </View>
                        <Text className="text-[14px] text-gray-700">{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

function PhotoUploadSection() {
    const handlePhotoUpload = () => {
        Alert.alert(
            "Add Photo",
            "Choose photo source",
            [
                { text: "Camera", onPress: () => console.log("Open camera") },
                { text: "Gallery", onPress: () => console.log("Open gallery") },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    return (
        <View className="mt-6 mb-8">
            <Text className="text-[14px] font-medium text-gray-700 mb-4">
                Photos:
            </Text>
            <View className="flex-row justify-between">
                {[1, 2, 3].map((index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={handlePhotoUpload}
                        className="w-24 h-24 bg-white border-2 border-[#3C8FEF] rounded-xl items-center justify-center"
                        style={{
                            width: (SCREEN_WIDTH - 48 - 24) / 3,
                            height: (SCREEN_WIDTH - 48 - 24) / 3,
                        }}
                    >
                        <Image
                            source={A.add}
                            style={{
                                width: 60,
                                height: 60,
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
